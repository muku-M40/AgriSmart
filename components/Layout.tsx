
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ICONS } from '../constants';
import { Bell } from 'lucide-react';

interface LayoutProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, activeTab, onTabChange, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const farmerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'crop-doctor', label: 'Crop Doctor', icon: ICONS.CropDoctor },
    { id: 'market-rates', label: 'Market Rates', icon: ICONS.MarketRates },
    { id: 'advisor', label: 'AI Advisor', icon: ICONS.AIAdvisor },
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Overview', icon: ICONS.Dashboard },
    { id: 'farmers', label: 'Farmer Management', icon: ICONS.AdminUsers },
    { id: 'campaigns', label: 'Campaigns', icon: ICONS.AdminDocs },
    { id: 'notifications', label: 'Notifications', icon: ICONS.AdminNotifications },
  ];

  const currentNav = user.role === UserRole.ADMIN ? adminNav : farmerNav;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-30 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            {ICONS.Logo}
            <span className="text-xl font-bold text-slate-800">AgriSmart</span>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {currentNav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 p-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">{user.role.toLowerCase()}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              {ICONS.Logout}
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-10">
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600">
              <Bell size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;