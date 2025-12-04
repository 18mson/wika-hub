import { MapPin, Navigation, Zap, Clock } from 'lucide-react';
import { chargingStations } from '../data/mockData';
import { ChargingStation } from '../types';

export default function MapPage() {
  const handleNavigate = (station: ChargingStation) => {
    const destination = station.lat && station.lng
      ? `${station.lat},${station.lng}`
      : encodeURIComponent(station.address);

    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityBg = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'bg-green-50 border-green-200';
    if (percentage > 0) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="pb-6">
      <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-12 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 right-16 w-3 h-3 bg-red-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <MapPin size={48} className="mx-auto mb-2 opacity-80" />
            <p className="text-sm opacity-80">Map visualization</p>
            <p className="text-xs opacity-60 mt-1">Showing nearby charging stations</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Nearby Stations</h2>
          <span className="text-sm text-gray-500">{chargingStations.length} stations found</span>
        </div>

        <div className="space-y-3">
          {chargingStations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{station.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={12} />
                      {station.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-lg ml-2">
                    <Navigation size={12} />
                    <span className="text-xs font-semibold">{station.distance} km</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getAvailabilityBg(station.availableSlots, station.totalSlots)}`}>
                    <Zap size={16} className={getAvailabilityColor(station.availableSlots, station.totalSlots)} />
                    <span className={`text-sm font-semibold ${getAvailabilityColor(station.availableSlots, station.totalSlots)}`}>
                      {station.availableSlots}/{station.totalSlots} slots
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock size={14} />
                    <span className="text-xs">24/7</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">Price per kWh</span>
                  <span className="text-lg font-bold text-gray-800">
                    Rp {station.pricePerKwh.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate(station)}
                className={`w-full py-3 font-semibold text-sm transition-colors ${
                  station.availableSlots > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={station.availableSlots === 0}
              >
                {station.availableSlots > 0 ? 'Navigate' : 'No Slots Available'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
