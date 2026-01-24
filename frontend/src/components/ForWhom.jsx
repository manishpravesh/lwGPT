import React from "react";
import Section from "./Section";
import FeatureCard from "./FeatureCard";
import { users, briefcase, book, building } from "../assets";

const ForWhom = () => {
  const glassEffect =
    "bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg";
  return (
    <Section id="for-whom">
      <div className="items-center justify-center text-center">
        <h2 className="text-4xl mb-2 font-semibold">Who Should Use LawGpt?</h2>
        <p className="text-sm lg:text-base lg:mx-[10rem]">
          From individual legal needs to enterprise solutions, LawGpt empowers
          legal professionals and organizations with intelligent AI-powered
          assistance.
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
    title: "General Public",
    description:
      "Get easy-to-understand legal information for everyday situations and questions.",
    down: true,
    imageFlag: true,
    imageURL: users,
  },
  {
    id: "0",
    title: "Legal Professionals",
    description:
      "Accelerate your practice with AI-driven research, document review, and case analysis.",
    down: true,
    imageFlag: true,
    imageURL: briefcase,
  },
  {
    id: "1",
    title: "Law Students",
    description:
      "Master legal concepts with instant access to case law, statutes, and legal principles.",
    down: false,
    imageFlag: true,
    imageURL: book,
  },
  {
    id: "2",
    title: "Corporate & Law Firms",
    description:
      "Scale your legal operations with AI contract analysis, compliance checks, and legal strategy.",
    down: true,
    imageFlag: true,
    imageURL: building,
  },
];
