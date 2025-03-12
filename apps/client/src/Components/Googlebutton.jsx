import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../Constants/googlelogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GoogleButton = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const handleGoogleSuccess = async (response) => {
    try {
      setLoginError(null);

      if (!response.credential) {
        throw new Error("No credential received from Google");
      }

      console.log("Received Google credential, attempting login...");
      const data = await googleLogin(response.credential);
      console.log("Login successful:", data);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

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
    <div className="google-login-container">
      <GoogleOAuthProvider
        clientId={
          "566063083458-51k9fvuupd3kju0klptht1p5ocuppqu7.apps.googleusercontent.com"
        }
      >
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
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleButton;
