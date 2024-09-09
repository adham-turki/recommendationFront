import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaCode, FaPaintBrush, FaDatabase, FaUser, FaMobileAlt, FaNetworkWired, FaServer, FaRobot, FaCloud, FaLock, FaBug, FaBriefcase, FaMusic, FaPen, FaChartLine, FaLanguage, FaCogs, FaPlane } from 'react-icons/fa';
import Button from './Button';
import ParticleBackground from './ParticleBackground';

const icons = {
  Coding: <FaCode />,
  Design: <FaPaintBrush />,
  Database: <FaDatabase />,
  Management: <FaUser />,
  Mobile: <FaMobileAlt />,
  Networking: <FaNetworkWired />,
  DevOps: <FaServer />,
  AI: <FaRobot />,
  Cloud: <FaCloud />,
  Security: <FaLock />,
  Debugging: <FaBug />,
  Business: <FaBriefcase />,
  Music: <FaMusic />,
  Writing: <FaPen />,
  Marketing: <FaChartLine />,
  Languages: <FaLanguage />,
  Engineering: <FaCogs />,
  Travel: <FaPlane />,
};

const skills = [
  'Coding', 'Design', 'Database', 'Management', 'Mobile', 'Networking', 'DevOps',
  'AI', 'Cloud', 'Security', 'Debugging', 'Business', 'Music', 'Writing', 'Marketing',
  'Languages', 'Engineering', 'Travel',
];

const ChooseSkills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const handleSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleContinue = () => {
    if (selectedSkills.length >= 5) {
      navigate('/extension-guide'); // Navigate to ExtensionGuidePage
    } else {
      alert('Please select at least 5 skills.'); // Show error message
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#e6e2eb] to-[#e6e2eb]">
      <div className="relative flex flex-col items-center justify-center flex-grow z-10 mt-24">
        <ParticleBackground className="absolute inset-0 z-0" />
        <h1 className="text-3xl font-bold text-[#352872] mb-6 z-10">Choose Your Skills</h1>
        <div className="relative flex flex-wrap gap-4 justify-center z-10 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill}
              className={`relative w-32 h-32 text-white rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl m-2 p-3 ${
                selectedSkills.includes(skill)
                  ? 'bg-[#8554a9]'
                  : 'bg-[#352872]'
              }`}
              onClick={() => handleSelect(skill)}
            >
              <div className="text-3xl">{icons[skill]}</div>
              <h3 className="mt-2 text-sm font-semibold">{skill}</h3>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-6 z-10">
          <Button label="Continue" onClick={handleContinue} />
        </div>
      </div>
    </div>
  );
};

export default ChooseSkills;
