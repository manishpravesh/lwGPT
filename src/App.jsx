import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
    // <LandingPage />
  );
}

export default App;
