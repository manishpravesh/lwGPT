import React, { useRef } from "react";
import Section from "./Section.jsx";
import curve from "../assets/hero/curve.png";
import Button from "./Button.jsx";
import { heroBackground } from "../assets/index.js";
import { ScrollParallax } from "react-just-parallax";
import { heroIcons } from "../constants/index.js";
import { BottomLine, Gradient, BackgroundCircles } from "./design/Hero.jsx";
import Notification from "./Notification.jsx";
import CompanyLogos from "./CompanyLogos.jsx";
import HeroCTA from "./HeroCTA.jsx";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const goToChat = () => {
    navigate("/chat");
  };
  const parallaxRef = useRef(null);

  return (
    <Section
      id="hero"
      crosses
      customPadding
      crossesOffset="lg:translate-y-[5.25rem]"
      className="pt-[12rem] -mt-[5.25rem]"
    >
      <div className="container relative" ref={parallaxRef}>
        <div
          className="relative z-1 max-w-[62rem] mx-auto text-center
            mb-[8rem] md:mb-20 lg:mb-[6rem] px-4"
        >
          <h1 className="h1 mb-6 mt-6">
            Welcome to your AI legal assistant
            <span className="inline-block relative">
              Revolutionizing Legal Practice
              <img
                src={curve}
                alt="Curve"
                className="absolute top-full left-0 w-full xl:-mt-2"
                height={624}
                width={624}
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 ">
            Providing expert legal advice and assistance at your fingertips.
          </p>
          <Button onClick={goToChat}> GET started</Button>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <HeroCTA />

          {/* <div  className='absolute -top-[54%] left-1/2 width-[234%] -translate-x-1/2
               md:-top-[46%] md:w-[138%] lg:-top-[104%]'>
              <img src={heroBackground} 
              alt="hero" width={1440} height={1800} 
              className='w-full'/>
            </div> */}
          <BackgroundCircles />
        </div>
        <CompanyLogos />
      </div>
    </Section>
  );
};
export default Hero;
