import TopLeftRight from "../assets/curve-1.png";
import BottomLeft from "../assets/curve-2.png";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiUser, FiCalendar, FiSettings, FiClock } from "react-icons/fi";

const Card = ({ user }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  const getTimeOfDay = () => {
    const hours = currentDate.getHours();
    if (hours < 12) return "Morning";
    if (hours < 18) return "Afternoon";
    return "Evening";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600"
    >
      <img
        src={TopLeftRight}
        alt="Decoration"
        className="absolute top-0 right-0 w-32 md:w-48 opacity-50 rounded-tr-xl"
      />
      <img
        src={BottomLeft}
        alt="Decoration"
        className="absolute bottom-0 left-0 w-32 md:w-48 opacity-50 rounded-bl-xl"
      />
      
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center text-indigo-100 mb-2">
              <FiCalendar className="mr-2" /> 
              <span>{formattedDate}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Good {getTimeOfDay()}, {user}!
            </h2>
            <p className="text-indigo-100">
              Manage your invites and track who's joining your application
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 text-white"
            >
              <div className="bg-white bg-opacity-30 rounded-full p-2 mr-3">
                <FiUser className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-indigo-100">Admin Account</p>
                <p className="font-medium">Invitation Manager</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* <div className="mt-8 flex flex-wrap gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center"
          >
            <div className="mr-3 bg-white bg-opacity-30 rounded-full p-2">
              <FiClock className="text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-100">Session</p>
              <p className="font-medium text-white">15 min remaining</p>
            </div>
          </motion.div>
          
          <motion.button 
            whileHover={{ y: -5 }}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center"
          >
            <div className="mr-3 bg-white bg-opacity-30 rounded-full p-2">
              <FiSettings className="text-white" />
            </div>
            <span className="font-medium text-white">Settings</span>
          </motion.button>
        </div> */}
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Card;
