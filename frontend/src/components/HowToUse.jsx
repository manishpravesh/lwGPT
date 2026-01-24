import React from "react";
import FeatureCard from "./FeatureCard";
import Section from "./Section";

const HowToUse = () => {
  const demoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
  return (
    <Section id="how-to-use">
      <div className="text-center mt-8 mx-4 ">
        <h2 className="text-4xl font-bold mb-2">DEMO</h2>
        <p className="text-sm lg:text-base lg:mx-[10rem]">
          Follow these simple steps to get started with our platform.
        </p>
        <div className="mt-2 pt-2 lg:mx-16 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-2">
          <div className="rounded-3xl p-4 backdrop-blur-lg bg-n-7/30 border border-white/10 shadow-lg min-h-[15rem] lg:h-[25rem] w-full">
            <h2 className="text-3xl mt-10 mb-3 pb-2 px-[6rem] lg:mt-20 lg:pt-5 text-white">
              How to use LawGpt
            </h2>
            <p className="text-gray-300 px-2 mt-0">
              Watch our tutorial to learn how to leverage LawGpt's intelligent
              legal AI for your practice.
            </p>
          </div>

          <div
            className="backdrop-blur-lg  border border-white/10 shadow-lg rounded-3xl p-2 bg-n-7/50 min-h-[20rem]
            lg:h-[25rem] lg:w-full"
          >
            <iframe
              src={demoUrl}
              frameborder="0"
              className="w-full h-full rounded-3xl"
              title="YouTube video player"
            ></iframe>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HowToUse;
