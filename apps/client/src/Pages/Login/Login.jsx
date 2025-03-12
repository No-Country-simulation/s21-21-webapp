import { useIsMutating } from "@tanstack/react-query";
import Button from "../../Components/Button";
import GoogleButton from "../../Components/Googlebutton";
import { useLogin } from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().min(1, "Este campo es requerido"),
  password: z.string().min(1, "Este campo es requerido"),
});

export const Login = () => {
  const { mutate: login } = useLogin();
  const isMutating = useIsMutating();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const onLoginSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex">
      <div
        className="hidden lg:flex w-1/2 min-h-screen bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: "url('/login_img.webp')" }}
      ></div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-3 rounded-lg">
          <Link to="/">
            <div className="mb-12 flex justify-center">
              <img
                src="/Logo.png"
                alt="Cine"
                className="object-contain w-1/8 h-auto max-w-lg mr-5"
              />
              <img
                src="/Titulo.png"
                alt="Cine"
                className="object-contain w-2/5 h-auto max-w-lg"
              />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-justify-left mb-3">
            Iniciar sesión
          </h2>
          <h3 className="text-sm text-justify-left mb-5">
            Ingrese sus credenciales para iniciar sesión en su cuenta.
          </h3>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Correo Electrónico
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full max-w-80 p-1 pl-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="correo@ejemplo.com"
                  {...loginForm.register("email")}
                  autoComplete="email"
                />
              </label>
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
              <label
                htmlFor="email"
                className="block text-gray-400 text-xs mb-2"
              >
                Ingresa tu correo electrónico
              </label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Contraseña
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full max-w-80 p-1 pl-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="*******"
                  {...loginForm.register("password")}
                  autoComplete="new-password"
                />
              </label>
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
              <label
                htmlFor="password"
                className="block text-gray-400 text-xs mb-2"
              >
                Ingresa tu contraseña
              </label>
            </div>

            <Button
              className="w-full max-w-80 bg-btn-primary text-white p-1 rounded-sm font-bold hover:bg-btn-hover transition"
              disabled={isMutating > 0 || isGoogleLoading}
            >
              {isMutating > 0 || isGoogleLoading ? "Ingresando..." : "Ingresar"}
            </Button>

            <div className="w-full max-w-80 flex items-center justify-center">
              <GoogleButton setIsLoading={setIsGoogleLoading} />
            </div>

            <div className="w-full max-w-80 mb-1 mt-2 text-center">
              <a href="#" className="text-blue-950 text-sm hover:underline">
                ¿Olvidó tu contraseña?
              </a>
            </div>

            <div className="w-full max-w-80 text-center">
              <a
                href="/Register"
                className="text-blue-950 text-sm hover:underline"
              >
                ¿No tienes una cuenta?{" "}
                <span className="font-bold">Registrate</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
