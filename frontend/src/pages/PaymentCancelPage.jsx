import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold mb-4">Payment Cancelled</h1>
      <p className="mb-6 text-sm opacity-80 max-w-md">
        You cancelled the checkout. No charges were made.
      </p>

      <Button onClick={() => navigate("/pricing")}>Back to Pricing</Button>
    </div>
  );
};

export default Cancel;
