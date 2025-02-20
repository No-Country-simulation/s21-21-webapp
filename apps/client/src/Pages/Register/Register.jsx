import React from 'react'

export const Register = () => {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex w-1/2 min-h-185 bg-gray-300">
        <img src="/Logo-Titulo.png" alt="Cine-Astas" className="object-contain"/>
      </div>
      
      <div className="mt-50 w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-106 bg-white p-3 rounded-lg">
          <div className="lg:hidden mb-6 flex justify-center">
            <img src="/Logo-Titulo.png" alt="Cine" className="object-contain w-3/4 h-auto max-w-lg" />
          </div>
          <h2 className="text-3xl font-bold text-justify-left mb-6">Registro</h2>
          <h3 className="text-base text-justify-left mb-6">Ingrese sus datos para crear su cuenta.</h3>
          <form>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
              <input
                type="email"
                className="w-full max-w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                required
              />
              <label className="block text-gray-400 text-sm mb-2">Ingresa tu nombre</label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
              <input
                type="email"
                className="w-full max-w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo@ejemplo.com"
                required
              />
              <label className="block text-gray-400 text-sm mb-2">Ingresa tu correo electrónico</label>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
              <input
                type="password"
                className="w-full max-w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="*******"
                required
              />
              <label className="block text-gray-400 text-sm mb-2">Ingresa una contraseña</label>
            </div>
                        
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar contraseña</label>
              <input
                type="password"
                className="w-full max-w-80 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="*******"
                required
              />
              <label className="block text-gray-400 text-sm mb-2">Repetir la constraseña</label>
            </div>
            <button className="w-full max-w-80 bg-blue-950 text-white p-2 rounded-lg font-bold hover:bg-blue-600 transition">
              Crear Cuenta
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
