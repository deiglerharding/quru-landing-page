// src/components/LandingPage.jsx
import React, { useState } from 'react';
import RequestModal from './RequestModal';
import ExpertSignupModal from './auth/ExpertSignupModal';
import ProcessSection from './sections/ProcessSection';
import ComplianceSection from './sections/ComplianceSection';
import AboutSection from './sections/AboutSection';
import ExpertsSection from './sections/ExpertsSection';
import SectionDivider from './sections/SectionDivider';
import TopNavigationBar from './TopNavigationBar';
import ReactGA from 'react-ga4';

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);
  const [prefillLinkedIn, setPrefillLinkedIn] = useState('');

  // Check if URL is /become-an-expert and open modal
  React.useEffect(() => {
    console.log("LandingPage useEffect running");
    const path = window.location.pathname;
    console.log("Current path:", path);
        
    // Track page view
    ReactGA.send({ hitType: "pageview", page: path });
    
    // Check if the path starts with /become-an-expert
    if (path.startsWith('/become-an-expert') || path.startsWith('/consult')) {
      // Extract LinkedIn URL if present
      const match = path.match(/\/become-an-expert\/(.+)/);

      ReactGA.event({
        category: 'Expert',
        action: 'Page View',
        label: match ? 'LinkedIn Referral' : 'Direct Link',
      });

      if (match && match[1]) {
        // Decode the URL part (it might be URL encoded)
        let linkedInUrl = decodeURIComponent(match[1]);
        
        // Add https:// prefix if it doesn't have a protocol
        if (!linkedInUrl.startsWith('http')) {
          linkedInUrl = 'https://' + linkedInUrl;
        }
        
        setPrefillLinkedIn(linkedInUrl);
      }
      
      setIsExpertModalOpen(true);
    }
  }, []);

  const handleOpenDemoModal = () => {
    // Open Calendly link in a new tab
    window.open('https://calendly.com/wes-quruai/30min', '_blank');
    
    // Track demo link click with ReactGA
    ReactGA.event({
      category: 'Demo',
      action: 'Calendly Link Clicked',
    });
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
      {/* Add top navigation bar */}
      <TopNavigationBar />
      
      {/* Add padding-top to account for fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-start pt-20">
        {/* Remove the "Already an Expert?" button since it's now in the navbar */}
        <div className="grid lg:grid-cols-12 gap-12 items-start pt-12">
          {/* Hero section content */}
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

          {/* Hero right panel */}
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
        
        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center hidden md:flex">
          <p className="text-xs text-gray-500 mb-1">Scroll to learn more</p>
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 16 16">
            <path d="M2 5 L8 11 L14 5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Add section IDs for navigation */}
      <div id="product-section">
        <ProcessSection />
      </div>
      <SectionDivider />
      <div id="compliance-section">
        <ComplianceSection />
      </div>
      <SectionDivider />
      <div id="about-section">
        <AboutSection />
      </div>
      <SectionDivider />
      <div id="experts-section">
        <ExpertsSection onOpenExpertModal={handleOpenExpertModal} />
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
        prefillLinkedIn={prefillLinkedIn}
      />
    </div>
  );
};

export default LandingPage;