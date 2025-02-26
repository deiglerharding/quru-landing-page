import React, { useState, useEffect } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { prefixOptions, countryOptions } from '../../constants/options';
import VerificationModal from './VerificationModal';
import ReactGA from 'react-ga4';


// Extended country codes mapping
const countryCodes = {
  'us': '1',    // United States
  'uk': '44',   // United Kingdom
  'ca': '1',    // Canada
  'au': '61',   // Australia
  'de': '49',   // Germany
  'fr': '33',   // France
  'it': '39',   // Italy
  'es': '34',   // Spain
  'jp': '81',   // Japan
  'cn': '86',   // China
  'in': '91',   // India
  'br': '55',   // Brazil
  'mx': '52',   // Mexico
  'sg': '65',   // Singapore
  'hk': '852',  // Hong Kong
  'ae': '971',  // UAE
  'sa': '966',  // Saudi Arabia
  'za': '27',   // South Africa
  'ie': '353',  // Ireland
  'nz': '64'    // New Zealand
};

const ExpertSignupModal = ({ isOpen, onClose, prefillLinkedIn = '' }) => {
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',      // Formatted E.164 number
    rawPhoneNumber: '',   // User input without formatting
    linkedinProfile: '',
    country: '',
    referralSource: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  // Effect to set LinkedIn profile when prefillLinkedIn prop changes
  useEffect(() => {
    if (prefillLinkedIn) {
      setFormData(prev => ({
        ...prev,
        linkedinProfile: prefillLinkedIn
      }));
    }
  }, [prefillLinkedIn]);

  // Function to format phone number to E.164
  const formatPhoneNumber = (rawNumber, countryCode) => {
    // Remove all non-digit characters
    const digitsOnly = rawNumber.replace(/\D/g, '');
    
    if (!digitsOnly) return '';
    
    // If number already starts with +, return as is
    if (rawNumber.startsWith('+')) return rawNumber;
    
    // If number starts with country code, add +
    if (digitsOnly.startsWith(countryCode)) {
      return `+${digitsOnly}`;
    }
    
    // Otherwise, add country code
    return `+${countryCode}${digitsOnly}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // For phone input, store both raw and formatted versions
      setFormData(prev => ({
        ...prev,
        rawPhoneNumber: value,
        phoneNumber: prev.country ? formatPhoneNumber(value, countryCodes[prev.country]) : value
      }));
    } else if (name === 'country') {
      // When country changes, reformat existing phone number
      setFormData(prev => ({
        ...prev,
        country: value,
        phoneNumber: prev.rawPhoneNumber ? formatPhoneNumber(prev.rawPhoneNumber, countryCodes[value]) : ''
      }));
    } else {
      // For all other fields, just update normally
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'linkedinProfile', 'country'];
    for (const field of required) {
      if (!formData[field]) {
        throw new Error(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate phone number format (E.164)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      throw new Error('Invalid phone number format. Please select a country and enter a valid number.');
    }

    // Validate password strength
    if (formData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      validateForm();
  
      const signUpResult = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            given_name: formData.firstName,
            family_name: formData.lastName,
            'custom:prefix': formData.prefix || '',
            phone_number: formData.phoneNumber,
            'custom:linkedinProfile': formData.linkedinProfile,
            'custom:country': formData.country,
            'custom:referralSource': formData.referralSource || '',
            'custom:userType': 'EXPERT'
          },
          autoSignIn: true
        }
      });

      // Track successful signup
      ReactGA.event({
        category: 'Expert',
        action: 'Signup Completed',
        label: formData.referralSource || 'Not Specified'
      });
  
      setSuccess(true);
      setShowVerification(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Sign Up for QuruAI
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6">
              <AlertDescription>
                Successfully signed up! Please check your email for verification instructions.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Prefix and First Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prefix (optional)</label>
                <select
                  name="prefix"
                  value={formData.prefix}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                >
                  <option value="">Select prefix</option>
                  {prefixOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>
            </div>

            {/* Last Name and Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>
            </div>

            {/* Password fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>
            </div>

            {/* Country and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Country *</label>
                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                >
                  <option value="">Select country</option>
                  {countryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  placeholder={formData.country ? `e.g. 4155552671` : 'Select country first'}
                  value={formData.rawPhoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                  disabled={!formData.country}
                />
              </div>
            </div>

            {/* LinkedIn and Referral */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn Profile *</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  required
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
                <input
                  type="text"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 disabled:opacity-50"
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By clicking "Sign Up" you agree to accept our <a href="https://terms-and-conditions.quru.ai/" target="_blank" rel="noopener noreferrer" className="text-purple-900 hover:text-purple-800 underline">terms and conditions</a>.
              </p>
            </div>
          </form>
        </div>
        {/* Add the VerificationModal here, right before the closing div */}
        <VerificationModal
            isOpen={showVerification}
            onClose={() => setShowVerification(false)}
            email={formData.email}
            onVerificationSuccess={() => {
            setShowVerification(false);
            onClose();
            }}
        />
      </div>
    </div>
  );
};

export default ExpertSignupModal;