'use client';
import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BentoFeatures } from './components/bento-features';
import { Footer } from './components/footer';
import { Navigation } from './components/navigation';
import { NewApiUsageSection } from './components/new-api-usage';
import { NewSignUpSection } from './components/new-cta';
import { NewHeroSection } from './components/new-hero';

// Main App Component
const App: React.FC = () => {
  return (
    <ParallaxProvider>
      <div className="bg-black text-white min-h-screen overflow-x-hidden pt-20">
        <Navigation />
        <NewHeroSection />
        <BentoFeatures />
        <NewApiUsageSection />
        <NewSignUpSection />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default App;
