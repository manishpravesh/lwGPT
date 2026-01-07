const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const sendChatToBackend = async (message, chatId) => {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
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
