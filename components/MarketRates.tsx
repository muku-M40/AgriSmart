
import React from 'react';
import { MOCK_RATES, ICONS } from '../constants';

const MarketRates: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live Market Rates</h2>
          <p className="text-slate-500">APMC daily commodity pricing (as of today)</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <span className="text-sm font-semibold text-slate-600">Region:</span>
          <select className="text-sm font-bold text-green-600 bg-transparent border-none focus:ring-0 cursor-pointer">
            <option>Maharashtra (All APMCs)</option>
            <option>Punjab (Ludhiana)</option>
            <option>Gujarat (Surat)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_RATES.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                {ICONS.MarketRates}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{item.commodity}</h4>
                <p className="text-xs text-slate-400 font-medium">Updated 2 hours ago</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-extrabold text-slate-900">{item.price}</p>
              <div className={`flex items-center justify-end gap-1 text-xs font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                {item.trend === 'up' ? '▲' : '▼'} {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-slate-800 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2">Price Alert Service</h3>
          <p className="text-slate-300 text-sm mb-6 max-w-sm">Get notified immediately on your phone when wheat or rice prices hit your target price.</p>
          <button className="bg-white text-slate-900 font-bold px-6 py-3 rounded-xl text-sm transition-transform active:scale-95">
            Configure Alerts
          </button>
        </div>
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default MarketRates;
