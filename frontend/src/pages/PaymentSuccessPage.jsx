import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Success = () => {
  const navigate = useNavigate();

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

export default Success;
