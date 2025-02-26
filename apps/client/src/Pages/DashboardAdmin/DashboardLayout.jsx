import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutGrid, Film, Image, Settings, LogOut, User } from 'lucide-react';

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-black font-semibold' : 'text-gray-700';
  };

  return React.createElement(
    'div',
    { className: 'flex min-h-screen' },
    // Sidebar
    React.createElement(
      'aside',
      { className: 'w-64 bg-gray-200 p-6 flex flex-col' },
      React.createElement(
        'div',
        { className: 'mb-12' },
        React.createElement(
          'h1',
          { className: 'text-2xl font-bold' },
          'Logotipo'
        )
      ),
      React.createElement(
        'nav',
        { className: 'flex-1' },
        React.createElement(
          'ul',
          { className: 'space-y-4' },
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              {
                to: '/admin',
                className: `flex items-center space-x-3 hover:text-black ${isActive('/admin')}`,
              },
              React.createElement(LayoutGrid, { size: 20 }),
              React.createElement('span', null, 'Dashboard')
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              {
                to: '/admin/movies',
                className: `flex items-center space-x-3 hover:text-black ${isActive('/admin/movies')}`,
              },
              React.createElement(Film, { size: 20 }),
              React.createElement('span', null, 'Películas')
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              {
                to: '/admin/banners',
                className: `flex items-center space-x-3 hover:text-black ${isActive('/admin/banners')}`,
              },
              React.createElement(Image, { size: 20 }),
              React.createElement('span', null, 'Banners')
            )
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              Link,
              {
                to: '/admin/settings',
                className: `flex items-center space-x-3 hover:text-black ${isActive('/admin/settings')}`,
              },
              React.createElement(Settings, { size: 20 }),
              React.createElement('span', null, 'Configuración')
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'mt-auto' },
        React.createElement(
          'button',
          {
            className: 'flex items-center space-x-3 text-gray-700 hover:text-black',
          },
          React.createElement(LogOut, { size: 20 }),
          React.createElement('span', null, 'Cerrar Sesión')
        )
      )
    ),
    // Main Content
    React.createElement(
      'main',
      { className: 'flex-1 bg-white' },
      React.createElement(
        'header',
        {
          className: 'h-16 bg-[#F5F5F5] border-b flex items-center justify-end px-6',
        },
        React.createElement(
          'div',
          { className: 'flex items-center space-x-2' },
          React.createElement('span', null, 'Admin'),
          React.createElement(
            'div',
            {
              className: 'w-8 h-8 bg-[#D9D9D9] rounded-full flex items-center justify-center',
            },
            React.createElement(User, { size: 20 })
          )
        )
      ),
      React.createElement(Outlet)
    )
  );
};

export default DashboardLayout;
