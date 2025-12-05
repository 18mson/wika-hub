import { MotorProfile, ChargingStation, Transaction, User } from '../types';

export const userProfile: User = {
  name: 'Jonathan Santo',
  avatar: '/src/assets/avatar_sample.jpg',
  phone: '+62 812-3456-7890',
};

export const motorProfile: MotorProfile = {
  id: 'MK-2024-001',
  model: 'Maka E-Sport 3000',
  batteryLevel: 78,
  range: 156,
  totalMileage: 3847,
  lastCharge: '2024-12-04T08:30:00',
  licensePlate: 'B 1234 XYZ',
  status: 'active',
};

export const chargingStations: ChargingStation[] = [
  {
    id: 'cs-1',
    name: 'Maka Station Central',
    address: 'Jl. Sudirman No. 45, Jakarta',
    distance: 0.8,
    availableSlots: 3,
    totalSlots: 8,
    pricePerKwh: 2500,
    lat: -6.2088,
    lng: 106.8456,
  },
  {
    id: 'cs-2',
    name: 'Plaza Indonesia Charging Hub',
    address: 'Plaza Indonesia, Jakarta',
    distance: 1.2,
    availableSlots: 5,
    totalSlots: 12,
    pricePerKwh: 3000,
    lat: -6.1944,
    lng: 106.8229,
  },
  {
    id: 'cs-3',
    name: 'Grand Indonesia Station',
    address: 'Grand Indonesia, Jakarta',
    distance: 1.5,
    availableSlots: 0,
    totalSlots: 6,
    pricePerKwh: 2800,
    lat: -6.1953,
    lng: 106.8218,
  },
  {
    id: 'cs-4',
    name: 'Senayan City Power Point',
    address: 'Senayan City Mall, Jakarta',
    distance: 2.3,
    availableSlots: 7,
    totalSlots: 10,
    pricePerKwh: 2700,
    lat: -6.2252,
    lng: 106.8010,
  },
  {
    id: 'cs-5',
    name: 'Kemang Quick Charge',
    address: 'Jl. Kemang Raya, Jakarta',
    distance: 3.1,
    availableSlots: 2,
    totalSlots: 5,
    pricePerKwh: 2600,
    lat: -6.2615,
    lng: 106.8166,
  },
];

export const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const types: ('charge' | 'payment' | 'credit')[] = ['charge', 'payment', 'credit'];
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed'];
  const locations = [
    'Maka Station Central',
    'Plaza Indonesia Hub',
    'Grand Indonesia',
    'Senayan City',
    'Kemang Quick Charge',
    'Blok M Station',
    'Kuningan Power Hub',
    'SCBD Fast Charge',
  ];

  let balance = 500000;

  for (let i = 0; i < 87; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = i < 80 ? 'completed' : statuses[Math.floor(Math.random() * statuses.length)];
    const amount = type === 'credit'
      ? Math.floor(Math.random() * 200000) + 50000
      : -(Math.floor(Math.random() * 50000) + 15000);

    if (status === 'completed') {
      balance -= amount;
    }

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(i / 2));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));

    transactions.push({
      id: `txn-${String(i + 1).padStart(4, '0')}`,
      date: date.toISOString(),
      type,
      amount,
      location: locations[Math.floor(Math.random() * locations.length)],
      status,
      balance: Math.max(balance, 0),
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const sosNumber = '+628001234567';

export const sosHistory = [
  {
    id: 'sos-1',
    date: new Date().toISOString(),
    contact: '+62 800-123-4567',
    note: 'Assisted with towing and battery boost',
    status: 'completed',
  },
  {
    id: 'sos-2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    contact: '+62 811-222-333',
    note: 'Arrived late due to traffic',
    status: 'completed',
  },
  {
    id: 'sos-3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    contact: '+62 812-999-000',
    note: 'Unable to reach location',
    status: 'failed',
  },
];
