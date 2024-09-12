
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-[#1D3557] py-0 px-12 shadow-lg">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="pt-5 mb-8 md:mb-0">
          
          <div className="flex items-center mb-4">
            <img
              src=".\src\assets\matchify_logo1.png" // Use the imported logo as it is, without embedding it into a circle
              alt="Logo"
              className="h-12 object-contain "
            />
            <span className="text-3xl font-bold text-[#14044c]">Matchify</span>
          </div>
          <p className="max-w-sm text-[#14044c]">
            Connects you with personalized content and matches your profile with
            similar interests to keep you engaged and informed.
          </p>
        </div>

        {/* Profile Picture and Description */}
        {/* <div className="mb-8 md:mb-0">
          

          <div className="flex items-center mb-4 py-2">
            <img
              src=".\src\assets\matchify_logo1.png"
              alt="Logo"
              className="w-20 mr-3 border-opacity-0  pb-0"
            />
            <span className="pt-0 text-2xl font-bold text-[#1D3557]">Matchify</span>
          </div>
          <p className="max-w-sm  text-[#1D3557]">
            connects you with personalized content and matches your profile with
            similar interests to keep you engaged and informed.
          </p>
        </div>
        */}

        {/* Contact Information */}
        <div className="mb-8 md:mb-0 py-10">
          <h3 className="text-xl font-semibold mb-4 text-[#1D3557]">
            Contact Us
          </h3>
          <ul>
            <li className="flex items-center mb-2 text-[#1D3557]">
              <FaMapMarkerAlt className="mr-3 text-[#1D3557]" />
              <span> Ramallah, Palestine</span>
            </li>
            <li className="flex items-center mb-2 text-[#1D3557]">
              <FaPhoneAlt className="mr-3 text-[#1D3557]" />
              <span>+970 597333313</span>
            </li>
            <li className="flex items-center text-[#1D3557]">
              <FaEnvelope className="mr-3 text-[#1D3557]" />
              <span>contact@Matchifyk.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="py-10">
          <h3 className="text-xl font-semibold mb-4 text-[#1D3557]">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/525K.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1D3557] hover:bg-[#33527A] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/525K_io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1D3557] hover:bg-[#33527A] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/525k/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#1D3557] hover:bg-[#33527A] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-0 border-t-2 border-gray-40000 pt-4 text-center">
        <p className="text-[#1D3557]">
          &copy; {new Date().getFullYear()} Matchify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
