// Environment Variables Configuration
const config = {
  // API URLs
  development: {
    API_URL: 'http://localhost:4000/api/v1',
  },
  production: {
    API_URL: import.meta.env.VITE_API_URL || 'https://tour-management-backend.onrender.com/api/v1',
  },
};

// Get current environment
const environment = import.meta.env.MODE || 'development';

// Export configuration based on environment
export const BASE_URL = config[environment].API_URL;

// Validate the API URL
if (!BASE_URL) {
  console.error('API URL is not configured. Please set VITE_API_URL environment variable.');
}

console.log('Current Environment:', environment);
console.log('Using API URL:', BASE_URL);

// Export other configurations
export const APP_NAME = 'Tour Management';
export const APP_VERSION = '1.0.0';

// JWT Configuration
export const JWT_CONFIG = {
  storage_key: 'token',
  expiry: '24h',
};

// Image Configuration
export const IMAGE_CONFIG = {
  default_avatar: '/images/avatar.jpg',
  upload_limit: 5 * 1024 * 1024, // 5MB
  allowed_types: ['image/jpeg', 'image/png', 'image/webp'],
};

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  tours: {
    list: '/tours',
    search: '/tours/search',
    featured: '/tours/featured',
    details: (id) => `/tours/${id}`,
    book: (id) => `/tours/${id}/booking`,
  },
  reviews: {
    create: (tourId) => `/reviews/${tourId}`,
    list: (tourId) => `/reviews/${tourId}`,
  },
  bookings: {
    create: '/bookings',
    list: '/bookings',
    details: (id) => `/bookings/${id}`,
  },
};