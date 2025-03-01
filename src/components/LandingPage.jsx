// src/components/LandingPage.jsx
import React, { useState } from 'react';
import RequestModal from './RequestModal';
import ExpertSignupModal from './auth/ExpertSignupModal';
import ProcessSection from './sections/ProcessSection';
import ComplianceSection from './sections/ComplianceSection';
import AboutSection from './sections/AboutSection';
import ExpertsSection from './sections/ExpertsSection';
import SectionDivider from './sections/SectionDivider';
import Footer from './sections/Footer';

import TopNavigationBar from './TopNavigationBar';
import KnowledgeFlowVisualization from './visuals/KnowledgeFlowVisualization';
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
      
      {/* Hero section with left-aligned content and right visual element */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Left side content */}
          <div className="flex flex-col justify-center space-y-8 max-w-2xl">
            {/* Headline with highlighted word */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Streamline your expert research from<br />
               <span className="text-purple-600">inquiry</span> to insight
            </h1>
            
            {/* Subtext */}
            <p className="text-xl text-gray-600 leading-relaxed pr-4">
              Drive smarter research outcomes with our AI-powered platform that eliminates the logistical 
              headaches of traditional expert networks and instantly connects you with the best experts 
              for your research needs
            </p>
            
            {/* Buttons - left aligned */}
            <div className="pt-4 flex gap-4">
              <button 
                onClick={handleOpenDemoModal}
                className="px-8 py-4 bg-purple-900 text-white text-lg font-medium rounded-full 
                           shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 
                           focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300
                           hover:shadow-purple-200 hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </button>
              <button 
                onClick={handleOpenExpertModal}
                className="px-8 py-4 bg-white text-purple-900 border border-purple-900 text-lg font-medium rounded-full 
                           shadow-lg hover:bg-purple-50 focus:outline-none focus:ring-2 
                           focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300
                           hover:shadow-purple-200 hover:shadow-xl transform hover:-translate-y-1"
              >
                Become an Expert
              </button>
            </div>
          </div>

          {/* Right side visual element */}
          {/* Right side visual element */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Background blob shapes for added depth */}
            <div className="absolute -top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
            <div className="absolute -bottom-10 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
            
            {/* Knowledge Flow Visualization */}
            <div className="relative z-10 w-full h-96">
              <KnowledgeFlowVisualization />
            </div>
          </div>
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

      <Footer />

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