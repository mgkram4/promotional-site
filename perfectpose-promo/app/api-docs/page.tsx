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
    id: 'status',
    title: 'API Status',
    method: 'GET',
    path: '/api/status',
  },
  {
    id: 'run-scan',
    title: 'Run Complete Scan',
    method: 'POST',
    path: '/run_complete_scan',
  },
  {
    id: 'get-results',
    title: 'Get Latest Results',
    method: 'GET',
    path: '/get_latest_results',
  },
  {
    id: 'search-scans',
    title: 'Search Scans',
    method: 'GET',
    path: '/search_scans',
  },
  {
    id: 'delete-scan',
    title: 'Delete Scan',
    method: 'DELETE',
    path: '/delete_scan',
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
                The official guide to integrating with the Perfect Pose biometric analysis system. Our API is designed to be simple, powerful, and private, running on a local server so your data never leaves your control.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10 flex gap-4 items-center"><FiZap className="w-8 h-8 text-blue-400" /><div><h4 className="font-bold text-white">Local First</h4><p className="text-sm">Incredibly fast and private. No cloud dependency.</p></div></div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10 flex gap-4 items-center"><FiTerminal className="w-8 h-8 text-green-400" /><div><h4 className="font-bold text-white">RESTful</h4><p className="text-sm">Standard HTTP methods and status codes.</p></div></div>
              </div>
            </div>

            <section id="status" className="scroll-mt-24 space-y-4 pt-20">
              <h2 className="text-3xl font-bold text-white">API Status</h2>
              <p>Checks the current status of the API, including whether a scan is currently active.</p>
              <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/api/status</span></div>
              <h4 className="text-xl font-semibold text-white pt-4">Example Response</h4>
              <CodeBlock language="json" code={`{
  "message": "Perfect Pose API is running",
  "status": {
    "active": false,
    "step": null,
    "progress": 0
  }
}`} />
            </section>

             <section id="run-scan" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Run Complete Scan</h2>
                <p>Initiates a full biometric scan. This is the primary endpoint for starting a new analysis.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="POST" /><span className="font-mono text-white">/run_complete_scan</span></div>
                
                <h4 className="text-xl font-semibold text-white pt-4">Request Body</h4>
                 <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="font-mono"><span className="text-blue-400">user_id</span>: string <span className="text-gray-500 italic ml-2">Optional</span></p>
                    <p className="text-gray-400 pl-4 mt-1">An existing user ID. If not provided, a new one is generated.</p>
                </div>

                <h4 className="text-xl font-semibold text-white pt-4">Example Request</h4>
                <CodeBlock language="python" code={`import requests
response = requests.post("http://localhost:8000/run_complete_scan", json={"user_id": "user-123"})
print(response.json())`} />
            </section>

             <section id="get-results" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Get Latest Results</h2>
                <p>Retrieves the most recent scan result file. Useful for fetching the outcome of a completed scan.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/get_latest_results</span></div>
                <h4 className="text-xl font-semibold text-white pt-4">Example Success Response</h4>
                <CodeBlock language="json" code={`{
  "timestamp": "2023-10-27T10:00:00",
  "physiological": { ... },
  "biometric": { ... }
}`} />
            </section>

            <section id="search-scans" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Search Scans</h2>
                <p>Finds all saved scan records for a specific user ID.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="GET" /><span className="font-mono text-white">/search_scans</span></div>
                
                <h4 className="text-xl font-semibold text-white pt-4">Query Parameters</h4>
                <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="font-mono"><span className="text-blue-400">user_id</span>: string <span className="text-gray-500 italic ml-2">Required</span></p>
                    <p className="text-gray-400 pl-4 mt-1">The ID of the user to search for.</p>
                </div>

                <h4 className="text-xl font-semibold text-white pt-4">Example Request</h4>
                <CodeBlock language="python" code={`import requests
response = requests.get("http://localhost:8000/search_scans", params={"user_id": "user-123"})
print(response.json())`} />
            </section>

            <section id="delete-scan" className="scroll-mt-24 space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">Delete Scan</h2>
                <p>Deletes a specific scan result file and its corresponding database record.</p>
                <div className="flex items-center gap-4 py-2"><MethodBadge method="DELETE" /><span className="font-mono text-white">/delete_scan</span></div>

                <h4 className="text-xl font-semibold text-white pt-4">Query Parameters</h4>
                <div className="text-sm p-4 rounded-lg bg-gray-900/70 border border-white/10">
                    <p className="font-mono"><span className="text-blue-400">filename</span>: string <span className="text-gray-500 italic ml-2">Required</span></p>
                    <p className="text-gray-400 pl-4 mt-1">The full filename of the scan to delete.</p>
                </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default APIDocsPage;