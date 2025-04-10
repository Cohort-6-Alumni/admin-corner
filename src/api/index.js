import { frametoken } from "../utils/apiUtil";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
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
    const token = response.headers.get("Authorization");

    return { data, token };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: error.message };
  }
};

export const sendInvite = async (emailId, token) => {
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

    return { success: true, message: "Invitation sent successfully" };
  } catch (error) {
    console.error("Error during sending invite:", error);
    return { error: error.message };
  }
};

export const getInvitedUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/invited`, {
      method: "GET",
      headers: {
        Authorization: frametoken(token),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch invited users");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching invited users:", error);
    return { error: error.message };
  }
};

export const checkInviteStatus = async (email, token) => {
  try {
    const response = await fetch(`${API_URL}/user/check-invite?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        Authorization: frametoken(token),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to check invitation status");
    }

    const data = await response.json();
    return { isInvited: data.isInvited };
  } catch (error) {
    console.error("Error checking invite status:", error);
    return { error: error.message };
  }
};

export const sendBatchInvites = async (emails, token) => {
  try {
    const response = await fetch(`${API_URL}/user/batch-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: frametoken(token),
      },
      body: JSON.stringify({ emails }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Batch invite failed");
    }

    return { success: true, message: "Batch invitations sent successfully" };
  } catch (error) {
    console.error("Error during batch invites:", error);
    return { error: error.message };
  }
};