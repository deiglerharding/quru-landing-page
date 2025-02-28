// src/components/sections/ExpertsSection.jsx
import React from 'react';
import ReactGA from 'react-ga4';

const ExpertsSection = ({ onOpenExpertModal }) => {
  const handleExpertClick = () => {
    // Track expert button click with ReactGA
    ReactGA.event({
      category: 'Expert',
      action: 'Section Button Clicked',
    });
    
    // Call the passed function to open the modal
    onOpenExpertModal();
  };

  // Expert testimonials about convenience
  const testimonials = [
    {
      quote: "I can share my expertise at any hour that works for me. No more scheduling headaches or time zone challenges.",
      author: "Sarah K., Financial Analyst"
    },
    {
      quote: "AI consultation lets me fit 20-minute sessions between meetings or during commutes instead of scheduling full hours.",
      author: "Michael T., Healthcare Executive"
    },
    {
      quote: "I was skeptical at first, but the flexibility to contribute on my own time has been a game-changer for my consulting work.",
      author: "David L., Supply Chain Specialist"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered section title - matching other sections */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Become an Expert on Your Terms
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your knowledge without the hassle of scheduling or logistics
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100"
            >
              <div className="text-purple-900 mb-4">
                <svg className="w-8 h-8 text-purple-300 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h3v10h-9zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3v10h-9z" />
                </svg>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
              </div>
              <p className="text-gray-500 font-medium">{testimonial.author}</p>
            </div>
          ))}
        </div>

        {/* Main value proposition */}
        <div className="bg-gradient-to-br from-purple-100 to-white rounded-3xl p-10 shadow-xl border border-purple-200 max-w-3xl mx-auto mb-12">
          <p className="text-gray-700 text-lg mb-8 text-center">
            Your expertise matters, and so does your time. At QuruAI, we've eliminated the 
            hassle of scheduling and back-and-forth communication. Simply log on and consult with 
            our voice AI agent Quinn at your convenience, day or night.
          </p>
        </div>

        {/* Prominent CTA button */}
        <div className="text-center">
          <button 
            onClick={handleExpertClick}
            className="px-10 py-4 bg-purple-900 text-white text-lg font-medium rounded-full 
                     shadow-lg hover:bg-purple-800 focus:outline-none focus:ring-2 
                     focus:ring-purple-900 focus:ring-offset-2 transition-all duration-300
                     hover:shadow-purple-200 hover:shadow-xl transform hover:-translate-y-1"
          >
            Join Our Expert Network
          </button>
          <p className="text-xs text-gray-500 mt-4">No minimum time commitment required</p>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;