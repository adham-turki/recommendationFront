import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Login from '../components/Login/Login'; // Import Login component
import Signup from '../components/Signup/Signup'; // Import Signup component

const LinkLoginPage = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for Signup page */}
        <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
  );
};

export default LinkLoginPage;