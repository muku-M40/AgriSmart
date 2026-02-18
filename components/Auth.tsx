
import React, { useState } from 'react';
import { User, UserRole, ApplicationStatus } from '../types';
import { ICONS } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmLocation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate auth logic
    if (isLogin) {
      // For demo, accept any valid looking login
      if (formData.email.includes('admin')) {
        onLogin({
          id: 'admin-1',
          name: 'Admin User',
          email: formData.email,
          role: UserRole.ADMIN,
          status: ApplicationStatus.APPROVED
        });
      } else {
        onLogin({
          id: 'farmer-1',
          name: formData.name || 'Farmer Name',
          email: formData.email,
          role: UserRole.FARMER,
          status: ApplicationStatus.APPROVED,
          farmLocation: 'Nashik, Maharashtra'
        });
      }
    } else {
      alert("Application submitted! Admin will review and approve your membership.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Left Banner */}
      <div className="hidden md:flex md:w-1/2 bg-green-600 p-12 items-center justify-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-xl">
              {ICONS.Logo}
            </div>
            <span className="text-3xl font-bold tracking-tight">AgriSmart</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">Empowering Farmers with Intelligence.</h2>
          <p className="text-green-50 text-lg">
            Join thousands of modern farmers using AgriSmart to optimize yields, track health, and get expert AI advice.
          </p>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join AgriSmart'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Login to your account' : 'Apply for farmer membership'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin && (
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setRole(UserRole.FARMER)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === UserRole.FARMER ? 'bg-white shadow-sm text-green-700' : 'text-slate-500'}`}
                >
                  Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === UserRole.ADMIN ? 'bg-white shadow-sm text-green-700' : 'text-slate-500'}`}
                >
                  Admin
                </button>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Farm Location</label>
                <input
                  type="text"
                  required
                  placeholder="Village, District, State"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({...formData, farmLocation: e.target.value})}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all transform active:scale-[0.98] mt-4"
            >
              {isLogin ? 'Login Now' : 'Submit Application'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-slate-500">
              {isLogin ? "Don't have an account?" : "Already applied?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 font-bold hover:underline"
            >
              {isLogin ? 'Apply for Membership' : 'Back to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
