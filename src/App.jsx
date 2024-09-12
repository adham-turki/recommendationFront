import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './components/Login/Login.jsx';
import ChooseInterest from './components/ChooseInterest.jsx';
import ChooseSkills from './components/ChooseSkills.jsx';
import ExtensionGuidePage from './components/ExtensionGuidePage.jsx';
import Homepage from './pages/Homepage';
import MyFeed from './pages/MyFeed';
import HistoryPage from './pages/HistoryPage';
import Search from './pages/Search';
import ProfilePage from './pages/ProfilePage';
import SavedItemsPage from './pages/SavedItemsPage';
import AdminPage from './pages/AdminPage';

import EditSkills from './components/EditSkills.jsx';

import { useState } from 'react';


const App = () => {

  return (
    <Router>

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/interests" element={<ChooseInterest />} />  
        <Route path="/skills" element={<ChooseSkills />} />
        <Route path="/extension-guide" element={<ExtensionGuidePage />} />
        <Route path="/home" element={<Homepage />} />

        {/* Authenticated routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-items" element={<SavedItemsPage />} />
        <Route path="/my-feed" element={<MyFeed />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/edit-skills" element={<EditSkills />} /> 
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
