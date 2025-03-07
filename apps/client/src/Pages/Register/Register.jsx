import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Components/Button";
import { useRegister } from "../../Hooks/useAuth";
import { useIsMutating } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(60, "El nombre de usuario debe tener como máximo 60 caracteres"),
    email: z.string().email("Correo electrónico inválido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const Register = () => {
  const { mutate: register } = useRegister();
  const isMutating = useIsMutating();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = (data) => {
    register(data);
  };

  return (
    <div className="flex">
      <div
        className="hidden lg:flex w-1/2 min-h-screen bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: "url('/register_img.webp')" }}
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
          <h2 className="text-2xl font-bold text-justify-left mb-2">
            Registro
          </h2>
          <h3 className="text-sm text-justify-left mb-3">
            Ingrese sus datos para crear su cuenta.
          </h3>
          <form onSubmit={form.handleSubmit(onRegisterSubmit)}>
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Nombre
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full max-w-80 p-1 pl-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="John Doe"
                  {...form.register("name")}
                  autoComplete="name"
                />
              </label>
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
              <label
                htmlFor="name"
                className="block text-gray-400 text-xs mb-1"
              >
                Ingresa tu nombre
              </label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Correo Electrónico
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full max-w-80 p-1 pl-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="correo@ejemplo.com"
                  {...form.register("email")}
                  autoComplete="email"
                />
              </label>
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.email.message}
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
                  {...form.register("password")}
                  autoComplete="new-password"
                />
              </label>
              {form.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.password.message}
                </p>
              )}
              <label
                htmlFor="password"
                className="block text-gray-400 text-xs mb-1"
              >
                Ingresa una contraseña
              </label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Confirmar contraseña
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full max-w-80 p-1 pl-2 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="*******"
                  {...form.register("confirmPassword")}
                  autoComplete="new-password"
                />
              </label>
              {form.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
              <label
                htmlFor="confirmPassword"
                className="block text-gray-400 text-xs mb-1"
              >
                Repite la contraseña
              </label>
            </div>
            <Button
              className="w-full max-w-80 bg-btn-primary text-white p-1 rounded-sm font-bold hover:bg-btn-hover transition"
              disabled={isMutating > 0}
            >
              {isMutating > 0 ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
            <div className="w-full max-w-80 text-center ">
              <a
                href="/Login"
                className="text-blue-950 text-sm hover:underline"
              >
                ¿Ya tienes una cuenta?{" "}
                <span className="font-bold">Ingresar</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
