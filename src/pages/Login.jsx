import { useState, useContext } from "react";
import { login } from "../api";
import { AppContext } from "../context/applicationContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setSession } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      setError("");
      const response = await login(username, password);
        if (response.error) {
            setError(response.error);
        } else {
            setSession(response);
            navigate("/dashboard");
        }

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleEmailChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
