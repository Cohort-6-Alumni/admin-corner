import { useState, useContext } from "react";
import { login } from "../api";
import { AppContext } from "../context/applicationContext";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiLogIn, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setSession } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    }

    setError("");
    setIsLoading(true);
    
    try {
      const response = await login(username, password);
      if (response.error) {
        setError(response.error);
      } else {
        setSession(response);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Left side - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16"
      >
        <div className="max-w-md">
          <div className="mb-6 flex items-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl mr-3">
              <FiUser size={24} />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin-Corner
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to Obsidi Alumni Invitation Management Portal
          </h2>
          
          <p className="text-gray-600 mb-8">
            Streamline your invitation process, track who&apos;s joining the platform, and manage user onboarding experience.
          </p>
        </div>
      </motion.div>
      
      {/* Right side - Login form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-16"
      >
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to your account</h2>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center"
              >
                <FiAlertCircle className="mr-2" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleEmailChange}
                    className={`pl-10 w-full px-4 py-2 border ${error ? "border-red-300" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Enter your username"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`pl-10 w-full px-4 py-2 border ${error ? "border-red-300" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                {/* <div className="text-sm">
                  <button 
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => {}}
                  >
                    Forgot password?
                  </button>
                </div> */}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiLogIn className="mr-2" />
                    Sign in
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
