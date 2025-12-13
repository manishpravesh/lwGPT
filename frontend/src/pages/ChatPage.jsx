import React from "react";
import { useState } from "react";
import { sendChatToBackend } from "../api/sendChatToBackend";
const ChatPage = () => {
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSend = async () => {
    if (inputData.trim() === "") return;
    const response = await sendChatToBackend(inputData);
    setMessages((prev) => [
      ...prev,
      { text: inputData, type: "user" },
      { text: response, type: "bot" },
    ]);
    setInputData("");
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center justify-between w-full  m-2 p-2">
        <h1>Chat Page</h1>
        {/* ai- chat resoncee will happen here*/}
        <div className="flex-1 overflow-y-auto px-4 py-2 rounded-lg shadow-inner mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-5   px-4 py-2 rounded-xl max-w-[60%] ${
                msg.type === "user"
                  ? "ml-auto bg-n-9/50 text-white text-right"
                  : "mr-auto  text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <SearchChat
          inputData={inputData}
          setInputData={setInputData}
          handleSend={handleSend}
        />
      </div>
    </div>
  );
};
const SearchChat = ({ inputData, setInputData, handleSend }) => {
  return (
    <div
      className=" min-h-[3rem] w-[70%] m-3
      rounded-3xl justify-center items-center flex
     bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg "
    >
      <input
        type="text"
        className="bg-n-7/80 w-full h-full rounded-3xl p-4"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Ask for legal assistance or information"
      />
      <button
        className="bg-n-7/90 text-white rounded-full px-4 py-2 mx-2
        shadow-lg backdrop-blur-lg hover:bg-n-6/80 transition-colors duration-300"
        onClick={handleSend}
      >
        Search
      </button>
    </div>
  );
};
const Sidebar = () => {
  return (
    <div
      className="w-1/4 h-full bg-n-7/90 p-2 m-2 rounded-2xl backdrop-blur-lg shadow-lg
        flex flex-col "
    >
      <div className="m-2 flex gap-5">
        <img src="" alt="" className="border " width={25} height={25} />
        <h2 className="text-lg font-semibold">Sidebar</h2>
      </div>
      <div className="container h-5"></div>
      <div className="m-2">History</div>
    </div>
  );
};
export default ChatPage;
