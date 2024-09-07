import PropTypes from 'prop-types'; // Import PropTypes for validation
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Posts from '../components/Posts.jsx';
import Users from '../components/Users.jsx';
import ForceDirectedGraph from '../components/Graph.jsx';
import { useState } from 'react';


const ContentPage = ({ darkMode }) => { 
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to Dashboard

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />;
      case 'posts':
        return <Posts darkMode={darkMode} />;
      case 'users':
        return <Users darkMode={darkMode} />;
      case 'graph':
        return <ForceDirectedGraph darkMode={darkMode} />;
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`flex flex-1 ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}> 
      <div className="flex flex-1 mt-20">
        <Sidebar onNavClick={setActiveComponent} darkMode={darkMode} />
        <main className="flex-1 overflow-auto"> {/* Ensures content can scroll */}
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

ContentPage.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default ContentPage;
