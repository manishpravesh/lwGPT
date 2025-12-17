import React, { useEffect } from "react"; // 👈 useEffect added
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext"; //  get auth data

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const { token } = useAuth(); //  JWT needed for backend auth

  // Runs once when this page loads
  useEffect(() => {
    const upgradeRole = async () => {
      try {
        await fetch("http://localhost:5000/api/payment-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  send JWT
          },
          body: JSON.stringify({
            plan: "premium", //  hardcoded for now
          }),
        });
      } catch (error) {
        console.error("Role upgrade failed", error);
      }
    };

    if (token) {
      upgradeRole(); //  only run if user is logged in
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold mb-4">Payment Initiated 🎉</h1>
      <p className="mb-6 text-sm opacity-80 max-w-md">
        Your payment was processed by Stripe. Account access will be updated
        shortly.
      </p>

      <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
    </div>
  );
};

export default PaymentSuccessPage;
