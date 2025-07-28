import React, { useRef } from "react";
import Section from "./Section.jsx";
import curve from "../assets/hero/curve.png";
import Button from "./Button.jsx";
import robot from "../assets/hero/robot.jpg";
import { heroBackground } from "../assets/index.js";
import { ScrollParallax } from "react-just-parallax";
import { heroIcons } from "../constants/index.js";
import { BottomLine, Gradient, BackgroundCircles } from "./design/Hero.jsx";
import Notification from "./Notification.jsx";
import CompanyLogos from "./CompanyLogos.jsx";
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
            Welcome to "NAME", AI-powered legal assistant
            <span className="inline-block relative">
              Testing
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
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div
                className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden 
                  md:aspect-[688/490] lg:aspect-[1024/490]"
              >
                <img
                  src={robot}
                  alt="AI"
                  className='"w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]'
                  width={1024}
                  height={490}
                />

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
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>

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
