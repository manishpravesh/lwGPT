import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const upgradeRole = async () => {
      try {
        const API_BASE_URL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE_URL}/api/payment-success`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan: "premium" }),
        });

        const data = await res.json();

        // 🔑 THIS IS THE MISSING PIECE (E3)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } catch (error) {
        console.error("Role upgrade failed", error);
      }
    };

    if (token) {
      upgradeRole();
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
