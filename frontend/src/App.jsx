import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/success" element={<PaymentSuccessPage />} />
      <Route path="/cancel" element={<PaymentCancelPage />} />
    </Routes>
    // <LandingPage />
  );
}
export default App;
