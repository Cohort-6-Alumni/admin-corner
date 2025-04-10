import { useState, useContext } from "react";
import { AppContext } from "../context/applicationContext";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiSettings, FiHelpCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { logout } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg mr-2">
              <FiUser size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Admin-Corner
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <motion.div whileHover={{ y: -2 }}>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-indigo-600 flex items-center transition-colors"
              >
                <FiHome className="mr-1" /> Dashboard
              </Link>
            </motion.div> */}
            {/* <motion.div whileHover={{ y: -2 }}>
              <button 
                className="text-gray-700 hover:text-indigo-600 flex items-center transition-colors"
                onClick={() => {}} // Empty handler for now
              >
                <FiSettings className="mr-1" /> Settings
              </button>
            </motion.div> */}
            {/* <motion.div whileHover={{ y: -2 }}>
              <button 
                className="text-gray-700 hover:text-indigo-600 flex items-center transition-colors"
                onClick={() => {}} // Empty handler for now
              >
                <FiHelpCircle className="mr-1" /> Help
              </button>
            </motion.div> */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => logout()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <FiLogOut className="mr-2" /> Logout
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-4 py-3 space-y-3 bg-gray-50 shadow-inner">
          <Link 
            to="/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-white text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center"
          >
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <button 
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-white text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center"
            onClick={() => {}} // Empty handler for now
          >
            <FiSettings className="mr-2" /> Settings
          </button>
          <button 
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-white text-gray-700 hover:text-indigo-600 font-medium transition-colors flex items-center"
            onClick={() => {}} // Empty handler for now
          >
            <FiHelpCircle className="mr-2" /> Help
          </button>
          <button
            onClick={() => logout()}
            className="w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium flex items-center"
          >
            <FiLogOut className="mr-2" /> Logout
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;
