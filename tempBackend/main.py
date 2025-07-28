from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.modelTemp import get_legal_response  # adjust import as needed
import asyncio

app = FastAPI()

# ✅ Allow your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(data: dict):
    question = data.get("question")
    if not question:
        return {"answer": "No question provided."}
    response = await get_legal_response(question)
    return {"answer": response}
