// src/components/sections/ComplianceSection.jsx
import React from 'react';

const ComplianceSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best-in-Class <span className="text-purple-900">Compliance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built comprehensive compliance protocols into every aspect of our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100 h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">Trained Personnel</h3>
            <p className="text-gray-600">
              All employees and experts undergo rigorous compliance training to ensure adherence to industry regulations and best practices.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100 h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">Custom Compliance Portal</h3>
            <p className="text-gray-600">
              Our clients have access to a dedicated compliance portal that provides transparency and control over their data and interactions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100 h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-3">MNPI Screening</h3>
            <p className="text-gray-600">
              We screen all questions and answers for potential Material Non-Public Information (MNPI) with a thorough human-in-the-loop verification process.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-full shadow-md border border-purple-100 px-8 py-4">
            <p className="text-gray-700">
              Questions about our compliance measures?{" "}
              <a 
                href="mailto:compliance@quru.ai" 
                className="text-purple-900 font-medium hover:underline"
              >
                Contact our compliance team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;