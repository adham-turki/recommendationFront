import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const GraphSidebar = ({ blueNodes, orangeNodes }) => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    console.log(userData); // Log userData for debugging
  }, [userData]);

  const handleToggleNode = async (nodeId) => {
    setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId);
  };

  const handleToggleOrangeNode = async (nodeId,id) => {
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
      setUserData(null); // Clear user data if the same node is clicked again
    } else {
      setSelectedNodeId(id);
      await fetchUserData(nodeId);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/user/${userId}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }
  };

  return (
    <div className={`w-1/4 h-800px p-2 ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'} border-l`}>
      <h2 className="text-xl font-bold mb-4">Nodes</h2>

      {/* Blue Nodes Section */}
      <div className="mb-4">
        <h3
          className={`text-lg font-semibold cursor-pointer ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}
          onClick={() => handleToggleSection('blueNodes')}
        >
          Categories
          <FontAwesomeIcon
            icon={expandedSection === 'blueNodes' ? faChevronDown : faChevronRight}
            className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          />
        </h3>
        {expandedSection === 'blueNodes' && (
          <ul>
            {blueNodes.map((node) => (
              <li
                key={node.id}
                className={`cursor-pointer p-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                onClick={() => handleToggleNode(node.id)}
              >
                <div className={`flex items-center justify-between ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                  <div className="flex items-baseline">
                    <FontAwesomeIcon
                      icon={selectedNodeId === node.id ? faChevronDown : faChevronRight}
                      className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <FontAwesomeIcon icon={faLayerGroup} className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} mr-2`} />
                    <div>{node.id}</div>
                  </div>
                </div>
                {selectedNodeId === node.id && (
                  <ul className={`ml-4 mt-2 list-disc ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {Object.entries(node).map(([key, value]) => (
                      <li key={key} className="ml-4">
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Orange Nodes Section */}
      <div>
        <h3
          className={`text-lg font-semibold cursor-pointer ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}
          onClick={() => handleToggleSection('orangeNodes')}
        >
          Users
          <FontAwesomeIcon
            icon={expandedSection === 'orangeNodes' ? faChevronDown : faChevronRight}
            className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          />
        </h3>
        {expandedSection === 'orangeNodes' && (
          <ul>
            {orangeNodes.map((node, index) => (
              <li
                key={node.id}
                className={`cursor-pointer p-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                onClick={() => handleToggleOrangeNode(node.userId,node.id)}
              >
                <div className={`flex items-center justify-between ${darkMode ? (index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900') : (index % 2 === 0 ? 'bg-white' : 'bg-gray-100')}`}>
                  <div className="flex items-baseline">
                    <FontAwesomeIcon
                      icon={selectedNodeId === node.id ? faChevronDown : faChevronRight}
                      className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <FontAwesomeIcon icon={faUser} className={`${darkMode ? 'text-orange-300' : 'text-orange-600'} mr-2`} />
                    <div>{node.id}</div>
                  </div>
                </div>
                {selectedNodeId === node.id && userData && (
                  <ul className={`ml-4 mt-2 list-disc ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {Object.entries(userData).map(([key, value]) => (
                      <li key={key} className="ml-4">
                        {/* <strong>{key}:</strong> {value} */}
                        {key !== 'profilePicture' && key !== 'role' && key !== 'skills' && key !== 'interests' && key !== 'interest' && value != null  && value}
                        {/* <h1>jjj</h1> */}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedNodeId === node.id && !userData && (
                  <div className="ml-4 mt-2 text-gray-600">
                    Loading user data...
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

GraphSidebar.propTypes = {
  blueNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  orangeNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired, // Ensure userId is defined here
      group: PropTypes.string.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default GraphSidebar;
