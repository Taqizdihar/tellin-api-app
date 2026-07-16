import { Menu, Terminal, LogOut, User } from 'lucide-react';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onMenuClick }) {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 sticky top-0 z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-md">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">
              Tellin API Testing Application
            </span>
            <span className="font-bold text-gray-900 sm:hidden">
              Tellin API
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="primary">Version 1.0.0</Badge>

          {isAuthenticated && user && (
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 rounded-full p-1.5">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 leading-tight">
                    {user.role || user.roles?.[0]?.name || 'Developer'}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-2 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
