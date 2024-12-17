import { frametoken } from "../utils/apiUtil";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
    console.log(API_URL);   
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    const token =  response.headers.get("Authorization");

    return {data, token};
  } catch (error) {
    console.error("Error during login:", error);
    return { error: error.message };
  }
};

export const sendInvite = async (emailId, token) => {
        console.log(token)

  try {
    const response = await fetch(`${API_URL}/user/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: frametoken(token),
      },
      body: JSON.stringify({ emailId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Invite failed");
    }
  } catch (error) {
    console.error("Error during sending invite:", error);
    return { error: error.message };
  }
};