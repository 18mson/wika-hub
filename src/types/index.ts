export interface User {
  name: string;
  avatar: string;
  phone: string;
}

export interface MotorProfile {
  id: string;
  model: string;
  batteryLevel: number;
  range: number;
  totalMileage: number;
  lastCharge: string;
  licensePlate: string;
  status: 'active' | 'charging' | 'maintenance';
}

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  distance: number;
  availableSlots: number;
  totalSlots: number;
  pricePerKwh: number;
  lat: number;
  lng: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'charge' | 'payment' | 'credit';
  amount: number;
  location: string;
  status: 'completed' | 'pending' | 'failed';
  balance: number;
}
