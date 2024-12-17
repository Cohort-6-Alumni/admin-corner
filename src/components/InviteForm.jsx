import { useState } from "react";
import { sendInvite } from "../api";
import PropTypes from "prop-types";

const InviteForm = ({token}) => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email address is invalid");
    } else {
      setError("");
      // Handle form submission
      const response = await sendInvite(email, token);
      if (response.error) {
        setError(response.error);
      } else {
        // Handle success
        setEmail("");
    }
  };
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">Invite a new user</h2>
      </section>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Enter invite email"
          />
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Invite
        </button>
      </form>
    </>
  );
};

InviteForm.propTypes = {
  token: PropTypes.string.isRequired,
};

export default InviteForm;
