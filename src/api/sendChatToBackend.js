export const sendChatToBackend = async (question) => {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("Backend error:", error);
    return "Sorry, the backend is not responding.";
  }
};
