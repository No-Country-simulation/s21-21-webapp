import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (!token) {
      console.error("No token found in URL");
      setError("Authentication failed: No token received");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const handleOAuthCallback = async () => {
      try {
        localStorage.setItem("token", token);

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));

        if (payload.email) {
          const user = {
            email: payload.email,
            id: payload.sub,
          };
          localStorage.setItem("user", JSON.stringify(user));
        }

        navigate("/");
      } catch (err) {
        console.error("Error processing OAuth callback:", err);
        setError("Authentication failed: " + (err.message || "Unknown error"));
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="auth-callback-container">
        <div className="spinner"></div>
        <p>Completing authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-callback-error">
        <p>Error: {error}</p>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return null;
}

export default GoogleAuthCallback;
