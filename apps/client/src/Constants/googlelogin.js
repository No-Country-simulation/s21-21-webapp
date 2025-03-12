import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3000";

export const googleLogin = () => {
  return useMutation(async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error logging in with Google");
    }

    return response.json();
  });
};