import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCode, FaPaintBrush, FaDatabase, FaUser, FaMobileAlt, FaNetworkWired, FaServer, FaRobot, FaCloud,
  FaLock, FaBug, FaBriefcase, FaMusic, FaPen, FaChartLine, FaLanguage, FaCogs, FaPlane
} from 'react-icons/fa';
import Button from './Button';
import ParticleBackground from './ParticleBackground';
import Footer from './Footer';
import { useSelector } from 'react-redux';

// Skill icons
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

// Skill categories
const skills = [
  'Coding', 'Design', 'Database', 'Management', 'Mobile', 'Networking', 'DevOps', 'AI', 'Cloud',
  'Security', 'Debugging', 'Business', 'Music', 'Writing', 'Marketing', 'Languages', 'Engineering', 'Travel'
];

const EditSkills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]); // Initialize with empty array
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Fetch existing user skills
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setSelectedSkills(data.skills); // Set skills from fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching user profile");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSelect = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSaveChanges = () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          skills: selectedSkills, // Send the updated skills to the server
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const updatedData = await response.json();
      console.log("Updated skills:", updatedData.skills); // Log the updated skills
      setShowConfirmation(false); // Hide confirmation dialog after saving
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  const cancelSave = () => {
    setShowConfirmation(false); // Hide confirmation dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`relative min-h-screen flex flex-col justify-between ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-[#e6e2eb] text-gray-900'}`}>
      {/* Header */}

     

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center flex-grow z-10 mt-24">
        <ParticleBackground className="absolute inset-0 z-0" />

        <h1 className={`text-3xl font-bold mb-6 z-10 ${darkMode ? 'text-white' : 'text-[#352872]'}`}>
          Edit Your Skills
        </h1>

        <div className="relative flex flex-wrap gap-4 justify-center z-10 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill}
              className={`relative w-32 h-32 text-white rounded-full flex flex-col items-center justify-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl m-2 p-3 ${
                selectedSkills.includes(skill)
                  ? 'bg-[#8554a9]'
                  : darkMode
                  ? 'bg-[#222831]'
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
          <Button label="Save Changes" onClick={handleSaveChanges} />
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className={`bg-white dark:bg-[#2b2c34] p-6 rounded-md shadow-lg`}>
            <h3 className="text-xl mb-4 dark:text-gray-200">
              Are you sure you want to save changes?
            </h3>
            <div className="flex justify-end gap-4">
              <Button label="Cancel" onClick={cancelSave} />
              <Link to="/profile">
                <Button label="Sure" onClick={confirmSave} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditSkills;