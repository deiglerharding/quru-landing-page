// src/components/Footer.jsx
import React from 'react';
import ReactGA from 'react-ga4';

const Footer = () => {
  // Track clicks on footer links
  const trackFooterClick = (label) => {
    ReactGA.event({
      category: 'Footer',
      action: 'Click',
      label: label
    });
  };

  // Handle opening Calendly link
  const handleGetStarted = () => {
    window.open('https://calendly.com/wes-quruai/30min', '_blank');
    
    // Track get started button click
    ReactGA.event({
      category: 'Footer',
      action: 'Click',
      label: 'Get Started'
    });
  };

  return (
    <footer className="bg-gray-50 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold text-purple-900 mb-2">QuruAI</div>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} QuruAI. All rights reserved.</p>
          </div>
          
          {/* Navigation Links - With column labels */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6 mb-6 md:mb-0">
            {/* Navigation Column */}
            <div>
              <h3 className="text-sm font-semibold text-purple-900 mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
                      trackFooterClick('Product');
                    }}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('compliance-section').scrollIntoView({ behavior: 'smooth' });
                      trackFooterClick('Compliance');
                    }}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Compliance
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
                      trackFooterClick('About Us');
                    }}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      document.getElementById('experts-section').scrollIntoView({ behavior: 'smooth' });
                      trackFooterClick('Experts');
                    }}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Experts
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Account Column */}
            <div>
              <h3 className="text-sm font-semibold text-purple-900 mb-3">Account</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://app.quru.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackFooterClick('Client Sign In')}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Client Sign In
                  </a>
                </li>
                <li>
                  <a 
                    href="https://expert.quru.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackFooterClick('Expert Sign In')}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Expert Sign In
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Support Column */}
            <div>
              <h3 className="text-sm font-semibold text-purple-900 mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleGetStarted}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Get Started
                  </button>
                </li>
                <li>
                  <a 
                    href="https://terms-and-conditions.quru.ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackFooterClick('Terms')}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contact@quru.ai" 
                    onClick={() => trackFooterClick('Contact')}
                    className="text-sm text-gray-600 hover:text-purple-900"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Secondary footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            
        </div>
      </div>
    </footer>
  );
};

export default Footer;