import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { fetchData } from "../utils/fetchData"; 
import { toast } from "sonner";

const GoogleButton = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const googleLoginMutation = useMutation({
    mutationFn: async (credential) => {
      const response = await fetchData("/auth/google-login", "POST", {
        credential,
      }); 
      if (!response.ok) {
        throw new Error("Error logging in with Google");
      }
      return response.json();
    },
    onSuccess: (data) => {
      login({ user: data.user, accessToken: data.access_token });
      toast.success("Inicio de sesión exitoso.");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error logging in with Google:", error);
      toast.error("Error al logearse con Google");
    },
  });

  const handleGoogleSuccess = (response) => {
    if (response.credential) {
      googleLoginMutation.mutate(response.credential);
    } else {
      console.error("No credential received from Google");
      toast.error("Error logging in with Google");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
    toast.error("Error al logearse con Google");
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
    </div>
  );
};

export default GoogleButton;
