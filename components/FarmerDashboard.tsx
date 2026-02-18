
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ICONS } from '../constants';

const FarmerDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<any[]>([]);
  const [currentStats, setCurrentStats] = useState({
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    ph: 6.8,
    moisture: 72,
    temperature: 28,
  });

  useEffect(() => {
    // Generate mock historical data
    const data = Array.from({ length: 10 }).map((_, i) => ({
      time: `${i}:00`,
      moisture: 60 + Math.random() * 20,
      temp: 22 + Math.random() * 10,
    }));
    setHealthData(data);

    // Simulate real-time sensor updates
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        moisture: Math.max(30, Math.min(90, prev.moisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(15, Math.min(45, prev.temperature + (Math.random() - 0.5) * 2)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ label, value, unit, color, icon }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-2xl font-bold text-slate-800">{value.toFixed(1)}</h3>
            <span className="text-xs font-semibold text-slate-400">{unit}</span>
          </div>
        </div>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000`} 
          style={{ width: `${(value / 100) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Real-time Sensors */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Live Field Sensors
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          </h2>
          <button className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
            Sync IoT Devices {ICONS.Arrow}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="Soil Moisture" value={currentStats.moisture} unit="%" color="bg-blue-500" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>} />
          <StatCard label="Temperature" value={currentStats.temperature} unit="°C" color="bg-orange-500" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
          <StatCard label="Soil pH" value={currentStats.ph} unit="pH" color="bg-purple-500" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>} />
        </div>
      </section>

      {/* NPK Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Nutrient Analysis (NPK)</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600">Nitrogen (N)</span>
                <span className="text-sm font-bold text-green-600">{currentStats.nitrogen} mg/kg</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[45%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600">Phosphorus (P)</span>
                <span className="text-sm font-bold text-blue-600">{currentStats.phosphorus} mg/kg</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[32%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600">Potassium (K)</span>
                <span className="text-sm font-bold text-orange-600">{currentStats.potassium} mg/kg</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[58%]"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>AI Tip:</strong> Phosphorus levels are slightly below optimal for the flowering stage. Consider adding organic manure to boost root growth.
            </p>
          </div>
        </div>

        {/* Moisture Trend Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Field Health History</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMoisture)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest font-bold">Soil Moisture Trend (Last 10 Hours)</p>
        </div>
      </section>
    </div>
  );
};

export default FarmerDashboard;
