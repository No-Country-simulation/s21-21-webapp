import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { googleLogin } from "../Constants/googlelogin";
import { GoogleLogin } from "@react-oauth/google";

const GoogleButton = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleGoogleSuccess = async (response) => {
    try {
      setLoginError(null);

      // Only proceed if we have a credential
      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      console.log("Received Google credential, attempting login...");
      const data = await googleLogin(response.credential);
      console.log("Login successful:", data);

      // Store auth data in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google login:", error);
      setLoginError(error.message || "Failed to login with Google");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
    setLoginError("Google authentication failed");
  };

  return (
    <div className="google-login-container py-2">
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
