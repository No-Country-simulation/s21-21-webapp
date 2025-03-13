import useAuthStore from "../store/authStore";
import { fetchData } from "../utils/fetchData";

export const googleLogin = async (token) => {
  try {
    const response = await fetchData(
      "/auth/google-login",
      "POST",
      { token },
      null,
      true
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error logging in with Google");
    }

    useAuthStore.getState().login({
      user: data.user,
      access_token: data.access_token,
    });

    return data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};

