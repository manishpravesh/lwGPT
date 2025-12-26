export const sendChatToBackend = async (message) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error("Chat failed");
  }

  const data = await res.json();
  return data.reply;
};
