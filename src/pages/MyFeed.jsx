import "../App.css";
import "../index.css";
// npm install @mui/material @emotion/react @emotion/styled
import Footer from "../components/Footer";
import Recommendations from "../components/Recommendations";

const MyFeed = () => {
  return (
    <div className="pt-10">

      <div
        className=" pt-10 relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col pb-10 bg-[#f6f1fa] ">
          <div className="px-40 flex flex-1 justify-center ">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <Recommendations />
            </div>
          </div>
        </div>
      </div>

      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default MyFeed;
