import React from "react";
import ButtonGradient from "../assets/svg/ButtonGradient.jsx";
import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import Section from "../components/Section.jsx";
import Hero from "../components/Hero.jsx";
import Benefits from "../components/Benefits.jsx";
import TechStack from "../components/TechStack.jsx";
import WhyBetter from "../components/WhyBetter.jsx";
import ForWhom from "../components/ForWhom.jsx";
import HowToUse from "../components/HowToUse.jsx";
import Pricing from "../components/Pricing.jsx";
import Stats from "../components/Stats.jsx";
import SecurityTrust from "../components/SecurityTrust.jsx";
import FAQ from "../components/FAQ.jsx";
import FinalCTA from "../components/FinalCTA.jsx";
import Footer from "../components/Footer.jsx";
const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="h-20"></div>
      {/* <h1 className='text-6xl font-bold text-color-2'>Hello World</h1> */}
      <ButtonGradient />
      <Hero />
      <Benefits />
      <TechStack />
      <WhyBetter />
      <ForWhom />
      <HowToUse />
      <Pricing />
      <Stats />
      {/* <SecurityTrust /> */}
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
