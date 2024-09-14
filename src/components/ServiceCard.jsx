const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-slate-50 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
      <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-[#8d68c3]">{icon}</div>
      <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#14044C] text-center">{title}</h3>
      <p className="text-sm sm:text-base text-[#14044cc0] text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;
