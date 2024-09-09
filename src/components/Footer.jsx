import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import matchifyLogo from "../assets/matchify_logo.png"; // Import the logo

const Footer = () => {
  return (
    <footer
      className="bg-white text-[#14044c] py-4 px-12 shadow-lg"
      style={{ fontFamily: "'Quicksand', sans-serif" }} // Apply Quicksand font
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            <img
              src={matchifyLogo} // Use the imported logo as it is, without embedding it into a circle
              alt="Logo"
              className="h-12 object-contain "
            />
            <span className="text-3xl font-bold text-[#14044c]">Matchify</span>
          </div>
          <p className="max-w-sm text-[#14044c]">
            Connects you with personalized content and matches your profile with similar interests to keep you engaged and informed.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-xl font-semibold mb-4 text-[#14044c]">Contact Us</h3>
          <ul>
            <li className="flex items-center mb-2 text-[#14044c]">
              <FaMapMarkerAlt className="mr-3 text-[#14044c]" />
              <span>Ramallah, Palestine</span>
            </li>
            <li className="flex items-center mb-2 text-[#14044c]">
              <FaPhoneAlt className="mr-3 text-[#14044c]" />
              <span>+970 597333313</span>
            </li>
            <li className="flex items-center text-[#14044c]">
              <FaEnvelope className="mr-3 text-[#14044c]" />
              <span>contact@525k.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#14044c]">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/525K.io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#14044c] hover:bg-[#5342a9] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/525K_io"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#14044c] hover:bg-[#5342a9] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/company/525k/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#14044c] hover:bg-[#5342a9] hover:text-white hover:scale-105 transform transition duration-300 shadow-md"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center">
        <p className="text-[#14044c]">
          &copy; {new Date().getFullYear()} 525k. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
