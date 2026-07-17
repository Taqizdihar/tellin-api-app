import { NavLink } from 'react-router-dom';
import { Home, Key, Globe, Search, Wrench, ShieldCheck, Settings, X } from 'lucide-react';

const menuItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/auth', label: 'Authentication', icon: Key },
  { path: '/explorer', label: 'API Explorer', icon: Globe },
  { path: '/inspector', label: 'Response Inspector', icon: Search },
  { path: '/toolkit', label: 'Developer Toolkit', icon: Wrench },
  { path: '/settings', label: 'Role Verification', icon: ShieldCheck },
  { path: '/app-settings', label: 'Application Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:block flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
          <span className="font-bold text-gray-900">Menu</span>
          <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:bg-gray-100" aria-label="Close sidebar">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                `}
                onClick={() => onClose()}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
