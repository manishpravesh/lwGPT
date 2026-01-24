import React, { useState } from "react";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Is my legal information kept confidential?",
      answer:
        "Yes, all your legal documents and conversations are encrypted end-to-end and stored securely. We comply with all data protection regulations including GDPR and CCPA.",
    },
    {
      id: 2,
      question: "Can I use this for court cases?",
      answer:
        "While our AI provides excellent guidance and preparation, it should supplement professional legal advice. For critical cases, consult with a licensed attorney.",
    },
    {
      id: 3,
      question: "What happens to my data if I cancel?",
      answer:
        "You can export all your documents at any time. After cancellation, your data is securely deleted within 30 days upon request.",
    },
    {
      id: 4,
      question: "Is there a free trial?",
      answer:
        "Yes! Start with our free tier to explore basic features. Upgrade anytime to unlock advanced legal research and unlimited consultations.",
    },
    {
      id: 5,
      question: "Do you offer team/enterprise plans?",
      answer:
        "Absolutely. Custom enterprise plans are available with dedicated support, SSO, and advanced analytics. Contact our sales team for details.",
    },
    {
      id: 6,
      question: "How often is the legal database updated?",
      answer:
        "Our legal database is updated daily with the latest case law, statutes, and regulations from all 50 states and federal courts.",
    },
  ];

  return (
    <Section id="faq">
      <div className="">
        <h2 className="text-5xl text-center mb-2 font-semibold">LawGpt FAQs</h2>
        <p className="text-sm mb-12 text-center lg:text-base lg:mx-[10rem] text-n-3">
          Everything you need to know about our platform
        </p>

        <div className="max-w-3xl mx-auto space-y-3 px-4">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </Section>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded-2xl bg-n-7/30 backdrop-blur-lg border border-white/5 
      shadow-lg overflow-hidden transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <h3 className="text-left font-medium text-n-1">{faq.question}</h3>
        <div
          className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <Arrow />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 border-t border-white/5 text-n-3 text-sm leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FAQ;
