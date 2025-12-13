import { companyLogos } from "../constants";

const CompanyLogos = ()=>{
    return (
        <div className="">
            <h5 className="text-center tagline m-5 p-2">Trusted by leading Law firms</h5>
            <ul className="flex justify-evenly items-center w-full px-8">
                {companyLogos.map((logo,index)=>(
                    <li key={index} className="">
                        <img src={logo} alt={logo} 
                        width={100} height={50}
                        className="object-contain"
                        />
                    </li>

                ))}
            </ul>

        </div>

    );
}

export default CompanyLogos;