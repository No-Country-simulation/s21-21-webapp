import GoogleButton from "../../Components/GoogleButton";

export const Login = () => {
  return (
    <div className="flex">
      <div
        className="hidden lg:flex w-1/2 min-h-screen bg-gray-300 bg-cover bg-center"
        style={{ backgroundImage: "url('/login_img.webp')" }}
      ></div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-3 rounded-lg">
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
          <h2 className="text-2xl font-bold text-justify-left mb-3">
            Iniciar sesión
          </h2>
          <h3 className="text-sm text-justify-left mb-5">
            Ingrese sus credenciales para iniciar sesión en su cuenta.
          </h3>
          <form>
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
                required
              />
              <label className="block text-gray-400 text-xs mb-1">
                Ingresa tu correo electrónico
              </label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="*******"
                required
              />
              <label className="block text-gray-400 text-xs mb-1">
                Ingresa una contraseña
              </label>
            </div>

            <button className="w-full max-w-80 bg-btn-primary text-white p-1 rounded-sm font-bold hover:bg-btn-hover transition">
              Ingresar
            </button>
            <div className="w-full max-w-80 flex items-center justify-center">
              <GoogleButton />
            </div>
            <div className="w-full max-w-80 mb-1 mt-2 text-center ">
              <a href="#" className="text-blue-950 text-sm hover:underline">
                ¿Olvidó tu contraseña?
              </a>
            </div>

            <div className="w-full max-w-80 text-center ">
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
