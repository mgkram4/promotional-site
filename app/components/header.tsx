'use client';

import React from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

// Hero Section
export const HeroSection: React.FC = () => {
  return (
    <ParallaxBanner
      layers={[{ image: '/header.png', speed: -15 }]}
      className="h-screen"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="relative z-10 text-center px-6 flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
          Perfect Pose
        </h1>
        <p className="text-2xl md:text-3xl text-gray-200 mb-4 max-w-3xl mx-auto">
          The Future of Fitness is Here. See Yourself in a New Way with Perfect Pose.
        </p>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Unlock your body&apos;s full potential with our revolutionary AI-powered biometric analysis system. Perfect Pose uses your device&apos;s camera to transform it into a personal health and fitness lab.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all">
            Get Started
          </button>
          <button className="px-8 py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </ParallaxBanner>
  );
};
