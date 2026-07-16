import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-gray-900">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
