import React from 'react';
import { CategoryData } from '../types';

interface ResearchContentProps {
  data: CategoryData;
}

const ResearchContent: React.FC<ResearchContentProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Page Title and Image */}
      <header className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {data.name}
        </h1>
        <div className="w-64">
          <img
            src={data.primaryImage}
            alt={data.name}
            className="w-full h-auto rounded shadow"
          />
        </div>
      </header>

      {/* The Problem Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">The Problem</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {data.problemStatement}
        </p>
      </section>

      {/* Requirements and Resources */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Requirements and Resources
        </h2>

        {/* Engineering Requirements */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            Engineering Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.engineeringRequirements}
          </p>
        </div>

        {/* Additional Requirements */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            Additional Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.additionalRequirements}
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">Resources</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.resources}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResearchContent;