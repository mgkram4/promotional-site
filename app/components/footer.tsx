'use client';

import React from 'react';

// Footer Component
export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-grid border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-8 mb-8">
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
    </footer>
  );
}; 