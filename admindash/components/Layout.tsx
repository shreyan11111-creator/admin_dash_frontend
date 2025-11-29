import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { IconUsers, IconChart, IconSun, IconMoon, IconMenu, IconX } from './ui/Icons';
import { Button } from './ui/Shared';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg transition-colors mb-1 ${
          isActive
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 font-medium'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
        }`
      }
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </NavLink>
  );
};

export const Layout = () => {
  const { state, dispatch } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-slate-700">
          <div className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            AdminDash
          </div>
          <button 
            className="ml-auto lg:hidden text-gray-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <IconX />
          </button>
        </div>

        <nav className="p-4">
          <SidebarItem to="/analytics" icon={IconChart} label="Analytics" />
          <SidebarItem to="/users" icon={IconUsers} label="Users" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className="lg:hidden text-gray-500 p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <IconMenu />
          </button>

          <h1 className="text-lg font-medium text-gray-900 dark:text-white capitalize lg:ml-0 ml-2">
            {location.pathname.split('/')[1] || 'Dashboard'}
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {state.isDarkMode ? <IconSun /> : <IconMoon />}
            </button>
            
            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};