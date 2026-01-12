import React from "react";
import Section from "./Section";

const SecurityTrust = () => {
  const features = [
    {
      id: 1,
      icon: "🔐",
      title: "Enterprise Security",
      description:
        "Bank-level encryption and SOC 2 Type II certified infrastructure",
    },
    {
      id: 2,
      icon: "✓",
      title: "Compliance Ready",
      description: "GDPR, CCPA, HIPAA, and state-specific regulations covered",
    },
    {
      id: 3,
      icon: "⚡",
      title: "99.9% Uptime",
      description:
        "Redundant systems across multiple data centers for reliability",
    },
    {
      id: 4,
      icon: "📊",
      title: "Audited & Verified",
      description:
        "Regular third-party security audits and penetration testing",
    },
    {
      id: 5,
      icon: "🤝",
      title: "Trusted by Professionals",
      description:
        "Used by law firms, legal teams, and corporate counsel nationwide",
    },
    {
      id: 6,
      icon: "📋",
      title: "Data Ownership",
      description:
        "You own your data. Export anytime, delete anytime, no lock-in",
    },
  ];

  return (
    <Section>
      <div className="">
        <h2 className="text-5xl text-center mb-2 font-semibold">
          Security & Trust
        </h2>
        <p className="text-sm mb-12 text-center lg:text-base lg:mx-[10rem] text-n-3">
          Enterprise-grade security with your peace of mind
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-n-7/30 backdrop-blur-lg border border-white/5 
              shadow-lg p-6 hover:border-white/10 transition-all duration-300 hover:bg-n-7/40"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-n-1">
                {item.title}
              </h3>
              <p className="text-sm text-n-3">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Certification Badges Section */}
        <div className="mt-12 pt-12 border-t border-white/5">
          <p className="text-center text-n-3 text-sm mb-6 uppercase tracking-wide">
            Industry Certifications
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center px-4">
            {["ISO 27001", "SOC 2 Type II", "GDPR Compliant", "CCPA Ready"].map(
              (cert, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-full bg-n-7/30 border border-white/5 
                  text-n-2 text-xs font-medium"
                >
                  {cert}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SecurityTrust;
