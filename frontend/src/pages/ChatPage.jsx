import React, { useEffect, useRef, useState } from "react";
import { sendChatToBackend } from "../api/sendChatToBackend";

const ChatPage = () => {
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  // auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputData.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputData,
    };

    // show user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputData("");
    setIsTyping(true);

    // temporary system message
    const typingMessageId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      {
        id: typingMessageId,
        role: "system",
        content: "AI is typing…",
      },
    ]);

    try {
      const reply = await sendChatToBackend(userMessage.content);

      // replace typing message with AI reply
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? { ...msg, role: "assistant", content: reply }
            : msg
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? {
                ...msg,
                role: "system",
                content:
                  "Something went wrong or usage limit reached. Please try later.",
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col items-center justify-between w-full m-2 p-2">
        <h1 className="text-xl font-semibold">Chat Page</h1>
        {/* Chat Messages */}
        <div className="flex-1 w-full overflow-y-auto px-4 py-2 rounded-lg shadow-inner mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-3 px-4 py-2 rounded-xl max-w-[60%] ${
                msg.role === "user"
                  ? "ml-auto bg-n-9/50 text-white text-right"
                  : msg.role === "assistant"
                  ? "mr-auto bg-n-7/60 text-white"
                  : "mx-auto text-sm text-gray-400"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <SearchChat
          inputData={inputData}
          setInputData={setInputData}
          handleSend={handleSend}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

const SearchChat = ({ inputData, setInputData, handleSend, isTyping }) => {
  return (
    <div
      className="min-h-[3rem] w-[70%] m-3 rounded-3xl flex items-center
      bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg"
    >
      <input
        type="text"
        className="bg-n-7/80 w-full h-full rounded-3xl p-4 text-white outline-none"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Ask for legal assistance or information"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={isTyping}
      />

      <button
        onClick={handleSend}
        disabled={isTyping}
        className={`text-white rounded-full px-4 py-2 mx-2 shadow-lg transition-colors
          ${
            isTyping
              ? "opacity-50 cursor-not-allowed"
              : "bg-n-7/90 hover:bg-n-6/80"
          }`}
      >
        {isTyping ? "Thinking…" : "Send"}
      </button>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div
      className="w-1/4 h-full bg-n-7/90 p-2 m-2 rounded-2xl backdrop-blur-lg shadow-lg
      flex flex-col"
    >
      <div className="m-2 flex gap-5 items-center">
        <img src="" alt="" className="border" width={25} height={25} />
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </div>

      <div className="flex-1 m-2 text-sm text-gray-400">
        History (coming soon)
      </div>
    </div>
  );
};

export default ChatPage;
