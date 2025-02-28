import React, { useState } from 'react'

export const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al registrar');

      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex">
      <div 
        className="hidden lg:flex w-1/2 min-h-screen bg-gray-300 bg-cover bg-center"
        style={{backgroundImage: "url('/register_img.webp')"}}
      >
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-3 rounded-lg">
          <div className="mb-12 flex justify-center">
            <img src="/Logo.png" alt="Cine" className="object-contain w-1/8 h-auto max-w-lg mr-5" />
            <img src="/Titulo.png" alt="Cine" className="object-contain w-2/5 h-auto max-w-lg" />
          </div>
          <h2 className="text-2xl font-bold text-justify-left mb-2">Registro</h2>
          <h3 className="text-sm text-justify-left mb-3">Ingrese sus datos para crear su cuenta.</h3>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-gray-400 text-xs mb-1">Ingresa tu nombre</label>
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"  
                placeholder="correo@ejemplo.com"
                value={formData.email} 
                onChange={handleChange} 
                required
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-gray-400 text-xs mb-2">Ingresa tu correo electrónico</label>
            </div>
            
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                value={formData.password} 
                onChange={handleChange}
                required
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-gray-400 text-xs mb-1">Ingresa una contraseña</label>
            </div>
                        
            <div className="mb-3">
              <label className="block text-gray-700 text-xs font-bold mb-1">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword" 
                placeholder="*******"
                value={formData.confirmPassword} 
                onChange={handleChange}
                required
                className="w-full max-w-80 p-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-gray-400 text-xs mb-1">Repite la contraseña</label>
            </div>
            <button type="submit" className="w-full max-w-80 bg-btn-primary text-white p-1 rounded-sm font-bold hover:bg-btn-hover transition">
              Crear Cuenta
            </button>
            <div className="w-full max-w-80 text-center ">
              <a href="/Login" className="text-blue-950 text-sm hover:underline">¿Ya tienes una cuenta? <span className='font-bold'>Ingresar</span></a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
