'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';

// TypeScript interfaces
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

// 3D Phone Section
export const PhoneSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section ref={sectionRef}>
      <ParallaxBanner
        layers={[{ image: '/mid.png', speed: -15 }]}
        className="min-h-screen py-20 flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div 
            className="perspective-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease-out'
            }}
          >
            <div
              className="w-72 h-[600px] mx-auto transform-gpu transition-transform duration-100 ease-out preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  <video
                    src="/demo.mov"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div 
            className="text-left"
            style={{ 
              transform: `translateX(${isVisible ? 0 : 50}px)`,
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s ease-out 0.3s'
            }}
          >
            <h2 className="text-5xl font-bold mb-6 text-white">
              What is Perfect Pose?
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              Perfect Pose is a cutting-edge application that provides a deep understanding of your physical health and exercise performance, all from a simple video scan. Our patent-pending technology analyzes your body&apos;s movements, form, and even your vital signs to deliver insights that were once only available in professional sports labs.
            </p>
            <h3 className="text-4xl font-bold mb-6 text-white mt-8">
              How It Works
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Our system uses advanced computer vision and a sophisticated AI pipeline to analyze your biometric data. By simply following the on-screen instructions during a scan, Perfect Pose captures and processes information about your physique and vital signs with incredible precision. The result is a comprehensive health profile that helps you track your progress, optimize your workouts, and achieve your fitness goals faster.
            </p>
            <button className="px-8 py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all">
              Try It Now
            </button>
          </div>
        </div>
      </ParallaxBanner>
    </section>
  );
};

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
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
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
      style={{
        transform: `translateY(${isVisible ? 0 : 30}px) scale(${isVisible ? 1 : 0.9})`,
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s ease-out ${index * 0.1}s`
      }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-blue-400">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Features Section
export const FeaturesSection: React.FC = () => {
  const features = [
    { icon: '❤️', title: 'Contactless Vital Signs', description: 'Measure your heart rate, skin temperature, and blood pressure without any extra hardware.' },
    { icon: '📏', title: 'Accurate Biometric Data', description: 'Get precise estimations of your height, weight, and BMI.' },
    { icon: '🤸', title: 'Real-time Exercise Analysis', description: 'Get feedback on your exercise form to maximize effectiveness and prevent injury.' },
    { icon: '📈', title: 'Personalized Insights', description: 'Track your progress over time with detailed reports and historical data.' },
    { icon: '🔒', title: 'Secure and Private', description: 'Your data is processed securely, and your privacy is our priority.' },
    { icon: '🤖', title: 'State-of-the-Art AI', description: 'Built with PyTorch, YOLOv8, MediaPipe, and custom models for best-in-class analysis.' },
  ];

  return (
    <ParallaxBanner 
      layers={[{ image: '/mid.png', speed: -15 }]}
      className="py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-white">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </ParallaxBanner>
  );
}; 