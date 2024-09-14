import { useLocation } from 'react-router-dom';
import './Login.css'; // Import styles
import { useEffect } from 'react';

const Login = () => {
  // Handler for third-party login
  const location = useLocation();

  const handleLogin = (provider) => {
    let url = '';
    if (provider === "google") {
      url = 'http://localhost:2505/oauth2/authorization/google'; 
    } else if (provider === "github") {
      url = 'http://localhost:2505/oauth2/authorization/github'; 
    }

    // Redirect to the OAuth provider
    window.location.href = url;
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const refreshToken = query.get('refreshToken');

    if (token && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Redirect to home page or other routes
      window.location.href = '/home';
    }
  }, [location]);

  return (
    <div className="login-container flex items-center min-h-screen">
      {/* Login container with background and styling */}
      <div className="mainDiv bg-[#fff] bg-opacity-5 p-10 rounded-lg shadow-2xl inline-block flex flex-col items-center">
        <h2 className="txt text-[#fff]">MATCHIFY</h2>
        
        {/* Google Login Button */}
        <button 
          type="button" 
          className="button type1"
          onClick={() => handleLogin('google')}
        >
          Login with Google
        </button>
        
        {/* GitHub Login Button */}
        <button 
          type="button" 
          className="button type2"
          onClick={() => handleLogin('github')}
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
