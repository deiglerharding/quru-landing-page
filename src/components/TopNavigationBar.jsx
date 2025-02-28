// src/components/TopNavigationBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';

const TopNavigationBar = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const signInRef = useRef(null);
  
  // Track scrolling to add shadow when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle clicks outside the sign-in dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        setIsSignInOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjusted for navbar height
        behavior: 'smooth'
      });
      
      // Track navigation clicks
      ReactGA.event({
        category: 'Navigation',
        action: 'Click',
        label: sectionId
      });
      
      // Close mobile menu after clicking
      setIsMobileMenuOpen(false);
    }
  };

  // Handle opening Calendly link
  const handleGetStarted = () => {
    window.open('https://calendly.com/wes-quruai/30min', '_blank');
    
    // Track get started button click
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'Get Started'
    });
  };

  // Toggle sign-in dropdown
  const toggleSignInMenu = () => {
    setIsSignInOpen(!isSignInOpen);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Close sign-in dropdown when opening mobile menu
    if (!isMobileMenuOpen) {
      setIsSignInOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-3xl font-bold text-purple-900">
              QuruAI
            </div>
          </div>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center absolute left-0 right-0 mx-auto pointer-events-none">
            <div className="flex items-center space-x-8 pointer-events-auto">
              <button 
                onClick={() => scrollToSection('product-section')}
                className="text-gray-600 hover:text-purple-900 font-medium transition-colors duration-200"
              >
                Product
              </button>
              <button 
                onClick={() => scrollToSection('compliance-section')}
                className="text-gray-600 hover:text-purple-900 font-medium transition-colors duration-200"
              >
                Compliance
              </button>
              <button 
                onClick={() => scrollToSection('about-section')}
                className="text-gray-600 hover:text-purple-900 font-medium transition-colors duration-200"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('experts-section')}
                className="text-gray-600 hover:text-purple-900 font-medium transition-colors duration-200"
              >
                Experts
              </button>
            </div>
          </div>
          
          {/* Right Side Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            {/* Sign In Button with Dropdown */}
            <div className="relative" ref={signInRef}>
              <button
                onClick={toggleSignInMenu}
                className="px-4 py-2 border border-purple-900 text-purple-900 rounded-full hover:bg-purple-50 transition-colors duration-200 flex items-center"
              >
                <span>Sign In</span>
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform duration-200 ${isSignInOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isSignInOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-purple-100">
                  <a 
                    href="https://app.quru.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-6 py-4 text-purple-900 hover:bg-purple-50 transition-colors duration-200 font-medium text-base border-b border-purple-50"
                    onClick={() => {
                      ReactGA.event({
                        category: 'SignIn',
                        action: 'Click',
                        label: 'Client'
                      });
                    }}
                  >
                    Client
                  </a>
                  <a 
                    href="https://expert.quru.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-6 py-4 text-purple-900 hover:bg-purple-50 transition-colors duration-200 font-medium text-base"
                    onClick={() => {
                      ReactGA.event({
                        category: 'SignIn',
                        action: 'Click',
                        label: 'Expert'
                      });
                    }}
                  >
                    Expert
                  </a>
                </div>
              )}
            </div>
            
            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              className="px-6 py-2 bg-purple-900 text-white font-medium rounded-full shadow-md hover:bg-purple-800 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-purple-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pt-2 pb-4">
          {/* Navigation Links */}
          <div className="px-4 space-y-4">
            <button 
              onClick={() => scrollToSection('product-section')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-900 rounded-md transition-colors duration-200"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection('compliance-section')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-900 rounded-md transition-colors duration-200"
            >
              Compliance
            </button>
            <button 
              onClick={() => scrollToSection('about-section')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-900 rounded-md transition-colors duration-200"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('experts-section')}
              className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-900 rounded-md transition-colors duration-200"
            >
              Experts
            </button>
          </div>
          
          {/* Sign In Options */}
          <div className="mt-4 border-t border-gray-200 pt-4 px-4 space-y-2">
            <p className="text-sm text-purple-900 font-medium px-4 mb-2">Sign in as:</p>
            <a 
              href="https://app.quru.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-3 text-purple-900 hover:bg-purple-50 hover:text-purple-800 rounded-md transition-colors duration-200 font-medium"
            >
              Client
            </a>
            <a 
              href="https://expert.quru.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block px-4 py-3 text-purple-900 hover:bg-purple-50 hover:text-purple-800 rounded-md transition-colors duration-200 font-medium"
            >
              Expert
            </a>
          </div>
          
          {/* Get Started Button */}
          <div className="mt-6 px-4">
            <button
              onClick={handleGetStarted}
              className="w-full px-6 py-3 bg-purple-900 text-white font-medium rounded-md shadow-md hover:bg-purple-800 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavigationBar;