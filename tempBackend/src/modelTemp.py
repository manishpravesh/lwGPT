import os
import json
import logging
from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langchain_groq import ChatGroq
# --- Setup Logging ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Load .env & API Key ---
load_dotenv()

# Fetch API key
groq_api_key = os.getenv("GROQ_API_KEY")

llm = None
legal_chain = None
initialization_error = None

# --- Initialize LLM and Chain ---
if not groq_api_key:
    initialization_error = "Error: GROQ_API_KEY environment variable not set."
    logger.error(initialization_error)
else:
    try:
        llm = ChatGroq(
            model="llama3-8b-8192",
            groq_api_key=groq_api_key,
            temperature=0.3  # Slightly more open responses
        )
        logger.info("LLM Initialized Successfully.")

        # --- Prompt Template for Legal Assistant ---
        legal_prompt_text = """
You are a helpful and knowledgeable AI legal assistant focused on Indian law. You provide concise, informative, and easy-to-understand answers based on the user's question.

**Instructions:**
- Avoid legal advice or making guarantees.
- Clearly explain terms like IPC 420 or Bail, when mentioned.
- Keep answers short, respectful, and educational.
- If unsure, say "This is general information. Please consult a lawyer for specific advice."

**User Question:** {user_input}

Answer:
"""
        legal_prompt = PromptTemplate(
            input_variables=["user_input"],
            template=legal_prompt_text
        )

        # --- Memory (for follow-up capability) ---
        legal_memory = ConversationBufferMemory(
            memory_key="history",
            input_key="user_input"
        )

        legal_chain = LLMChain(
            llm=llm,
            prompt=legal_prompt,
            memory=legal_memory,
            verbose=False
        )

        logger.info("Legal Assistant Chain Initialized Successfully.")

    except Exception as e:
        initialization_error = f"Error initializing LLM or chain: {e}"
        logger.exception(initialization_error)
        llm = None
        legal_chain = None


# --- Core Legal Response Function ---
async def get_legal_response(user_input: str) -> str:
    if not legal_chain or not llm:
        return "Sorry, the legal assistant is currently unavailable."

    try:
        response = await legal_chain.arun({"user_input": user_input})
        return response.strip()
    except Exception as e:
        logger.exception("Error generating legal response.")
        return "An error occurred while processing your question. Please try again later."
    


# testing directly if llm works fine------------------------
# import asyncio

# # ... your full code remains the same ...

# # Run test properly
# if __name__ == "__main__":
#     user_query = "What is IPC 420?"
#     response = asyncio.run(get_legal_response(user_query))
#     print(response)

