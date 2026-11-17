
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getWelcomeMessage = async () => {
  try {
    const response = await fetch(`${API_URL}/`);

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// Signup API
export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

// Login API
export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};
