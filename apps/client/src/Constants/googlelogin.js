import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const googleLogin = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/google-login`,
      { token },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Google login error:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error logging in with Google";

    throw new Error(errorMessage);
  }
};
