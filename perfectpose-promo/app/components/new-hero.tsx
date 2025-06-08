'use client';

import { motion } from 'framer-motion';
import React from 'react';

export const NewHeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900 opacity-40"></div>
      
      {/* Background Glows */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
        }}
        transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Side: Text Content */}
        <motion.div 
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
            Perfect Pose
            <br />
            <span className="text-blue-400">See Yourself Anew.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-lg">
            Unlock your body&apos;s full potential with our revolutionary AI-powered biometric analysis. Perfect Pose transforms your device into a personal health and fitness lab.
          </p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <button className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105">
              Get Started
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500 transition-all transform hover:scale-105">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Phone Demo */}
        <motion.div 
          className="perspective-1000 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-80 h-[640px] transform-gpu preserve-3d transition-transform duration-500 ease-out hover:scale-105">
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3.5rem] p-4 shadow-2xl border-2 border-white/10">
              <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative">
                <video
                  src="/demo.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 