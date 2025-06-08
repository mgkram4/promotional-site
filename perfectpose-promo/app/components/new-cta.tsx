'use client';

import { motion, useInView } from 'framer-motion';
import React, { useState } from 'react';

export const NewSignUpSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for signing up! We\\\'ll be in touch soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="sign-up" className="py-16 md:py-20 bg-black relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Left side: Text and Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Get <span className="text-purple-400">Early Access</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">
            Be the first to experience the future of fitness. Join our waitlist to get exclusive updates and be notified when we launch.
          </p>
          <div className="flex justify-center lg:justify-start">
            <img src="/cta.png" alt="Join the waitlist" className="w-2/3"/>
          </div>
        </motion.div>

        {/* Right side: Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl"
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
                placeholder="Ada Lovelace"
                className="w-full px-4 py-3 bg-gray-800/60 border-2 border-transparent rounded-lg focus:border-purple-500 focus:outline-none focus:bg-gray-800 transition-all text-white placeholder-gray-500"
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
                placeholder="ada.lovelace@example.com"
                className="w-full px-4 py-3 bg-gray-800/60 border-2 border-transparent rounded-lg focus:border-purple-500 focus:outline-none focus:bg-gray-800 transition-all text-white placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Join Waitlist
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">We respect your privacy. No spam, ever.</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}; 