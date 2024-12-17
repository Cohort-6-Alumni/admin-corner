
import { Routes, Route } from 'react-router';
import './App.css'
import Dashboard from "./pages/Dashboard.jsx";
import NotFound from './pages/NotFound.jsx';
import Login from './pages/Login.jsx';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound/>} />

    </Routes>
  )
}

export default App
