import { useState } from 'react';  // Import useState for managing local state
import './Login.css'; // Import styles

const Login = () => {
  // State to manage loading state (no longer used)
  // const [loading, setLoading] = useState(false);

  // Handler for third-party login
  const handleLogin = (provider) => {
    if(provider == "google"){

      window.location.href = 'http://localhost:2505/oauth2/authorization/google';
    }else{

      window.location.href = 'http://localhost:2505/oauth2/authorization/github';
    }
    
  };

  return (
    <div className="login-container flex items-center  min-h-screen">
      {/* Login container with background and styling */}
      <div className="mainDiv bg-[#fff] bg-opacity-5 p-10 rounded-lg shadow-2xl inline-block flex flex-col items-center">
        <h2 className="txt text-[#fff] ">MATCHIFY</h2>
        
        {/* Google Login Button */}
        <button 
          type="button" 
          className="button type1"
          onClick={() => handleLogin('google')}
        >
        </button>

        {/* GitHub Login Button */}
        <button 
          type="button" 
          className="button type2"
          onClick={() => handleLogin('github')}
        >
        </button>
      </div>
    </div>
  );
};

export default Login;
