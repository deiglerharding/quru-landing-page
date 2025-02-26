import React, { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
import { Alert, AlertDescription } from '../ui/alert';
import ReactGA from 'react-ga4';


const VerificationModal = ({ isOpen, onClose, email, onVerificationSuccess }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: verificationCode
      });

      // Track verification success
      ReactGA.event({
        category: 'Expert',
        action: 'Verification Completed',
        label: email
      });
    
      onVerificationSuccess();
      window.location.href = 'https://expert.quru.ai/';
    } catch (error) {
      // Track verification error
      ReactGA.event({
        category: 'Expert',
        action: 'Verification Error',
        label: error.message || 'Unknown Error'
      });
      console.error('Error confirming signup:', error);
      setError(error.message || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Verify Your Email
        </h3>

        <p className="text-gray-600 mb-6">
          We've sent a verification code to {email}. Please enter it below to complete your registration.
        </p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2.5"
              placeholder="Enter code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;