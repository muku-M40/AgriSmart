
import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Stethoscope, 
  TrendingUp, 
  Mic, 
  Settings, 
  Users, 
  FileText, 
  Bell, 
  CheckCircle, 
  XCircle,
  Clock,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';

export const COLORS = {
  primary: '#22c55e', // Green 500
  secondary: '#16a34a', // Green 600
  accent: '#fbbf24', // Amber 400
  danger: '#ef4444', // Red 500
  info: '#3b82f6', // Blue 500
};

export const ICONS = {
  Dashboard: <LayoutDashboard size={20} />,
  CropDoctor: <Stethoscope size={20} />,
  MarketRates: <TrendingUp size={20} />,
  AIAdvisor: <Mic size={20} />,
  AdminUsers: <Users size={20} />,
  AdminDocs: <FileText size={20} />,
  AdminNotifications: <Bell size={20} />,
  Approve: <CheckCircle size={16} />,
  Reject: <XCircle size={16} />,
  Pending: <Clock size={16} />,
  Logout: <LogOut size={20} />,
  Arrow: <ChevronRight size={16} />,
  Add: <Plus size={20} />,
  Logo: <Sprout size={32} className="text-green-600" />
};

export const MOCK_RATES = [
  { commodity: 'Wheat', price: '₹2,300/quintal', change: '+₹25', trend: 'up' },
  { commodity: 'Rice (Basmati)', price: '₹6,400/quintal', change: '-₹50', trend: 'down' },
  { commodity: 'Soya Bean', price: '₹4,850/quintal', change: '+₹100', trend: 'up' },
  { commodity: 'Cotton', price: '₹7,200/quintal', change: '+₹15', trend: 'up' },
  { commodity: 'Turmeric', price: '₹14,500/quintal', change: '-₹200', trend: 'down' },
];

export const MOCK_FARMERS = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@farm.com', status: 'APPROVED', farmLocation: 'Maharashtra', crops: ['Wheat', 'Soya'] },
  { id: '2', name: 'Amit Singh', email: 'amit@agri.com', status: 'PENDING', farmLocation: 'Punjab', crops: ['Rice'] },
  { id: '3', name: 'Sanjay Patil', email: 'sanjay@land.com', status: 'PENDING', farmLocation: 'Maharashtra', crops: ['Cotton', 'Turmeric'] },
];
