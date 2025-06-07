'use client';

import React, { useEffect, useRef, useState } from 'react';

// Product Card Component
interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, price, features, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    
    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }
    
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 transition-all duration-300 transform hover:-translate-y-2 ${
        title === 'Pro' ? 'border-blue-500' : ''
      }`}
      style={{
        transform: `scale(${isVisible ? 1 : 0.9})`,
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s ease-out ${index * 0.1}s`
      }}
    >
      <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="text-5xl font-bold mb-6 text-white">{price}</div>
      <ul className="text-gray-300 space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
        title === 'Pro' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'
      }`}>
        {title === 'Pro' ? 'Get Started' : 'Contact Us'}
      </button>
    </div>
  );
};

// Products Section
export const ProductsSection: React.FC = () => {
    const products = [
      {
        title: 'Basic',
        description: 'For individuals and enthusiasts starting with biometric analysis.',
        price: '$49',
        features: ['Up to 10 scans per day', 'Basic vital signs', 'Biometric estimations', 'Limited support'],
      },
      {
        title: 'Pro',
        description: 'For professionals and developers who need advanced features.',
        price: '$99',
        features: ['Unlimited scans', 'All vital signs', 'Advanced exercise analysis', 'Priority support', 'API access'],
      },
      {
        title: 'Enterprise',
        description: 'For large-scale applications and custom integrations.',
        price: 'Custom',
        features: ['Volume licensing', 'Custom model training', 'Dedicated support', 'On-premise deployment'],
      },
    ];
  
    return (
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Pricing Plans
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };

// API Section
export const APISection: React.FC = () => {
  return (
    <section id="api" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">Powerful API</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
          Integrate Perfect Pose into your own applications with our developer-friendly API.
        </p>
        <button className="px-8 py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all">
          Explore API
        </button>
      </div>
    </section>
  );
};

// Results Section
export const ResultsSection: React.FC = () => {
  return (
    <section id="results" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Get Comprehensive Results
        </h2>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <p className="text-gray-300 text-lg">
            Our analysis provides you with a detailed report of your biometric data, vital signs, and exercise performance.
          </p>
        </div>
      </div>
    </section>
  );
}; 