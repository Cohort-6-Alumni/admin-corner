import { useState } from "react";
import Card from "../components/Card";
import InviteForm from "../components/InviteForm";
import UserList from "../components/UserList";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiUsers, FiMail, FiArrowRight } from "react-icons/fi";

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState("invite");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card user={`${user.data.firstName} ${user?.data.lastName}`} />
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="mt-8 mb-4 flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("invite")}
            className={`px-5 py-3 rounded-lg font-medium flex items-center ${
              activeTab === "invite" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            <FiMail className="mr-2" />
            Send Invites
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("users")}
            className={`px-5 py-3 rounded-lg font-medium flex items-center ${
              activeTab === "users" 
                ? "bg-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            <FiUsers className="mr-2" />
            Invited Users
          </motion.button>
        </div>
        
        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "invite" ? (
            <InviteForm token={user?.token} />
          ) : (
            <UserList token={user?.token} />
          )}
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-4 text-center text-gray-600 w-full">
        <div className="container mx-auto px-4">
          <p className="text-sm">Need help? <a href="mailto:admin@obsidialumniyearbook.com" className="text-indigo-600 hover:underline">contact support</a>.</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} Admin Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
