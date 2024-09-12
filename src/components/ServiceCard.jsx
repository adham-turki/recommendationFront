
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-5xl mb-4 text-[#8d68c3] ">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-[#14044C]">{title}</h3>
      <p className="text-[#14044cc0] text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;
