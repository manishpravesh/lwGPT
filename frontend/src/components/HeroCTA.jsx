import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { ScrollParallax } from "react-just-parallax";
import { heroIcons } from "../constants/index.js";

const HeroCTA = () => {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  const goToPricing = () => {
    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
      <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-n-8 rounded-[1rem] overflow-hidden">
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

          <div
            className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden 
              md:aspect-[688/490] lg:aspect-[1024/490] relative bg-gradient-to-b from-n-8 to-n-9 flex items-center justify-center"
          >
            {/* Background - darker to match page */}
            <div className="absolute inset-0 bg-n-8/80" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center h-full">
              <h2 className="h2 mb-4">Get Expert Legal Guidance Instantly</h2>
              <p className="body-1 text-n-2 mb-8 max-w-2xl">
                Powered by advanced AI, LawGpt provides accurate legal analysis,
                case research, and contract insights in seconds. Perfect for
                lawyers, law students, and anyone seeking trusted legal
                assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button onClick={goToChat} className="px-8">
                  Try Now
                </Button>
                <button
                  onClick={goToPricing}
                  className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 
                  text-n-1 transition-all duration-300 hover:bg-white/5 font-medium"
                >
                  View Pricing
                </button>
              </div>

              <p className="text-xs text-n-4">
                ✓ No credit card required • ✓ Cancel anytime • ✓ Secure &
                encrypted
              </p>
            </div>

            {/* Parallax Icon List */}
            <ScrollParallax isAbsolutelyPositioned>
              <ul
                className="hidden absolute bottom-[12rem] -left-[5.5rem] bg-n-9/40 
              backdrop-blur-sm rounded-2xl p-1 border border-n-1/10 xl:flex"
              >
                {heroIcons.map((icon, index) => (
                  <li key={index} className="p-5">
                    <img src={icon} alt={icon} width={24} height={25} />
                  </li>
                ))}
              </ul>
            </ScrollParallax>

            {/* Parallax Legal Insight Card */}
            <ScrollParallax isAbsolutelyPositioned>
              <div
                className="hidden items-center absolute bottom-[6rem] -right-[6rem] bg-n-9/60
              backdrop-blur rounded-xl p-3 border border-n-1/30 w-[20rem] h-[6rem] lg:flex gap-4"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-color-1/20 to-color-1/5 flex items-center justify-center">
                    <span className="text-2xl">⚖️</span>
                  </div>
                </div>

                <div className="">
                  <h3 className="text-n-1 text-sm font-semibold mb-1">
                    Case Analysis
                  </h3>

                  <p className="text-xs text-n-3 mb-2">
                    AI-powered legal research complete
                  </p>
                  <p className="text-xs text-n-4">Just now</p>
                </div>
              </div>
            </ScrollParallax>
          </div>
        </div>
        <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
        <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
      </div>
    </div>
  );
};

export default HeroCTA;
