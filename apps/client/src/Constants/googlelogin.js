// Note: Check if your API is actually at /api/auth or just /auth
const API_BASE_URL = "http://localhost:3000";

export const googleLogin = async (token) => {
  try {
    // The correct endpoint path - check if your NestJS routes include the /api prefix
    // If your controller is mounted at /auth, the endpoint would be /auth/google-login
    const response = await fetch(
      `${API_BASE_URL}/auth/google-login`, // Removed the '/api' prefix
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          withCredentials: "true",
        },
        body: JSON.stringify({ token }),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Google login error:", error);

    // Extract the error message from the response if available
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error logging in with Google";

    throw new Error(errorMessage);
  }
};
