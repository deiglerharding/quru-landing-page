import React, { useState } from 'react';
import RequestModal from './RequestModal';
import ExpertSignupModal from './auth/ExpertSignupModal';

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  const handleOpenDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  const handleOpenExpertModal = () => {
    setIsExpertModalOpen(true);
  };

  const handleCloseExpertModal = () => {
    setIsExpertModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-start">
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-12">
          {/* Your existing content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
              <div className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
                QuruAI
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Revolutionizing investment research with{' '}
              <span className="text-purple-900">AI-powered</span> expert diligence
            </h1>
            
            <div className="pt-8 flex gap-4">
              <button 
                onClick={handleOpenDemoModal}
                className="px-8 py-4 bg-purple-900 text-white text-lg font-medium rounded-full 
                           shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 
                           focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300
                           hover:shadow-purple-200 hover:shadow-xl transform hover:-translate-y-1"
              >
                Request a Demo
              </button>
              <button 
                onClick={handleOpenExpertModal}
                className="px-8 py-4 bg-purple-900 text-white text-lg font-medium rounded-full 
                           shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 
                           focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300
                           hover:shadow-purple-200 hover:shadow-xl transform hover:-translate-y-1"
              >
                Become an Expert
              </button>
            </div>
          </div>

          {/* Rest of your existing content */}
          <div className="lg:col-span-5">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-100">
              <p className="text-xl text-gray-600 leading-relaxed">
                The QuruAI platform automates the entire expert diligence process—from expert 
                selection and call completion to insight analysis. Simply submit an inquiry 
                and receive actionable results, freeing you from logistical headaches and 
                enabling faster, more strategic decision-making.
              </p>
            </div>

            <div className="absolute -z-10 right-0 top-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
            <div className="absolute -z-10 right-48 top-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RequestModal 
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemoModal}
        title="Request a Demo"
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLScRJfUaAi3KApHHr5CZSZzKu-AKsjV_TfIMkOs1SqFrwYHXbg/viewform?embedded=true"
      />
      <ExpertSignupModal 
        isOpen={isExpertModalOpen}
        onClose={handleCloseExpertModal}
      />
    </div>
  );
};

export default LandingPage;