// src/components/FaqPage.jsx
import React, { useState } from 'react';
import TopNavigationBar from './TopNavigationBar';
import Footer from './sections/Footer';
import ReactGA from 'react-ga4';

const FaqPage = () => {
  // Track FAQ page view
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/faq" });
  }, []);

  // FAQ data with questions and answers
  const faqData = [
    {
      question: "How does the QuruAI platform work?",
      answer: "Our platform matches client questions directly to the experts that are best suited to answer them, and experts are then notified when questions are available to answer. Experts can log onto the platform to respond to those questions whenever they want (no scheduling required!), and we use our voice AI agent Quinn to conduct the Q&A session."
    },
    {
      question: "If I have multiple questions in my queue, do I have to answer them all at once?",
      answer: "No. You can end your call at any time, and you will be compensated for each one of the questions that you answered during the call. The remaining questions will be waiting for you next time you log on."
    },
    {
      question: "How is my rate set?",
      answer: "Currently, every expert on the platform is paid a flat rate of $300 per hour (prorated by the minute). In the future, we plan to offer you the ability to set your own rate along with tools to help you determine competitive pricing for your services."
    },
    {
      question: "Am I only getting paid for my time talking, or for the entire length of the call?",
      answer: "You're paid for the entire duration of the call, including any time spent while our agent Quinn is speaking. This ensures that your expertise is valued throughout the entire interaction."
    },
    {
      question: "When and how do I get paid?",
      answer: "Payments are processed twice a month—on the 1st and the 15th—via PayPal. We are also in the process of building an integrated payment system which may offer additional payment options in the future."
    },
    {
      question: "Can I decline a question if I cannot answer it for legal reasons, or if it doesn't align with my expertise?",
      answer: "Yes! You should decline any question if you feel it does not align with your expertise or if the question asks for information that could constitute MNPI, is confidential, or otherwise should not be shared. Simply click the \"Can't Answer?\" button in the queue or tell our agent Quinn that you cannot answer the question while on the call."
    },
    {
      question: "Who can I contact if I have other questions, concerns, or feedback?",
      answer: "We are here to answer any of your questions and would welcome your feedback - it helps us improve our platform! You can reach out to QuruAI Expert Services at expert@quru.ai at any time."
    }
  ];

  // State to track which FAQ item is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle FAQ expansion
  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    
    // Track which question was clicked
    if (expandedIndex !== index) {
      ReactGA.event({
        category: 'FAQ',
        action: 'Open Question',
        label: faqData[index].question
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <TopNavigationBar />
      
      {/* FAQ Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about becoming a QuruAI expert
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-purple-100 overflow-hidden transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-purple-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-purple-900">{faq.question}</h3>
                <svg 
                  className={`w-6 h-6 text-purple-900 transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Answer Content */}
              <div 
                className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedIndex === index 
                    ? 'max-h-96 py-6 opacity-100' 
                    : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Information */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-purple-900 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6">
            Our team is here to help. Feel free to reach out to us directly.
          </p>
          <a 
            href="mailto:expert@quru.ai" 
            className="px-6 py-3 bg-purple-900 text-white font-medium rounded-full inline-flex items-center justify-center hover:bg-purple-800 transition-colors duration-200"
            onClick={() => {
              ReactGA.event({
                category: 'FAQ',
                action: 'Click',
                label: 'Email Contact'
              });
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FaqPage;