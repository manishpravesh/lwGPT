const FeatureCard = ({
  className,
  title,
  description,
  down,
  imageURL,
  imageFlag,
  imagePos, // values like: 'justify-center', 'justify-start'---remember
  // also can removed renderImage function with the help of imagePos --- remember to remove it later
}) => {
  const alignment = imagePos || "justify-start";

  const renderImage = () => (
    <div className={`flex ${alignment} my-2`}>
      <img
        src={imageURL}
        alt=""
        width={50}
        height={50}
        className="rounded-md mx-4"
      />
    </div>
  );

  return (
    <div
      className={`${className} text-left backdrop-blur-sm p-2 rounded-3xl shadow bg-n-7/50 break-inside-avoid mb-[0.25rem]`}
    >
      {!down && imageFlag && renderImage()}
      <h3 className="text-xl font-semibold px-3 pt-3 ">{title}</h3>
      <p className="text-gray-700 px-2 pb-2">{description}</p>
      {down && imageFlag && renderImage()}
    </div>
  );
};

export default FeatureCard;
