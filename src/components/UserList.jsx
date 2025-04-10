import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getInvitedUsers } from "../api";
import { formatDate } from "../utils/apiUtil";
import { motion } from "framer-motion";
import { FiMail, FiCalendar, FiSearch, FiRefreshCw } from "react-icons/fi";

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await getInvitedUsers(token);
      if (result.error) {
        setError(result.error);
      } else {
        setUsers(result.data || []);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    user => user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700">Invited Users</h2>
          <p className="text-gray-600 text-sm mt-1">
            {users.length} {users.length === 1 ? 'user' : 'users'} have been invited
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={refreshUsers}
            disabled={loading || refreshing}
            className={`ml-2 p-2 rounded-lg ${refreshing ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'} border border-gray-300`}
          >
            <FiRefreshCw className={`${refreshing ? 'animate-spin text-indigo-500' : 'text-gray-600'}`} />
          </motion.button>
        </div>
      </div>

      {(() => {
        // Handle loading state
        if (loading && !refreshing) {
          return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading invited users...</p>
            </div>
          );
        }
        
        // Handle error state
        if (error) {
          return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border-l-4 border-red-500">
              <p className="text-red-500 font-medium">{error}</p>
              <button 
                onClick={refreshUsers}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          );
        }
        
        // Handle empty users list
        if (filteredUsers.length === 0) {
          const emptyMessage = searchTerm
            ? <p className="text-gray-600">No users match your search criteria</p>
            : <p className="text-gray-600">No users have been invited yet</p>;
            
          return (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              {emptyMessage}
            </div>
          );
        }
        
        // Show users table
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invited On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <motion.tr 
                      key={user.id || user.email || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                            <FiMail className="text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.email}</div>
                            {user.name && <div className="text-sm text-gray-500">{user.name}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'registered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.status === 'registered' ? 'Registered' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" />
                          {user.invitedOn ? formatDate(user.invitedOn) : 'N/A'}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
};

UserList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default UserList;