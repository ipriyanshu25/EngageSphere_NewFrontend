
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features }) => {
  return (
    <div
      className="
        bg-gradient-to-br from-[#1a2a6c] to-[#4b6cb7] 
        rounded-2xl shadow-lg border border-[#3a4a6d]
        backdrop-blur-sm bg-opacity-60
        p-6 md:p-8
      "
    >
      <h3 className="text-2xl font-extrabold text-white mb-6 tracking-wide drop-shadow-lg">
        Premium Features
      </h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-6 w-6 text-yellow-400 mr-4 flex-shrink-0 mt-1" />
            <span className="text-yellow-100 text-lg">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceFeatures;
