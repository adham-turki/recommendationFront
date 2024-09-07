// App.js
import ContentPage from './pages/AdminPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // Manage dark mode at the top level

  return (
    <Router>
      <div className={`min-h-screen min-w-full flex flex-col ${darkMode ? 'dark' : ''} bg-[#FBFBFB]`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <Routes>
          <Route path="/" element={<ContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
