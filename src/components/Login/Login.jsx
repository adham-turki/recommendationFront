import { useState } from 'react';  // Import useState for managing local state
import backgroundImage from '../../assets/login.jpg'; // Import background image
import './Login.css'; // Import styles
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
  // State to manage error messages and loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler for third-party login
  const handleLogin = async (provider) => {
    setLoading(true);  // Set loading to true while the request is in progress
    setErrorMessage('');  // Clear any existing error messages

    try {
      const response = await axios.post('/login3p', { provider });  // Replace with actual provider and accountId
      
      if (response.status === 200) {  // If login is successful
        // Redirect to home page after successful login
        window.location.href = '/home';  
      } else {
        // If the response status is not 200, set an error message
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Unauthorized. Please check your credentials.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);  // Set loading to false after the request is complete
    }
  };

  return (
    <div
      className="flex items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Login container with background and styling */}
      <div className="bg-[#fff] bg-opacity-0 p-8 rounded-lg shadow-2xl max-w-sm w-full flex flex-col items-center ml-40">
        {/* Header section with logo and title */}
        <div className="flex justify-center items-center mb-4 mr-4 flex-row">
          {/* Logo can be added here if needed */}
          <div className="p-2">
            {/* Uncomment and add logo if needed */}
            {/* <img src={logoImage} alt="Logo" className="w-10 h-12" /> */}
          </div>
          {/* App title */}
          <h2 className="text-5xl text-[#fff] mb-5">MATCHIFY</h2>
        </div>
        
        {/* Google Login Button */}
        <button 
          type="button" 
          className="button type1 mb-5" 
          onClick={() => handleLogin('google')}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Logging in...' : ''}
        </button>

        {/* GitHub Login Button */}
        <button 
          type="button" 
          className="button type2" 
          onClick={() => handleLogin('github')}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Logging in...' : ''}
        </button>

        {/* Error message display */}
        {errorMessage && (
          <p className="text-sm text-red-500 mt-4">{errorMessage}</p>
        )}

        {/* Sign up link */}
        <p className="text-sm text-[#fff] type3 mt-4">
           Don't have an account?{' '}
          <a href="/signup" className="text-[#fff] font-bold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

