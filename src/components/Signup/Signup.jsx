// Signup.jsx
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useState } from 'react';
import backgroundImage from '../../assets/signup.jpeg'; // Import background image
import './Signup.css'; // Import CSS for styling

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle successful signup
  const handleSignupSuccess = () => {
    navigate('/interests'); // Redirect to Interest page
  };

  return (
    <div
      className="flex items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Signup Form positioned on the right */}
      <div className="bg-[#fff] bg-opacity-0 p-8 rounded-lg shadow-2xl max-w-sm w-full flex flex-col items-center ml-auto mr-40">
        {/* Logo and Heading */}
        <div className="flex justify-center items-center mb-4 mr-4 flex-row">
          <div className="p-2">
            {/* Logo image or SVG can be added here */}
          </div>
          <h2 className="txt text-5xl text-[#fff] mb-5">MATCHIFY</h2>
        </div>

        {/* Signup Buttons */}
        <button
          type="button"
          className="button type4 mb-5"
          onClick={handleSignupSuccess} // Trigger navigation on click
        >
        </button>
        <button
          type="button"
          className="button type5"
          onClick={handleSignupSuccess} // Trigger navigation on click
        >
        </button>

        {/* Login Link */}
        <p className="txt text-sm text-[#fff] type6 mt-4">
          Already have an account?{' '}
          <a href="/login" className="txt text-[#fff] font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
