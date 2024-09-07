import { useState } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import Posts from '../components/Posts.jsx';  
import Users from '../components/Users.jsx';  
import ForceDirectedGraph from '../components/Graph.jsx';

const ContentPage = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to Dashboard
  const [darkMode, setDarkMode] = useState(false); // Add state for dark mode

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard darkMode={darkMode} />; // Pass darkMode prop to Dashboard
      case 'posts':
        return <Posts darkMode={darkMode} />; // Pass darkMode prop to Posts
      case 'users':
        return <Users darkMode={darkMode} />; // Pass darkMode prop to Users
      case 'graph':
        return <ForceDirectedGraph darkMode={darkMode} />; // Pass darkMode prop to Graph
      default:
        return <Dashboard darkMode={darkMode} />;
    }
  };

  return (
    <div className={`flex min-h-screen flex-col ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}> {/* Apply dark mode classes */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} /> {/* Pass darkMode and setDarkMode */}
      <div className="flex flex-1 mt-20">
        <Sidebar onNavClick={setActiveComponent} darkMode={darkMode} /> {/* Pass darkMode prop to Sidebar */}
        <main className="flex-1">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default ContentPage;
