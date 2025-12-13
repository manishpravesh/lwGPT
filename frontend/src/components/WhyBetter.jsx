import React from "react";
import Section from "./Section";
import { isSession } from "react-router-dom";
import privacy_2 from "../myassets/privacy_2.png";
import FeatureCard from "./FeatureCard";
const WhyBetter = () => {
  const glassEffect =
    "bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg";

  return (
    <Section>
      <div className="relative flex-row gap-2 items-center justify-center text-center">
        <h2 className="relative text-4xl font-bold mb-2">
          Why AiLaw is better?
        </h2>
        <p>
          We leverage advanced AI technology to provide unparalleled legal
          insights and support.
        </p>
        {/*  MANSORY STYLE LAYOUT(Pinterest layouut) here->   columns-1 md:columns-2 gap-1 */}
        <div className="columns-1 md:columns-2 gap-1 mt-10 mx-16">
          {betterFeatures.map((item) => (
            <FeatureCard
              key={item.id}
              className="flex-1"
              title={item.title}
              description={item.description}
              down={item.down}
              imageURL={item.imageURL}
              imageFlag={item.imageFlag}
              imagePos={item.imagePos}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyBetter;

export const betterFeatures = [
  {
    id: "0",
    title: "Private",
    description:
      "We ensure complete confidentiality and privacy for all our users.",
    down: true,
    imageFlag: false,
    imageURL: "",
    imagePos: "justify-center",
  },
  {
    id: "2",
    title: "Fast",
    description:
      "Our AI-driven platform delivers quick and accurate legal insights.",
    down: true,
    imageFlag: true,
    imageURL: "",
    imagePos: "justify-center",
  },
  {
    id: "1",
    title: "User-Friendly Interface",
    description:
      "Our platform is designed with the user in mind, ensuring a seamless experience.",
    down: true,
    imageFlag: false,
    imageURL: "",
    imagePos: "justify-center",
  },

  {
    id: "3",
    title: "24/7 Support",
    description:
      "We offer round-the-clock support to assist you with any legal inquiries.",
    down: true,
    imageFlag: true,
    imageURL: "",
    imagePos: "justify-center",
  },
  {
    id: "4",
    title: "Affordable",
    description:
      "We provide cost-effective legal solutions without compromising on quality.",
    down: false,
    imageFlag: true,
    imageURL: "",
    imagePos: "justify-center",
  },
];
