
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import ChooseInterest from './components/ChooseInterest.jsx';
import ChooseSkills from './components/ChooseSkills.jsx';
import ExtensionGuidePage from './components/ExtensionGuidePage.jsx'; // Import ExtensionGuidePage component
import Homepage from './pages/Homepage';
import MyFeed from './pages/MyFeed';
import HistoryPage from './pages/HistoryPage';
import Search from './pages/Search';
import ProfilePage from './pages/ProfilePage';
import SavedItemsPage from './pages/SavedItemsPage';
import AdminPage from './pages/AdminPage';
import { useState } from 'react';
const App = () => {
  return (
        <Routes>
          <Route path="/" element={<ContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        {/* <Header darkMode={darkMode} setDarkMode={setDarkMode} /> */}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/interests" element={<ChooseInterest />} />  
          <Route path="/skills" element={<ChooseSkills />} />
          <Route path="/extension-guide" element={<ExtensionGuidePage />} /> {/* Add this route */}
          <Route path="/home" element={<Homepage />} />

          {/* Authenticated routes */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-items" element={<SavedItemsPage />} />
          <Route path="/my-feed" element={<MyFeed />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminPage />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
    );
};

export default App;
