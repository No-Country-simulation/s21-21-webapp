/* eslint-disable react/prop-types */
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../Constants/googlelogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoogleButton = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleGoogleSuccess = async (response) => {
    try {
      setLoginError(null);
      setIsLoading(true);

      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      const data = await googleLogin(response.credential);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error);
      setLoginError(error.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    if (error.error !== "popup_closed_by_user") {
      setLoginError("Google authentication failed");
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="p-5">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        useOneTap
        theme="outline"
        text="continue_with"
        size="large"
        width="100%"
        locale="es_AR"
      />

      {loginError && (
        <div className="error-message mt-2 text-red-500">{loginError}</div>
      )}
    </div>
  );
};

export default GoogleButton;
