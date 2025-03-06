import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      {/* Contenedor principal de la tarjeta */}
      
      <div className="flex items-center justify-between">
        {/* Información de la estadística */}
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        
        {/* Icono con fondo de color coincidente */}
        <div className={`${color.replace('border-', 'bg-').replace('-600', '-100')} ${color.replace('border-', 'text-')} p-3 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
