import React from "react";
import Section from "./Section";
import FeatureCard from "./FeatureCard";
import { users, briefcase, book, building } from "../assets";

const ForWhom = () => {
  const glassEffect =
    "bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg";
  return (
    <Section>
      <div className="items-center justify-center text-center">
        <h2 className="text-4xl mb-2 font-semibold">Who Is This For?</h2>
        <p className="text-sm lg:text-base lg:mx-[10rem]">
          Discover tools to boost your workflow. From easy document creation to
          powerful research, our platform lets you focus on what matters.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-10 mx-16">
          {forWhomFeatures.map((item) => (
            <div>
              <FeatureCard
                key={item.id}
                className={`flex-1 w-full h-full ${glassEffect}`}
                title={item.title}
                description={item.description}
                down={item.down}
                imageURL={item.imageURL}
                imageFlag={item.imageFlag}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ForWhom;

export const forWhomFeatures = [
  {
    id: "3",
    title: "Common People",
    description:
      "Get easy-to-understand legal information and assistance for everyday needs.",
    down: true,
    imageFlag: true,
    imageURL: users,
  },
  {
    id: "0",
    title: "Lawyers",
    description:
      "Streamline your legal practice with AI-driven insights and document automation.",
    down: true,
    imageFlag: true,
    imageURL: briefcase,
  },
  {
    id: "1",
    title: "Law Students",
    description:
      "Enhance your legal studies with quick access to case law and legal principles.",
    down: false,
    imageFlag: true,
    imageURL: book,
  },
  {
    id: "2",
    title: "Law Firms/Businesses",
    description:
      "Protect your business with AI-powered legal advice and contract management.",
    down: true,
    imageFlag: true,
    imageURL: building,
  },
];