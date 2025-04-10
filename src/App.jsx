import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import { AppContext } from "./context/applicationContext";
import Loader from "./components/Loader.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const appContext = useContext(AppContext);
  const userData = appContext.getSession();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard user={currentUser} /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
