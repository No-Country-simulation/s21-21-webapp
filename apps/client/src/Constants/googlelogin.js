// Note: Check if your API is actually at /api/auth or just /auth
const API_BASE_URL = "http://localhost:3000";

export const googleLogin = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        withCredentials: "true",
      },
      body: JSON.stringify({ token }),
    });

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
