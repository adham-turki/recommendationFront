import { FaChrome, FaFirefox, FaEdge, FaSafari, FaOpera, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ExtensionGuidePage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const downloadFileUrl = "https://drive.google.com/file/d/17ZA1lqivFySzwQLb0pFzOGiW6FMc42bm/view?usp=sharing"; // Replace with your actual file URL

  return (
    <div className="min-h-screen bg-[#e6e2eb] flex flex-col">
      {/* Header Section */}
      <header className="flex flex-col items-center w-full mb-12 pt-16 relative">
        {/* Header Content */}
        <div className="text-center">
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-6"
            style={{ color: "#352872", fontFamily: "'Besley', serif" }}
          >
            How to Add and Enable a Browser Extension in Developer Mode
          </h1>
          <p
            className="text-sm md:text-base text-gray-700 mb-8"
            style={{ color: "#352872", fontFamily: "'Georgia', serif" }}
          >
            Follow these steps to add and enable your browser extension in
            developer mode for testing and development.
          </p>

          <a
            href={downloadFileUrl}
            download
            className="inline-flex items-center justify-center relative bg-gradient-to-r from-[#352872] to-[#c293dd] text-white p-3 px-4 rounded hover:bg-[#4e7397] text-base font-semibold"
          >
            <FaDownload className="text-lg mr-2 relative z-10" />
            <span className="relative z-10">Download Extension</span>
          </a>
        </div>
      </header>

      {/* Content Section */}
      <div className="flex flex-wrap justify-center gap-12 mb-12">
        <BrowserCard
          icon={<FaChrome className="text-blue-500 text-4xl" />}
          title="Google Chrome"
          steps={[
            "Open Chrome and go to the Extensions page (chrome://extensions/).",
            "Enable 'Developer mode' by toggling the switch in the top right corner.",
            "Click 'Load unpacked' and select the extension's directory.",
            "The extension should now appear in your list and be active!",
          ]}
        />
        <BrowserCard
          icon={<FaFirefox className="text-orange-500 text-4xl" />}
          title="Mozilla Firefox"
          steps={[
            "Open Firefox and go to the Add-ons Manager (about:debugging).",
            "Click 'This Firefox' on the left sidebar.",
            "Click 'Load Temporary Add-on...' and select the extension's directory.",
            "The extension will now be active until you restart Firefox.",
          ]}
        />
        <BrowserCard
          icon={<FaEdge className="text-blue-700 text-4xl" />}
          title="Microsoft Edge"
          steps={[
            "Open Edge and go to the Extensions page (edge://extensions/).",
            "Enable 'Developer mode' by toggling the switch in the bottom left corner.",
            "Click 'Load unpacked' and select the extension's directory.",
            "The extension should now appear in your list and be active!",
          ]}
        />
        <BrowserCard
          icon={<FaSafari className="text-sky-500 text-4xl" />}
          title="Safari"
          steps={[
            "Open Safari and go to Preferences (Safari > Preferences).",
            "Go to the 'Extensions' tab and click 'Developer' in the bottom left corner.",
            "Click 'Add Extension...' and select the extension's directory.",
            "The extension will now be active for testing.",
          ]}
        />
        <BrowserCard
          icon={<FaOpera className="text-red-500 text-4xl" />}
          title="Opera"
          steps={[
            "Open Opera and go to the Extensions page (opera://extensions/).",
            "Enable 'Developer mode' by toggling the switch in the top right corner.",
            "Click 'Load unpacked' and select the extension's directory.",
            "The extension should now appear in your list and be active!",
          ]}
        />
      </div>

      {/* Footer Section with Next Button */}
      <div className="flex justify-center mt-auto mb-12">
        <button
          onClick={() => navigate('/home')} // Navigate to homepage on button click
          className="bg-gradient-to-r from-[#352872] to-[#c293dd] text-white p-3 px-6 rounded hover:bg-[#4e7397] text-base font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

const BrowserCard = ({ icon, title, steps }) => {
  return (
    <div className="w-full max-w-xs bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <div className="flex items-center mb-4">
        <div className="mr-3">{icon}</div>
        <h2
          className="text-xl font-semibold"
          style={{ color: "#352872", fontFamily: "'Besley', serif" }}
        >
          {title}
        </h2>
      </div>
      <ol
        className="list-decimal pl-4 space-y-1"
        style={{ color: "#352872", fontFamily: "'Georgia', serif" }}
      >
        {steps.map((step, index) => (
          <li key={index} className="text-base">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ExtensionGuidePage;
