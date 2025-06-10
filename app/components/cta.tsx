'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

// TypeScript interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
}

// Sign Up Section
export const SignUpSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }
    
    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for signing up! We\'ll be in touch soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="sign-up" ref={sectionRef}>
      <ParallaxBanner
        layers={[{ image: '/cta.png', speed: -15 }]}
        className="py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Get Early Access
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
            style={{
              transform: `scale(${isVisible ? 1 : 0.9})`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s ease-out',
            }}
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-white hover:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-white hover:border-blue-500"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="phone" className="block text-gray-300 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none transition-all text-white hover:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </ParallaxBanner>
    </section>
  );
};

 