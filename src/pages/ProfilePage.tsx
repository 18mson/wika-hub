import { Battery, Navigation, Gauge, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { motorProfile } from '../data/mockData';

export default function ProfilePage() {
  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'charging':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="pb-6 px-4 max-w-lg mx-auto">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-blue-100 mb-1">Motor ID</p>
            <p className="text-2xl font-bold">{motorProfile.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(motorProfile.status)}`}>
            {motorProfile.status.toUpperCase()}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-blue-100 mb-1">Model</p>
          <p className="text-xl font-semibold">{motorProfile.model}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-100">Battery Level</span>
            <span className="text-2xl font-bold">{motorProfile.batteryLevel}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${motorProfile.batteryLevel}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Navigation size={20} className="text-blue-600" />
            <span className="text-xs text-gray-500 font-medium">Range</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{motorProfile.range}</p>
          <p className="text-xs text-gray-500">kilometers</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Gauge size={20} className="text-blue-600" />
            <span className="text-xs text-gray-500 font-medium">Total Mileage</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{motorProfile.totalMileage.toLocaleString()}</p>
          <p className="text-xs text-gray-500">kilometers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Motor Details</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-gray-400" />
              <span className="text-gray-600 text-sm">License Plate</span>
            </div>
            <span className="font-semibold text-gray-800">{motorProfile.licensePlate}</span>
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-gray-400" />
              <span className="text-gray-600 text-sm">Last Charge</span>
            </div>
            <span className="font-medium text-gray-800 text-sm">{formatDate(motorProfile.lastCharge)}</span>
          </div>

          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Battery size={20} className={getBatteryColor(motorProfile.batteryLevel)} />
              <span className="text-gray-600 text-sm">Battery Health</span>
            </div>
            <span className="font-semibold text-green-600">Excellent</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900 mb-1">Next Service Due</p>
          <p className="text-xs text-blue-700">Your motor is due for maintenance at 5,000 km</p>
        </div>
      </div>
    </div>
  );
}
