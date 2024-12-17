import { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import { AppContext } from "./context/applicationContext";
import Loader from "./components/Loader.jsx";

const App = () => {
  const appContext = useContext(AppContext);
  const useData = appContext.getSession();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (useData) {
      setCurrentUser(useData);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [useData]);

  if (isAuthenticated === null) {
    return <Loader />;
  } else if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} replace />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              user={currentUser}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
};

export default App;
