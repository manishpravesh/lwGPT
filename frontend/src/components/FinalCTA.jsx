import React from "react";
import Section from "./Section";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <Section id="cta" className="py-16 lg:py-24">
      <div className="relative rounded-3xl overflow-hidden px-6 py-12 lg:px-16 lg:py-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-n-7/40 via-n-7/20 to-n-7/40 backdrop-blur-lg border border-white/10" />

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-color-1/10 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-color-1/5 rounded-full blur-3xl opacity-10 -z-10" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="h2 mb-4">
            Ready to Transform Your Legal Workflow with LawGpt?
          </h2>
          <p className="body-1 text-n-2 mb-8">
            Join thousands of legal professionals who trust LawGpt with their
            most important cases. Get started today with our free tier—no credit
            card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={goToChat} className="px-8">
              Start Free Trial
            </Button>
            <button
              onClick={() =>
                document
                  .getElementById("pricing")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 
              text-n-1 transition-all duration-300 hover:bg-white/5 font-medium"
            >
              View Pricing
            </button>
          </div>

          <p className="text-xs text-n-4 mt-6">
            ✓ No credit card required • ✓ Cancel anytime • ✓ 30-day money-back
            guarantee
          </p>
        </div>
      </div>
    </Section>
  );
};

export default FinalCTA;
