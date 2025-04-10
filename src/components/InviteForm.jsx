import { useState, useEffect } from "react";
import { sendInvite, checkInviteStatus, sendBatchInvites } from "../api";
import PropTypes from "prop-types";
import { debounce } from "../utils/apiUtil";
import { motion } from "framer-motion";
import { FiSend, FiUpload, FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InviteForm = ({ token }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // const [batchEmails, setBatchEmails] = useState([]);
  // const [showBatchUpload, setShowBatchUpload] = useState(false);
  // const [batchInput, setBatchInput] = useState("");

  // Debounced function to check if email is already invited
  const checkEmailStatus = debounce(async (emailToCheck) => {
    if (!emailToCheck || !/\S+@\S+\.\S+/.test(emailToCheck)) return;
    
    setIsChecking(true);
    const result = await checkInviteStatus(emailToCheck, token);
    setIsChecking(false);
    
    if (result.isInvited) {
      setIsInvited(true);
      setError("This email has already been invited");
    } else {
      setIsInvited(false);
    }
  }, 500);

  // Effect to check email status when email changes
  useEffect(() => {
    if (email) {
      checkEmailStatus(email);
    } else {
      setIsInvited(false);
      setError("");
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    } 
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid");
      return;
    }
    
    if (isInvited) {
      toast.warning("This email has already been invited");
      return;
    }

    setIsSending(true);
    const response = await sendInvite(email, token);
    setIsSending(false);
    
    if (response.error) {
      setError(response.error);
      toast.error(response.error);
    } else {
      toast.success("Invitation sent successfully!");
      setEmail("");
      setError("");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  // const handleBatchSubmit = async () => {
  //   if (batchEmails.length === 0) {
  //     toast.error("Please add at least one email address");
  //     return;
  //   }

  //   setIsSending(true);
  //   const response = await sendBatchInvites(batchEmails, token);
  //   setIsSending(false);

  //   if (response.error) {
  //     toast.error(response.error);
  //   } else {
  //     toast.success(`Successfully sent ${batchEmails.length} invitations!`);
  //     setBatchEmails([]);
  //     setBatchInput("");
  //     setShowBatchUpload(false);
  //   }
  // };

  // const addBatchEmail = (e) => {
  //   e.preventDefault();
    
  //   // Split by commas, newlines, or spaces - fixed the regex to avoid duplicate character warnings
  //   const emails = batchInput
  //     .split(/[,\n\s]/)
  //     .map(email => email.trim())
  //     .filter(email => email && /\S+@\S+\.\S+/.test(email));
    
  //   if (emails.length === 0) {
  //     toast.error("No valid email addresses found");
  //     return;
  //   }
    
  //   setBatchEmails(prev => [...new Set([...prev, ...emails])]);
  //   setBatchInput("");
  // };

  // const removeBatchEmail = (emailToRemove) => {
  //   setBatchEmails(batchEmails.filter(email => email !== emailToRemove));
  // };

  // Fixed the ternary operation by extracting it into a function
  const getInputBorderClass = () => {
    if (error) return "border-red-400";
    if (isInvited) return "border-amber-400";
    return "border-gray-300";
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto px-4 py-8"
      >
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-2 text-indigo-700">Invite Management</h2>
          <p className="text-gray-600">Send invitations to join your application</p>
        </section>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Single invite form */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg flex-1 border border-gray-100" 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FiSend className="mr-2 text-indigo-600" /> 
              Single Invite
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${getInputBorderClass()} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                    placeholder="Enter email address"
                  />
                  {isChecking && (
                    <span className="absolute right-3 top-2.5">
                      <div className="h-5 w-5 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                    </span>
                  )}
                  {isInvited && !isChecking && (
                    <span className="absolute right-3 top-2.5 text-amber-500">
                      <FiAlertCircle size={20} />
                    </span>
                  )}
                  {!isInvited && email && !isChecking && !/\S+@\S+\.\S+/.test(email) && (
                    <span className="absolute right-3 top-2.5 text-red-500">
                      <FiAlertCircle size={20} />
                    </span>
                  )}
                  {!isInvited && email && !isChecking && /\S+@\S+\.\S+/.test(email) && (
                    <span className="absolute right-3 top-2.5 text-green-500">
                      <FiCheckCircle size={20} />
                    </span>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              
              <motion.button
                type="submit"
                disabled={isSending || isInvited}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                  isSending || isInvited ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                } transition-colors flex justify-center items-center`}
                whileTap={{ scale: 0.98 }}
              >
                {isSending ? (
                  <>
                    <div className="h-5 w-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>Send Invite</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Batch invites */}
          {/* <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg flex-1 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FiUpload className="mr-2 text-indigo-600" /> 
              Batch Invites
            </h3>
            
            {!showBatchUpload ? (
              <div className="flex justify-center items-center h-44">
                <motion.button
                  onClick={() => setShowBatchUpload(true)}
                  className="px-5 py-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiUpload className="inline mr-2" /> Upload Multiple Emails
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <form onSubmit={addBatchEmail} className="flex gap-2">
                    <input
                      placeholder="Enter emails separated by commas or new lines"
                      value={batchInput}
                      onChange={(e) => setBatchInput(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      whileTap={{ scale: 0.98 }}
                    >
                      Add
                    </motion.button>
                  </form>
                </div>
                
                <div className="max-h-40 overflow-auto">
                  {batchEmails.length > 0 ? (
                    <div className="space-y-2">
                      {batchEmails.map((email) => (
                        <div key={email} className="flex justify-between items-center p-2 bg-indigo-50 rounded-md">
                          <span className="text-sm">{email}</span>
                          <button 
                            onClick={() => removeBatchEmail(email)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center p-4">
                      No emails added yet
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      setShowBatchUpload(false);
                      setBatchEmails([]);
                      setBatchInput("");
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  
                  <motion.button
                    onClick={handleBatchSubmit}
                    className={`px-4 py-2 rounded-lg text-white ${
                      isSending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                    } flex items-center`}
                    disabled={isSending || batchEmails.length === 0}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSending ? (
                      <>
                        <div className="h-4 w-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>Send {batchEmails.length} Invites</>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div> */}
        </div>
      </motion.div>
    </>
  );
};

InviteForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default InviteForm;
