import matchifyLogo from "../assets/matchify_logo1.png";
import matchifyLogo_white from "../assets/matchify_logo_white.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <footer
      className={`py-0 px-12 shadow-lg ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-[#1D3557]"}`}
    >
      <div className="mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="pt-5 mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            <img
              src={darkMode ? matchifyLogo_white : matchifyLogo}
              alt="Logo"
              className="h-12 object-contain"
            />
            <span className={`text-3xl font-bold ${darkMode ? "text-gray-100" : "text-[#14044c]"}`}>
              Matchify
            </span>
          </div>
          <p className={`max-w-sm ${darkMode ? "text-gray-400" : "text-[#14044c]"}`}>
            Connects you with personalized content and matches your profile with
            similar interests to keep you engaged and informed.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-8 md:mb-0 py-10">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-100" : "text-[#1D3557]"}`}>
            Contact Us
          </h3>
          <ul>
            <li className={`flex items-center mb-2 ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`}>
              <FaMapMarkerAlt className={`mr-3 ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`} />
              <span>Ramallah, Palestine</span>
            </li>
            <li className={`flex items-center mb-2 ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`}>
              <FaPhoneAlt className={`mr-3 ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`} />
              <span>+970 597333313</span>
            </li>
            <li className={`flex items-center ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`}>
              <FaEnvelope className={`mr-3 ${darkMode ? "text-gray-400" : "text-[#1D3557]"}`} />
              <span>contact@Matchifyk.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="py-10">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-100" : "text-[#1D3557]"}`}>
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/525K.io"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-[#1D3557] hover:bg-[#33527A]"} hover:text-white hover:scale-105 transform transition duration-300 shadow-md`}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/525K_io"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-[#1D3557] hover:bg-[#33527A]"} hover:text-white hover:scale-105 transform transition duration-300 shadow-md`}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/525k/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-white text-[#1D3557] hover:bg-[#33527A]"} hover:text-white hover:scale-105 transform transition duration-300 shadow-md`}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={`mt-0 border-t-2 ${darkMode ? "border-gray-600" : "border-gray-400"} pt-4 text-center`}>
        <p className={`${darkMode ? "text-gray-400" : "text-[#1D3557]"}`}>
          &copy; {new Date().getFullYear()} Matchify. All rights reserved.
        </p>
      </div>


    </footer>
  );
};

export default Footer;
