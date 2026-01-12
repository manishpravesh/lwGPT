import { brainwave } from "../assets";
import { socials, footerLinks } from "../constants";
import Section from "./Section";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <a className="inline-block mb-6" href="#hero">
              <img src={brainwave} width={190} height={40} alt="LawGPT" />
            </a>
            <div className="text-n-4 caption">
              <h6 className="h6 mb-4">Disclaimer</h6>
              <p>
                LawGPT is an AI-powered legal assistant and should not be
                considered a substitute for professional legal advice. The
                information provided by LawGPT is for informational purposes
                only.
              </p>
            </div>
          </div>

          <div>
            <h6 className="h6 mb-4">Learn More</h6>
            <ul>
              {footerLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className="block py-2 text-n-4 hover:text-n-1 transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="h6 mb-4">Follow Us</h6>
            <ul className="flex gap-4">
              {socials.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                >
                  <img
                    src={item.iconUrl}
                    width={16}
                    height={16}
                    alt={item.title}
                  />
                </a>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-n-6 mt-10 pt-10 flex items-center justify-between text-n-4 caption">
          <p>© {new Date().getFullYear()}. All rights reserved.</p>
          <p>
            Designed with <span className="text-color-1">♥</span> by the Gemini
            Team
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;