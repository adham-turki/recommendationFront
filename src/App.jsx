// // App.js
// import ContentPage from './pages/AdminPage.jsx';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import Header from './components/Header.jsx';

// const App = () => {
//   const [darkMode, setDarkMode] = useState(false); // Manage dark mode at the top level

//   return (
//     <Router>
//       <div className={`min-h-screen min-w-full flex flex-col ${darkMode ? 'dark' : ''} bg-[#FBFBFB]`}>
//         <Header darkMode={darkMode} setDarkMode={setDarkMode} />

//         <Routes>
//           <Route path="/" element={<ContentPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MyFeed from "./pages/MyFeed";

const App = () => {
  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/my-feed" element={<MyFeed />} />
        </Routes>
      </Router>
  
  );
};

export default App;
