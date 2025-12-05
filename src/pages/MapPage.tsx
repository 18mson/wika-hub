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
      <div className="h-48 overflow-hidden rounded-lg sticky top-6 z-10 -mt-6 border-b-4 border-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521853759907!2d106.816666!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jakarta Map"
        ></iframe>
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
