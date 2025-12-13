import React from "react";
import Section from "./Section";
import BenefitHeading from "./BenefitHeading";
import { benefits } from "../constants";
import { GradientLight } from "./design/Benefits";
const Benefits = () => {
  return (
    <Section>
      <div>
        <BenefitHeading />
      </div>
      <div className="relative flex justify-center flex-wrap gap-10 mt-12">
        {benefits.map((item) => (
          <div
            className="relative items-center text-center 
                    bg-n-10/40 rounded-3xl backdrop-blur
                     w-[16rem] h-[22rem] p-2 pt-4"
            key={item.id}
            style={{
              backgroundImage: `url(${item.backgroundUrl})`,
            }}
          >
            <div>
              <h3 className="text-2xl font-semibold m-2">{item.title}</h3>
            </div>
            <div>
              <img src={item.image} alt="" />
            </div>
            <p className=" text-gray-600 m-2">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Benefits;
