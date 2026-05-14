import React, { useState } from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-72 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
             <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-pokemon-red flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-pokemon-red"></div>
                </div>
                <h1 className="text-xl font-black text-gray-900">PokéDex</h1>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500">
               <X className="w-6 h-6" />
             </button>
          </div>
          <div className="flex-1 overflow-y-auto" onClick={() => setIsMobileMenuOpen(false)}>
            <Sidebar isMobile />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            Poké<span className="text-pokemon-red">Dex</span>
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </header>

        <main className="flex-1 overflow-y-auto relative w-full h-full bg-gray-50/50 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
