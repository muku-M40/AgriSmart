
export enum UserRole {
  ADMIN = 'ADMIN',
  FARMER = 'FARMER'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: ApplicationStatus;
  farmLocation?: string;
  crops?: string[];
  password?: string;
}

export interface FarmHealthData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  moisture: number;
  temperature: number;
  timestamp: string;
}

export interface MarketRate {
  commodity: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  audioUrl?: string;
}

export enum Language {
  ENGLISH = 'en-US',
  HINDI = 'hi-IN',
  MARATHI = 'mr-IN'
}
