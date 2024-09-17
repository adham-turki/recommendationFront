import PropTypes from 'prop-types'; // Import PropTypes for validation
import Sidebar from '../components/AdminSidebar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Posts from '../components/Posts.jsx';
import Users from '../components/Users.jsx';
import ForceDirectedGraph from '../components/Graph.jsx';
import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import { useSelector } from 'react-redux';


const ContentPage = () => { 
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to Dashboard
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);


  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard  />;
      case 'posts':
        return <Posts />;
      case 'users':
        return <Users />;
      case 'graph':
        return <ForceDirectedGraph  />;
      default:
        return <Dashboard  />;
    }
  };

  return (
    <div>
<div className={`flex flex-1 ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}>
      <div className="flex flex-1 mt-20">
        <Sidebar onNavClick={setActiveComponent} darkMode={darkMode} />
        <main className="flex-1 overflow-auto"> {/* Ensures content can scroll */}
          {renderComponent()}
        </main>
        
      </div>
     
    </div>
    <Footer />
    </div>
    
  );
};

ContentPage.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default ContentPage;