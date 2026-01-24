import Section from "./Section";

const TechStack = () => {
  return (
    <Section id="tech-stack">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">
          Powered by Modern Technology
        </h2>
        <p className="text-n-3">
          LawGpt is built with cutting-edge AI and cloud infrastructure
        </p>
      </div>
      <div className="relative flex justify-center items-center min-h-[400px]">
        <div className="absolute rounded-full border border-n-10/40 min-w-72 min-h-72 flex justify-center items-center">
          <div className="absolute rounded-full border border-n-10/40 h-46 w-46 flex justify-center items-center">
            <h2 className="text-3xl font-bold text-center mb-4"></h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="React"
            className="w-16 h-16"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
            alt="Node.js"
            className="w-16 h-16"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
            alt="MongoDB"
            className="w-16 h-16"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
            alt="Express.js"
            className="w-16 h-16"
          />
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="JavaScript"
            className="w-16 h-16"
          />
        </div>
      </div>
    </Section>
  );
};

export default TechStack;
