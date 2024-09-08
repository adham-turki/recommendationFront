import { useState } from 'react'; // Import useState for managing loading and error state
import backgroundImage from '../../assets/signup.jpeg'; // Import background image
import './Signup.css'; // Import CSS for styling

const Signup = () => {
  // State for handling loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    await handleThirdPartySignup('Google');
  };

  // Handle GitHub Signup
  const handleGithubSignup = async () => {
    await handleThirdPartySignup('GitHub');
  };

  // Generalized function for handling third-party signup
  const handleThirdPartySignup = async (provider) => {
    setLoading(true); // Set loading state to true while submitting
    setError(''); // Clear any existing errors

    try {
      // Mocked request payload, adjust as needed
      const payload = { thirdParty: provider };

      // Make POST request to backend API for signup
      const response = await fetch('/register3p', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // If signup is successful, redirect to login page
        window.location.href = '/home';
      } else {
        // Handle different error responses from the backend
        const data = await response.json();
        setError(data.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
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
          <h2 className="text-5xl text-[#fff] mb-5">MATCHIFY</h2>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Signup Buttons */}
        <button
          type="button"
          className="button type1 mb-5"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
        </button>
        <button
          type="button"
          className="button type2"
          onClick={handleGithubSignup}
          disabled={loading}
        >
        </button>

        {/* Login Link */}
        <p className="text-sm text-[#fff] type3 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-[#fff] font-bold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
