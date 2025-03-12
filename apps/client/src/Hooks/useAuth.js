import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../store/authStore";
import { fetchData } from "../utils/fetchData";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetchData("/auth/register", "POST", {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });
      console.log("useRegister response:", response);
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || `Error al registrar usuario: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/Login");
    },
    onError: (error) => {
      console.error("Error registrando usuario:", error);
      toast.error(`${error.message}`);
    },
  });

  return registerMutation;
};

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetchData("/auth/login", "POST", {
        email: userData.email,
        password: userData.password,
      });
      if (!response.ok) {
        throw new Error(`Error al iniciar sesión: ${response.status}`);
      }

      const data = await response.json();

      if (data.access_token && data.user) {
        return {
          user: data.user,
          accessToken: data.access_token,
        };
      } else {
        throw new Error("No se recibió un token válido del servidor");
      }
    },
    onSuccess: (data) => {
      // Almacenar el userId y el token en el localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.user.id); // Asegúrate de que data.user.id sea el userId

      // Actualizar el estado de autenticación
      login({ user: data.user, access_token: data.accessToken });

      // Mostrar mensaje de éxito y redirigir
      toast.success("Inicio de sesión exitoso.");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error iniciando sesión:", error);
      toast.error(`Error al iniciar sesión: ${error.message}`);
    },
  });

  return loginMutation;
};