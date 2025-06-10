'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

// Footer Component
export const Footer: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.footer 
      ref={ref}
      className="py-8 md:py-12 bg-black border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <div className="flex justify-center gap-6 mb-6">
          {['📧', '📱', '🐦', '📸'].map((icon, index) => (
            <a
              key={index}
              href="#"
              className="text-3xl hover:scale-110 transition-transform"
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="text-gray-400">© 2025 Perfect Pose. All rights reserved.</p>
        <p className="text-sm text-gray-500 mt-4">
          Made with ❤️ by the Perfect Pose Team
        </p>
      </div>
    </motion.footer>
  );
}; 