'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import React, { useEffect, useRef, useState } from 'react';

export const NewApiUsageSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && isInView) {
      Prism.highlightAll();
    }
  }, [isClient, isInView]);

  const code = `import requests

# The API runs on your local machine
API_URL = "http://localhost:8000"

def run_perfect_pose_scan(user_id="user-123"):
    """
    Initiates a scan and retrieves the results.
    """
    start_endpoint = f"{API_URL}/run_complete_scan"
    
    try:
        response = requests.post(start_endpoint, json={"user_id": user_id})
        response.raise_for_status()
        print("Scan complete. Results:")
        print(response.json())
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")

# Example usage:
run_perfect_pose_scan()`;

  return (
    <section id="api-usage" className="py-16 md:py-20 bg-black relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-blue-900/20 to-black"></div>
       <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-5xl font-bold text-white">Easy-to-Use API</h2>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">Integrate Perfect Pose into your application with just a few lines of code. Local, private, and powerful.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 items-start">
          {/* Main Code Block */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.98 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 bg-gray-900/50 rounded-2xl shadow-2xl ring-1 ring-white/10"
          >
            <div className="py-3 px-4 flex items-center justify-between bg-gray-800/60 backdrop-blur-sm rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">example.py</span>
            </div>
            <div className="p-4">
              {isClient ? (
                <pre className="language-python !bg-transparent !p-0">
                  <code className="language-python">{code}</code>
                </pre>
              ) : (
                <pre className="!bg-transparent !p-0">
                  <code>{code}</code>
                </pre>
              )}
            </div>
          </motion.div>

          {/* Side Cards */}
          <div className="space-y-4 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-gray-900/50 p-4 md:p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-2">Local & Private</h3>
              <p className="text-gray-400">Your data never leaves your device. Perfect Pose runs a local server for maximum privacy and speed.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-gray-900/50 p-4 md:p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold text-green-400 mb-2">Simple Integration</h3>
              <p className="text-gray-400">A single API call is all it takes. No complex auth, no rate limits. Just results.</p>
            </motion.div>
             <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.8 }}
               className="text-center"
             >
                <Link href="/api-docs" className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-block">
                    Read API Docs
                </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 