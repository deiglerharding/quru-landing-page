// src/components/sections/ProcessSection.jsx
import React from 'react';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Ask a Question',
      description: 'Simply type your inquiry and hit submit.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M9.5 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
      )
    },
    {
      number: '02',
      title: 'Expert Selection',
      description: 'QuruAI finds the best experts for your inquiry - you just confirm.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      )
    },
    {
      number: '03',
      title: 'AI Conducts Interviews',
      description: 'Set it and forget it. Our system conducts interviews on your behalf on both a recurring and one off basis.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      )
    },
    {
      number: '04',
      title: 'Review Results',
      description: 'Access results with summaries, transcripts, and recordings—no manual effort needed.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-800" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Our Platform
          </h2>
          <p className="text-xl text-gray-600">
            It's never been easier to go from question to answer.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white/90 rounded-3xl p-8 shadow-lg border border-purple-100 
                         hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex"
            >
              <div className="flex-shrink-0 bg-purple-100 p-4 rounded-2xl mr-6">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Three benefit cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Effortless Access to Expert Insights</h3>
            <p className="text-gray-700">
              We've reengineered expert calls so you can avoid wasting hours on sourcing and scheduling. 
              Just type a question, and QuruAI delivers results tailored to your research needs.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Matching You with the Perfect Experts</h3>
            <p className="text-gray-700">
              QuruAI maintains a deep knowledge base of each expert's background, using machine learning 
              to pinpoint who's best suited to answer your question—every time.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Compliance at Every Step</h3>
            <p className="text-gray-700">
              QuruAI automatically screens each question, expert, and response for potential risks—before 
              completing any diligence request, adhering to industry standards and firm-specific protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;