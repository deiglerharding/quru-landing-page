// src/constants/options.js

export const prefixOptions = [
    { value: 'mr', label: 'Mr.' },
    { value: 'mrs', label: 'Mrs.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' },
    { value: 'prof', label: 'Prof.' }
  ];
  
  export const countryOptions = [
    { value: 'ae', label: 'United Arab Emirates' },
    { value: 'au', label: 'Australia' },
    { value: 'br', label: 'Brazil' },
    { value: 'ca', label: 'Canada' },
    { value: 'cn', label: 'China' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France' },
    { value: 'hk', label: 'Hong Kong' },
    { value: 'ie', label: 'Ireland' },
    { value: 'in', label: 'India' },
    { value: 'it', label: 'Italy' },
    { value: 'jp', label: 'Japan' },
    { value: 'mx', label: 'Mexico' },
    { value: 'nz', label: 'New Zealand' },
    { value: 'sa', label: 'Saudi Arabia' },
    { value: 'sg', label: 'Singapore' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'us', label: 'United States' },
    { value: 'za', label: 'South Africa' }
  ].sort((a, b) => a.label.localeCompare(b.label)); // Ensures alphabetical order by country name