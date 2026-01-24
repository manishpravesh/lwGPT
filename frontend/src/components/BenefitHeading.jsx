import React from "react";

const BenefitHeading = ({ className, title }) => {
  return (
    // tagline
    <div>
      <h2 className="h2 text-center font-semibold">Smart • Reliable • Legal</h2>
      <p className="body-1 text-center max-w-3xl mx-auto mb-7">
        Discover the powerful advantages of using LawGpt for your legal
        practice.
      </p>
    </div>
  );
};

export default BenefitHeading;
