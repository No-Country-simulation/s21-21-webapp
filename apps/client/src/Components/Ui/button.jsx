import React from 'react';

export const Button = ({ children, onClick, variant = 'default', size = 'md', className }) => {
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`rounded ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
