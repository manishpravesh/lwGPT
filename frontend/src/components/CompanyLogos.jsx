import { companyLogos } from "../constants";

const CompanyLogos = () => {
  return (
    <div className="">
      <h5 className="text-center tagline m-5 p-2">
        Trusted by leading law firms
      </h5>
      <ul className="flex justify-evenly items-center w-full px-8 flex-wrap gap-4">
        {companyLogos.map((company, index) => (
          <li key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-color-1/20 to-color-1/10 flex items-center justify-center mb-2 border border-color-1/30">
              <span className="text-sm font-bold text-color-1">
                {company.logo}
              </span>
            </div>
            <span className="text-xs text-n-4 text-center max-w-20">
              {company.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
