import React from "react";
import Section from "./Section";

const Stats = () => {
  const stats = [
    {
      id: 1,
      number: "50K+",
      label: "Active Users",
      description: "Legal professionals worldwide",
    },
    {
      id: 2,
      number: "5M+",
      label: "Documents Processed",
      description: "Analyzed & summarized",
    },
    {
      id: 3,
      number: "99.9%",
      label: "Uptime",
      description: "Enterprise reliability",
    },
    {
      id: 4,
      number: "24/7",
      label: "Support",
      description: "Always here to help",
    },
  ];

  return (
    <Section className="py-12 lg:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 px-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-2xl bg-n-7/30 backdrop-blur-lg border border-white/5 
            shadow-lg p-6 text-center hover:border-white/10 transition-all duration-300"
          >
            <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-color-1 to-color-2 mb-2">
              {stat.number}
            </div>
            <h3 className="font-semibold text-n-1 text-sm lg:text-base mb-1">
              {stat.label}
            </h3>
            <p className="text-xs lg:text-sm text-n-3">{stat.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Stats;
