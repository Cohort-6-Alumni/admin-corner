import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8 inline-block">
          <div className="text-[150px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </div>
          <motion.div
            initial={{ rotate: -5, y: 0 }}
            animate={{ rotate: 5, y: 10 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2 
            }}
            className="absolute -bottom-2 w-full h-4 bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-30"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Page not found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been moved, deleted, or possibly never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 py-2 px-6 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft /> Go Back
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              <FiHome /> Back to Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
