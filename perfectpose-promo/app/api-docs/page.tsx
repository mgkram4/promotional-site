'use client';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from 'react';
import { FiTerminal, FiZap } from 'react-icons/fi';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';

const endpoints = [
  {
    id: 'introduction',
    title: 'Introduction',
    method: 'info'
  },
  {
    id: 'index',
    title: 'Web Interface',
    method: 'GET',
    path: '/',
  },
  {
    id: 'start-scan',
    title: 'Start Biometric Scan',
    method: 'POST',
    path: '/start_scan',
  },
  {
    id: 'scan-status',
    title: 'Get Scan Status',
    method: 'GET',
    path: '/scan_status',
  },
  {
    id: 'video-feed',
    title: 'Video Feed Stream',
    method: 'GET',
    path: '/video_feed',
  },
  {
    id: 'submit-feedback',
    title: 'Submit Feedback',
    method: 'POST',
    path: '/submit_feedback',
  },
  {
    id: 'feedback-status',
    title: 'Feedback Status',
    method: 'GET',
    path: '/feedback_status',
  },
];

const MethodBadge = ({ method }: { method: string }) => {
  const colorMap: { [key: string]: string } = {
    GET: 'bg-green-600/20 text-green-300 border-green-500/30',
    POST: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
    DELETE: 'bg-red-600/20 text-red-300 border-red-500/30',
    info: 'bg-gray-600/20 text-gray-300 border-gray-500/30'
  };
  return (
    <span className={`font-mono text-sm font-semibold px-2.5 py-1 rounded-md border ${colorMap[method] || 'bg-gray-600/20 text-gray-300'}`}>
      {method}
    </span>
  );
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <div className="bg-gray-900/70 rounded-lg overflow-hidden border border-white/10 mt-4">
    <div className="p-4">
      <pre><code className={`language-${language}`}>{code.trim()}</code></pre>
    </div>
  </div>
);

