
import React, { useState } from 'react';
import { MOCK_FARMERS, ICONS } from '../constants';
import { ApplicationStatus } from '../types';

interface AdminDashboardProps {
  activeSubTab?: 'overview' | 'approval';
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeSubTab = 'overview' }) => {
  const [farmers, setFarmers] = useState(MOCK_FARMERS);

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setFarmers(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
  };

  const pendingFarmers = farmers.filter(f => f.status === 'PENDING');
  const approvedFarmers = farmers.filter(f => f.status === 'APPROVED');

  const StatsHeader = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Active Farmers</p>
        <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{approvedFarmers.length}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Pending Requests</p>
        <h3 className="text-3xl font-extrabold text-orange-600 mt-1">{pendingFarmers.length}</h3>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Total Yield Tracking</p>
        <h3 className="text-3xl font-extrabold text-green-600 mt-1">12.5k <span className="text-sm font-normal text-slate-400">Tons</span></h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <StatsHeader />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">
            {activeSubTab === 'approval' ? 'Membership Requests' : 'Recent Enrolled Farmers'}
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">Export Data</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Farmer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {farmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                        {farmer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{farmer.name}</p>
                        <p className="text-xs text-slate-400">{farmer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{farmer.farmLocation}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                      ${farmer.status === 'APPROVED' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}
                    `}>
                      {farmer.status === 'APPROVED' ? ICONS.Approve : ICONS.Pending}
                      {farmer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {farmer.status === 'PENDING' ? (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleStatusChange(farmer.id, ApplicationStatus.APPROVED)}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(farmer.id, ApplicationStatus.REJECTED)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
