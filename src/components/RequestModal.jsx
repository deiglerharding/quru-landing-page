// RequestModal.jsx
import React from 'react';

const RequestModal = ({ isOpen, onClose, title, formUrl }) => {
  const handleIframeLoad = (event) => {
    try {
      // Check if the form was submitted by looking for the response submission URL
      const formUrl = event.target.src;
      if (formUrl.includes('formResponse')) {
        setTimeout(onClose, 1000); // Close after 1 second to allow user to see confirmation
      }
    } catch (error) {
      console.error('Error checking form submission:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[90vh] flex flex-col relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal header */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        
        {/* Modal content */}
        <div className="flex-1 overflow-y-auto">
          <iframe 
            src={formUrl}
            width="100%" 
            height="100%" 
            frameBorder="0" 
            className="w-full h-full"
            onLoad={handleIframeLoad}
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;