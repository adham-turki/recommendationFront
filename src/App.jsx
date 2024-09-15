import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

import Header from './components/Header.jsx';
import { useEffect } from 'react';
import { fetchUserData } from './redux/userSlice.js';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();

  const authenticatedRoutes = [
    '/profile',
    '/saved-items',
    '/my-feed',
    '/history',
    '/search',
    '/admin',
    '/edit-skills',
  ];
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);


  return (
    <Router>
      {authenticatedRoutes.includes(window.location.pathname) && (
        <Header  />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/interests" element={<ChooseInterest />} />
        <Route path="/skills" element={<ChooseSkills />} />
        <Route path="/extension-guide" element={<ExtensionGuidePage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-skills" element={<EditSkills />} />
        <Route path="/saved-items" element={<SavedItemsPage />} />
        <Route path="/my-feed" element={<MyFeed  />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<AdminPage  />} />


      </Routes>
    </Router>
  );
};

export default App;
