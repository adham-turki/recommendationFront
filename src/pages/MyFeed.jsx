import "../App.css";
import "../index.css";
// npm install @mui/material @emotion/react @emotion/styled
import Footer from "../components/Footer";
import Recommendations from "../components/Recommendations";
import { useSelector } from "react-redux";

const MyFeed = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state

  return (
    <div className={`pt-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#f6f1fa] text-black'}`}>
      <div
        className={`pt-10 relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className={`layout-container flex h-full grow flex-col pb-10 ${
          darkMode ? 'bg-gray-800' : 'bg-[#f6f1fa]'
        }`}>
          <div className="px-40 flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <Recommendations />
            </div>
          </div>
        </div>
      </div>

      <Footer className={`w-full ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`} />
    </div>
  );
};

export default MyFeed;
