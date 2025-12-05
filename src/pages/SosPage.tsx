import { PhoneCall, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { sosNumber, sosHistory } from '../data/mockData';

type SosRecord = {
  id: string;
  date: string;
  contact: string;
  note: string;
  status: 'completed' | 'failed' | 'pending' | string;
};

export default function SosPage() {
  const [history, setHistory] = useState(sosHistory);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleCall = () => {
    // Try to initiate a phone call via tel: link. Desktop browsers may prompt external apps.
    window.open(`tel:${sosNumber}`, '_self');

    // Add to local history (client-side only)
    const newEntry = {
      id: `sos-${Date.now()}`,
      date: new Date().toISOString(),
      contact: sosNumber,
      note: 'Emergency call placed',
      status: 'completed',
    };

    setHistory((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="pb-6">
      <div className="bg-gradient-to-br from-red-600 to-red-700 h-44 relative overflow-hidden rounded-b-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-12 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
          <PhoneCall size={48} className="opacity-95" />
          <h2 className="text-lg font-bold mt-2">Emergency Service</h2>
          <p className="text-xs opacity-80 mt-1">Call for immediate assistance: towing, battery, roadside help</p>

          <button
            type="button"
            onClick={handleCall}
            className="mt-4 bg-white text-red-600 font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-95"
          >
            Call Emergency
          </button>
        </div>
      </div>

      <div className="px-4 mt-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">Service History</h3>
          <span className="text-xs text-gray-500">{history.length} records</span>
        </div>

        <div className="space-y-3">
          {history.map((item: SosRecord) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.contact}</p>
                      <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">{item.note}</p>
                </div>

                <div className="ml-3 text-right">
                  <span className={`text-xs font-semibold ${item.status === 'completed' ? 'text-green-600' : item.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-2">
                <Clock size={14} />
                <span>Recorded in activity log</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