const APIDocsPage = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <Navigation />
      <main className="max-w-8xl mx-auto px-6 py-24 pt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-3 lg:sticky lg:top-24 h-full">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg text-white mb-4">API Reference</h3>
                {endpoints.map(endpoint => (
                    <a href={`#${endpoint.id}`} key={endpoint.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
                        <MethodBadge method={endpoint.method} />
                        <span className="text-gray-300">{endpoint.title}</span>
                    </a>
                ))}
            </div>
          </aside>

          <div className="lg:col-span-9 mt-12 lg:mt-0">
            <div id="introduction" className="scroll-mt-24 space-y-8">
              <h1 className="text-5xl font-bold text-white">API Documentation</h1>
              <p className="text-lg text-gray-400 max-w-3xl">
                The official guide to integrating with the Perfect Pose biometric analysis system. Our Flask-based web interface provides both a user-friendly browser interface and REST API endpoints for biometric scanning, running locally with real-time video processing.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10 flex gap-4 items-center"><div className="w-8 h-8 text-blue-400"><FiZap size="100%" /></div><div><h4 className="font-bold text-white">Local First</h4><p className="text-sm">Incredibly fast and private. No cloud dependency.</p></div></div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10 flex gap-4 items-center"><div className="w-8 h-8 text-green-400"><FiTerminal size="100%" /></div><div><h4 className="font-bold text-white">RESTful</h4><p className="text-sm">Standard HTTP methods and status codes.</p></div></div>
              </div>
            </div>

            <section id="index" className="scroll-mt-24 space-y-4 pt-20">
              <h2 className="text-3xl font-bold text-white">Web Interface</h2>
              <p>The main web interface for the Perfect Pose biometric scanner. Returns the HTML interface for browser-based scanning.</p>
              <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/</span></div>
              <h4 className="text-xl font-semibold text-white pt-4">Description</h4>
              <p>Returns the complete HTML interface with real-time video feed, scan controls, and results display. This is the primary entry point for users accessing the system through a web browser.</p>
            </section>

             <section id="start-scan" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Start Biometric Scan</h2>
                <p>Initiates a biometric scan with specified duration and optional training data collection.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="POST" /><span className="font-mono text-white">/start_scan</span></div>
                
                <h4 className="text-xl font-semibold text-white pt-4">Request Body</h4>
                 <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="font-mono"><span className="text-blue-400">duration</span>: integer <span className="text-gray-500 italic ml-2">Optional (default: 20)</span></p>
                    <p className="text-gray-400 pl-4 mt-1">Duration of the scan in seconds.</p>
                    <p className="font-mono"><span className="text-blue-400">collect_training_data</span>: boolean <span className="text-gray-500 italic ml-2">Optional (default: false)</span></p>
                    <p className="text-gray-400 pl-4 mt-1">Whether to collect anonymized data for model improvement.</p>
                </div>

                <h4 className="text-xl font-semibold text-white pt-4">Example Request</h4>
                <CodeBlock language="python" code={`import requests
response = requests.post("http://localhost:5000/start_scan", json={
    "duration": 30,
    "collect_training_data": True
})
print(response.json())`} />

                <h4 className="text-xl font-semibold text-white pt-4">Example Response</h4>
                <CodeBlock language="json" code={`{
  "status": "scan_started",
  "duration": 30
}`} />
            </section>

             <section id="scan-status" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Get Scan Status</h2>
                <p>Retrieves the current status of the scanning process, including completion status and results.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/scan_status</span></div>
                <h4 className="text-xl font-semibold text-white pt-4">Example Response</h4>
                <CodeBlock language="json" code={`{
  "scanning": false,
  "complete": true,
  "results": {
    "timestamp": "2023-10-27T10:00:00",
    "physiological": {
      "heart_rate": 72,
      "blood_pressure": "120/80"
    },
    "biometric": {
      "height": 175,
      "weight": 70
    }
  }
}`} />
            </section>

            <section id="video-feed" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Video Feed Stream</h2>
                <p>Provides a real-time video stream from the camera for biometric scanning. Returns a multipart HTTP stream.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/video_feed</span></div>
                
                <h4 className="text-xl font-semibold text-white pt-4">Response</h4>
                <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="font-mono">Content-Type: <span className="text-blue-400">multipart/x-mixed-replace; boundary=frame</span></p>
                    <p className="text-gray-400 pl-4 mt-1">Returns a continuous stream of JPEG frames for real-time video display.</p>
                </div>

                <h4 className="text-xl font-semibold text-white pt-4">Usage Example</h4>
                <CodeBlock language="python" code={`# In HTML
<img src="/video_feed" alt="Camera Feed">

# Or with JavaScript fetch for processing
fetch('/video_feed')
  .then(response => {
    // Handle streaming response
  })`} />
            </section>

            <section id="submit-feedback" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Submit Feedback</h2>
                <p>Submits user feedback data for model improvement and reinforcement learning.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="POST" /><span className="font-mono text-white">/submit_feedback</span></div>

                <h4 className="text-xl font-semibold text-white pt-4">Request Body</h4>
                <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="text-gray-400 pl-4 mt-1">Accepts feedback data object with user corrections and preferences.</p>
                </div>

                <h4 className="text-xl font-semibold text-white pt-4">Example Request</h4>
                <CodeBlock language="python" code={`import requests
response = requests.post("http://localhost:5000/submit_feedback", json={
    "feedback_type": "correction",
    "data": {
        "heart_rate_correction": 75,
        "accuracy_rating": 4
    }
})
print(response.json())`} />
            </section>

            <section id="feedback-status" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Feedback Status</h2>
                <p>Gets the current status of feedback collection sessions.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/feedback_status</span></div>

                <h4 className="text-xl font-semibold text-white pt-4">Example Response</h4>
                <CodeBlock language="json" code={`{
  "has_active_session": true,
  "session_id": "rlhf_session_123456"
}`} />
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default APIDocsPage;