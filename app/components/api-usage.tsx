'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import React, { useEffect, useRef, useState } from 'react';

export const ApiUsageSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      Prism.highlightAll();
    }
  }, [isInView]);
  
  useEffect(() => {
    if (isExpanded) {
      Prism.highlightAll();
    }
  }, [isExpanded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = `import requests
import time
import json

# The API runs on your local machine
API_URL = "http://localhost:8000"

def run_perfect_pose_scan():
    """
    Initiates a scan and retrieves the results.
    """
    # 1. Start the scan
    start_endpoint = f"{API_URL}/run_complete_scan"
    payload = {
        "user_id": "example-user-123",
        "user_name": "Example User"
    }
    
    print("Starting Perfect Pose scan...")
    try:
        start_response = requests.post(start_endpoint, json=payload)
        if start_response.status_code != 200:
            print(f"Error starting scan: {start_response.text}")
            return

        print("Scan process initiated. A camera window should open on the server.")
        print("Please complete the scan process on the server machine.")

    except requests.ConnectionError as e:
        print(f"Connection Error: Could not connect to the API at {API_URL}.")
        print("Please ensure the Perfect Pose server is running.")
        return

    # 2. Poll for results
    # In a real-world app, you'd poll the /api/status endpoint until the scan is complete.
    # For this example, we'll just wait a fixed amount of time.
    print("\\\\nWaiting for analysis to complete... (simulating a 45-second scan)")
    time.sleep(45)

    # 3. Fetch the results
    results_endpoint = f"{API_URL}/get_latest_results"
    print("Fetching results...")
    try:
        results_response = requests.get(results_endpoint)
        if results_response.status_code == 200:
            print("Results retrieved successfully!")
            return results_response.json()
        else:
            print(f"Error retrieving results: {results_response.text}")
            return None
    except requests.ConnectionError as e:
        print(f"Connection Error: Could not connect to the API at {API_URL}.")
        return None


# Example usage:
if __name__ == "__main__":
    scan_result = run_perfect_pose_scan()
    if scan_result:
        print("\\\\n--- Biometric Scan Report ---")
        print(json.dumps(scan_result, indent=2))
        print("-----------------------------")`;

  return (
    <section id="api-usage" className="py-20 bg-grid" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 
          className="text-5xl font-bold text-center mb-4 text-white transition-all duration-700"
          style={{ 
            transform: `translateY(${isInView ? 0 : 20}px)`,
            opacity: isInView ? 1 : 0 
          }}
        >
          Easy-to-Use API
        </h2>
        <motion.p 
          className="text-lg text-gray-400 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Integrate Perfect Pose into your application with just a few lines of code.
        </motion.p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="text-gray-300 text-lg prose pr-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">Simple, Powerful, and Local</h3>
            <p>
              Perfect Pose runs a lightweight server on your local machine, ensuring that your biometric data never leaves your control. Privacy is paramount, and your data stays with you.
            </p>
            <p>
              The API is designed for ultimate simplicity. A single POST request kicks off a scan, and a GET request retrieves the detailed analysis. There&apos;s no need for complex authentication or rate limits—just straightforward, immediate results. This local-first approach also means the API is incredibly fast and reliable.
            </p>
            <p>
              This Python example demonstrates a typical polling workflow. In a real-world application, you would poll the <code>/api/status</code> endpoint until the scan is complete, at which point you can fetch the comprehensive results. The local server provides a camera feed for the user to interact with, making the process seamless.
            </p>
             <p>
              Our goal is to provide developers with a powerful tool that is easy to integrate, respects user privacy, and delivers consistent performance. Get up and running in minutes, not days.
            </p>
          </motion.div>
          <motion.div
            className="bg-slate-900 rounded-xl shadow-2xl ring-1 ring-white/10"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.98 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="py-3 px-4 flex items-center justify-between bg-slate-800/80 backdrop-blur-sm rounded-t-xl">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">example.py</span>
              <div className="w-20"></div> {/* Spacer */}
            </div>
            <div className={`relative p-4 transition-all duration-300 ${isExpanded ? '' : 'max-h-96 overflow-y-auto'}`}>
              <pre className="language-python !bg-transparent !p-0">
                <code className="language-python">{code}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-sm bg-slate-700/50 hover:bg-slate-700 rounded-md px-3 py-1"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-b-xl text-center">
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-400 hover:text-blue-300 font-semibold text-sm">
                {isExpanded ? 'Show less' : 'Show full example'}
              </button>
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-16">
          <Link href="/api-docs" className="px-8 py-4 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-block">
            Read API Docs
          </Link>
        </div>
      </div>
    </section>
  );
};