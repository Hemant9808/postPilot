import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function Header() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`border-b ${isDarkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex gap-8">
          <Link
            to="/dashboard"
            className={`font-medium ${
              isActive('/dashboard')
                ? isDarkMode ? 'text-white' : 'text-black'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Publish
          </Link>
          <Link
            to="/create"
            className={`font-medium ${
              isActive('/create')
                ? isDarkMode ? 'text-white' : 'text-black'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Create
          </Link>
        </nav>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}