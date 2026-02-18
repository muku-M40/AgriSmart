
import React, { useState, useEffect } from 'react';
import { User, UserRole, ApplicationStatus } from './types';
import Auth from './components/Auth';
import Layout from './components/Layout';
import FarmerDashboard from './components/FarmerDashboard';
import AdminDashboard from './components/AdminDashboard';
import CropDoctor from './components/CropDoctor';
import VoiceAssistant from './components/VoiceAssistant';
import MarketRates from './components/MarketRates';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('agri_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('agri_user', JSON.stringify(userData));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agri_user');
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    if (user.role === UserRole.ADMIN) {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard />;
        case 'farmers': return <AdminDashboard activeSubTab="approval" />;
        case 'campaigns': return <div className="p-8 text-center text-slate-500">Campaigns Module Coming Soon</div>;
        default: return <AdminDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <FarmerDashboard />;
        case 'crop-doctor': return <CropDoctor />;
        case 'market-rates': return <MarketRates />;
        case 'advisor': return <VoiceAssistant />;
        default: return <FarmerDashboard />;
      }
    }
  };

  return (
    <Layout user={user} activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
