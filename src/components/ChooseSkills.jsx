import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleContinue = () => {
    if (selectedSkills.length >= 5) {
      navigate('/extension-guide');
    } else {
      setError('Please select at least 5 skills.');
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tiles = container.querySelectorAll('.skill-tile');
    const tilePositions = Array.from(tiles).map(tile => {
      const rect = tile.getBoundingClientRect();
      return {
        id: tile.dataset.id,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    });

    const newLines = [];
    if (selectedSkills.length > 1) {
      for (let i = 0; i < selectedSkills.length - 1; i++) {
        const startSkill = selectedSkills[i];
        const endSkill = selectedSkills[i + 1];
        const startPos = tilePositions.find(tile => tile.id === skills.indexOf(startSkill));
        const endPos = tilePositions.find(tile => tile.id === skills.indexOf(endSkill));
        if (startPos && endPos) {
          newLines.push({
            x1: startPos.x,
            y1: startPos.y,
            x2: endPos.x,
            y2: endPos.y,
          });
        }
      }
    }

    setLines(newLines);
  }, [selectedSkills]);

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#e6e2eb] overflow-hidden">
      <div className="relative flex flex-col items-center justify-center flex-grow z-10 mt-10 md:mt-5 px-4 md:px-8 lg:px-16">
        <ParticleBackground className="absolute inset-0 z-0" />
        <h1 className="text-3xl md:text-5xl font-bold text-[#352872] mb-3 md:mb-5 z-10">Choose Your Skills</h1>
        {error && <p className="text-red-600 mb-4 text-sm md:text-base">{error}</p>}
        <div ref={containerRef} className="relative flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center z-10 max-w-4xl sm:max-w-5xl mx-auto">
          <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 1000 1000">
            {lines.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                stroke="#352872"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          {skills.map((skill, index) => (
            <div
              key={skill}
              className={`relative w-24 h-24 sm:w-32 sm:h-32 text-white rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl m-2 p-2 sm:p-3 skill-tile ${
                selectedSkills.includes(skill)
                  ? 'bg-[#8554a9]'
                  : 'bg-[#352872]'
              }`}
              onClick={() => handleSelect(skill)}
              data-id={index}
            >
              <div className="text-xl sm:text-2xl md:text-3xl">{icons[skill]}</div>
              <h3 className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold">{skill}</h3>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 m-6 md:m-8 z-10">
          <Button
            label="Continue"
            onClick={handleContinue}
            style={{ backgroundColor: selectedSkills.length >= 5 ? '#352872' : '#d1d1d1' }}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ChooseSkills;