import ServiceCard from "./ServiceCard";
import { FaUserFriends, FaSearch, FaStar } from "react-icons/fa"; // Importing icons

const ServicesSection = () => {
  const services = [
    {
      icon: <FaUserFriends />,
      title: "Connect with People",
      description:
        "Meet new people with similar interests and build your network.",
    },
    {
      icon: <FaSearch />,
      title: "Customizable Content",
      description:
        "Enjoy personalized data tailored to your tastes and preferences.",
    },
    {
      icon: <FaStar />,
      title: "Explore Categories",
      description:
        "Search and discover content in specific categories that interest you.",
    },
  ];

  return (
    <div className="py-10 min-h-[480px] sm:min-h-[480px] px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-center text-3xl sm:text-4xl font-bebas-neue font-bold text-[#14044C] mb-6 sm:mb-8">
        Our Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;