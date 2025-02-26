// src/components/sections/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A team of experts passionate about connecting knowledge seekers with domain specialists
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
            
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6">
                We're transforming how organizations access expert knowledge by bringing people from inquiry to insight faster than ever before.
              </p>
              <p className="text-lg text-gray-700">
                Our platform connects clients with world-class experts while drastically reducing the logistical overhead of traditional expert networks.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Unique Perspective</h3>
              <p className="text-gray-700">
                Our founding team brings firsthand experience both conducting and relying on expert calls throughout their careers. We've experienced the pain points from both sides and built QuruAI to solve them.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-lg border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4">AI Innovation</h3>
              <p className="text-gray-700">
                With deep expertise in conversational AI, voice models, and large language models, we're leveraging cutting-edge technology to improve both the expert and client experience, making knowledge transfer more efficient and insightful than ever before.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;