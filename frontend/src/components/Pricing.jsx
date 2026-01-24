import React from "react";
import Section from "./Section";
import { pricing } from "../constants";
import { check } from "../assets";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const Pricing = () => {
  const { token } = useAuth();
  const glassEffect =
    "bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg";

  const handleBuy = async (plan) => {
    try {
      const API_BASE_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (e) {
      console.error("Chechout error", e);
    }
  };

  return (
    <Section id="pricing">
      <div className="">
        <h2 className="text-5xl text-center mb-2 font-semibold">
          SIMPLE, TRANSPARENT PRICING
        </h2>
        <p className="text-sm mb-8 text-center lg:text-base lg:mx-[10rem]">
          Choose the perfect LawGpt plan for your legal practice. Powerful AI
          tools at every tier.
        </p>

        <div className="flex flex-col mx-5 gap-4 lg:flex-row lg:mx-16">
          {pricing.map((item) => (
            <div className="">
              <PriceCard item={item} onBuy={handleBuy} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const PriceCard = ({ item, onBuy }) => {
  const planKey = item.title.toLowerCase();

  return (
    <div
      className={`rounded-3xl bg-n-7/30 p-4 h-full w-full 
  backdrop-blur-lg border border-white/10 shadow-lg`}
    >
      <h2 className="text-4xl font-semibold ">{item.title}</h2>
      <p className="my-2 text-sm">{item.description}</p>
      <h1 className="text-5xl my-3 py-2">${item.price}</h1>
      <Button
        children={"Buy Now"}
        onClick={() => onBuy(planKey)}
        className={"mb-6"}
      />
      <div>
        <ul>
          {item.features.map((feature) => (
            <li className="flex p-2 border-b-[0.1px] border-n-1/10">
              <img src={check} width={24} height={24} alt="check" />
              <p className="pl-3 text-sm">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
