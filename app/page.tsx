'use client';
import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ApiUsageSection } from './components/api-usage';
import { SignUpSection } from './components/cta';
import { Footer } from './components/footer';
import { HeroSection } from './components/header';
import { FeaturesSection, PhoneSection } from './components/middle';
import { Navigation } from './components/navigation';

// Main App Component
const App: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <PhoneSection />
        <FeaturesSection />
        <ApiUsageSection />
        <SignUpSection />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default App;
