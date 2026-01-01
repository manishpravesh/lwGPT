export const sendChatToBackend = async (message, chatId) => {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ message, chatId }),
  });

  if (!res.ok) throw new Error("Chat failed");

  return res.json(); // { reply, chatId }
};
