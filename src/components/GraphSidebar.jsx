import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const GraphSidebar = ({ blueNodes, orangeNodes, darkMode }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [first, setFirst] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API}/profile`);
      setFirst(await res.json);
    }
    fetchData();
  }, []);

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleToggleNode = (nodeId) => {
    setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId);
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
                        <strong>{key}:</strong> {value.toString()}
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
                onClick={() => handleToggleNode(node.id)}
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
                {selectedNodeId === node.id && (
                  <ul className={`ml-4 mt-2 list-disc ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {Object.entries(node).map(([key, value]) => (
                      <li key={key} className="ml-4">
                        <strong>{key}:</strong> {value.toString()}
                      </li>
                    ))}
                  </ul>
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
      group: PropTypes.string.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired, // Add darkMode to prop types
};

export default GraphSidebar;
