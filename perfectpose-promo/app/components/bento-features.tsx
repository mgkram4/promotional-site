'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';
import { IconType } from 'react-icons';
import { FiBarChart2, FiCpu, FiHeart, FiLock, FiMaximize, FiWatch } from 'react-icons/fi';

interface Feature {
  icon: IconType;
  iconClassName: string;
  title: string;
  description: string;
  className?: string;
}

const features: Feature[] = [
  {
    icon: FiHeart,
    iconClassName: "h-8 w-8 text-blue-400",
    title: 'Contactless Vital Signs',
    description: 'Measure heart rate, skin temperature, and blood pressure with just your camera.',
    className: 'md:col-span-2',
  },
  {
    icon: FiMaximize,
    iconClassName: "h-8 w-8 text-green-400",
    title: 'Accurate Biometric Data',
    description: 'Get precise estimations of your height, weight, and BMI.',
  },
  {
    icon: FiWatch,
    iconClassName: "h-8 w-8 text-purple-400",
    title: 'Real-time Exercise Analysis',
    description: 'Receive feedback on your form to maximize effectiveness and prevent injury.',
  },
  {
    icon: FiBarChart2,
    iconClassName: "h-8 w-8 text-red-400",
    title: 'Personalized Insights',
    description: 'Track your progress over time with detailed reports and historical data.',
  },
  {
    icon: FiLock,
    iconClassName: "h-8 w-8 text-yellow-400",
    title: 'Secure and Private',
    description: 'Your data is processed securely, and your privacy is our top priority.',
  },
  {
    icon: FiCpu,
    iconClassName: "h-8 w-8 text-indigo-400",
    title: 'State-of-the-Art AI',
    description: 'Built with PyTorch, YOLOv8, MediaPipe, and custom models for best-in-class analysis.',
    className: 'md:col-span-2',
  },
];

const FeatureCard: React.FC<Feature & { index: number }> = ({ icon: Icon, iconClassName, title, description, className = '', index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            className={`relative rounded-3xl p-6 md:p-8 overflow-hidden bg-gray-900/50 border border-white/10 shadow-lg group ${className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className={`mb-4 ${iconClassName}`}>
                    <Icon size="100%" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
        </motion.div>
    );
};

export const BentoFeatures: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="features" className="py-16 md:py-20 bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-bold text-white">Powerful Features</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">Discover what makes Perfect Pose the most advanced fitness companion.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
          <motion.div 
            className="md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden bg-gray-900/50 p-6 md:p-8 border border-white/10 shadow-lg flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mid.png" alt="Fitness analysis" className="w-full h-full object-contain"/>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 