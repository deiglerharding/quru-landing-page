import React from 'react';

const DemoRequestModal = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Request a Demo
          </h3>
          
          <div className="w-full overflow-y-auto max-h-[70vh]">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLScRJfUaAi3KApHHr5CZSZzKu-AKsjV_TfIMkOs1SqFrwYHXbg/viewform?embedded=true" 
              width="100%" 
              height="900" 
              frameBorder="0" 
              className="w-full"
              onLoad={handleIframeLoad}
            >
              Loading...
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequestModal;