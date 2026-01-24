import React from "react";
import Section from "./Section";
import BenefitHeading from "./BenefitHeading";
import { benefits } from "../constants";
import Arrow from "../assets/svg/Arrow";

const Benefits = () => {
  const glassEffect =
    "bg-n-7/30 backdrop-blur-lg border border-white/5 shadow-lg";

  return (
    <Section id="features">
      <div className="container relative z-2">
        <BenefitHeading />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 mx-4">
          {benefits.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl p-6 h-full ${glassEffect} flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={item.iconUrl}
                  width={40}
                  height={40}
                  alt={item.title}
                />
              </div>
              <h5 className="h5 mb-3">{item.title}</h5>
              <p className="body-2 mb-6 text-n-3 flex-grow">{item.text}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-n-1 uppercase cursor-pointer hover:gap-3 transition-all">
                <span>Explore more</span>
                <Arrow />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
