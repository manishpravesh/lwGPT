import ButtonSvg from "../assets/svg/ButtonSvg.jsx";
const Button = ({ className, children, onClick, white, px, href }) => {
  const classes = `button relative inline-flex items-center 
    justify-center h-11 transition-colors hover:text-color-1 ${px || "px-4"} ${
    white ? "text-n-8" : "text-n-1"
  } ${className || ""}`; // css stoerd in variable

  const spanClasses = "relative z-10";
  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span>{children}</span>
      {ButtonSvg(white)}
    </button>
  );
  const renderLink = () => (
    <a href={href} className={classes}>
      <span>{children}</span>
      {ButtonSvg(white)}
    </a>
  );
  return href ? renderLink() : renderButton();
};

export default Button;
