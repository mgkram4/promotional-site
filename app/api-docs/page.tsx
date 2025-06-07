'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Footer } from '../components/footer';
import { Navigation } from '../components/navigation';

// Intro Card Component
interface IntroCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  href: string;
}

const IntroCard: React.FC<IntroCardProps> = ({ icon, title, description, index, href }) => {
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
      className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500 transition-all duration-300"
      style={{
        transform: `rotate(${isVisible ? 0 : -5}deg)`,
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s ease-out ${index * 0.1}s`
      }}
    >
      <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-6xl">
        {icon}
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 mb-6">{description}</p>
        <a href={href} className="px-6 py-3 border-2 border-blue-500 rounded-full hover:bg-blue-500 transition-all">
          Jump to section
        </a>
      </div>
    </div>
  );
};

// Docs Intro Section
const DocsIntroSection: React.FC = () => {
    const introTopics = [
      { icon: '🚀', title: 'Getting Started', description: 'Your first steps to integrate with our API. Find out how to authenticate and make your first call.', href: '#run-complete-scan' },
      { icon: '📚', title: 'API Reference', description: 'A detailed reference for all available API endpoints, parameters, and responses.', href: '#status' },
      { icon: '⚙️', title: 'Example Workflows', description: 'See how to combine API calls to build complete features and workflows.', href: '#search-scans' },
    ];
  
    return (
      <section 
        id="docs-intro" 
        className="relative py-20 bg-black"
      >
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            Introduction to the Docs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {introTopics.map((topic, index) => (
              <IntroCard key={index} {...topic} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  };

const APIDocsPage = () => {
    const curl_run_scan = `curl -X POST http://localhost:8000/run_complete_scan -H "Content-Type: application/json" -d '{\n    "user_id": "USER-0001",\n    "user_name": "Jane Doe"\n}'`;
    const curl_search_scans = `curl "http://localhost:8000/search_scans?user_id=USER-0001"`;
    const curl_delete_scan = `curl -X DELETE "http://localhost:8000/delete_scan?filename=full_scan_20231027_100500.json"`;

  return (
    <div className="bg-black text-gray-200 font-sans leading-relaxed">
      <Navigation />
      <main>
        <section 
            className="relative py-20 flex items-center justify-center text-center bg-cover bg-center"
            style={{ backgroundImage: "url('/header.png')" }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">API Documentation</h1>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    The official guide to integrating with the Perfect Pose biometric analysis system.
                </p>
                <button className="px-8 py-4 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-all text-white">
                    Get API Key
                </button>
            </div>
        </section>

        <DocsIntroSection />

        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <section id="overview" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Overview</h2>
                <p>The Perfect Pose API provides a set of endpoints to initiate biometric scans, manage users, and retrieve results. The API is built with FastAPI and follows RESTful principles. All responses are in JSON format.</p>
            </section>

            <section id="status" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">API Status</h2>
                <p className="mb-4">Checks the current status of the API and any ongoing scans.</p>
                <p className="mb-4"><span className="inline-block bg-gray-800 rounded-md px-4 py-2 font-mono border border-gray-600"><span className="font-bold text-cyan-400 mr-4">GET</span> /api/status</span></p>
                <p className="mb-2 font-semibold">Example Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{`{
        "message": "Perfect Pose API is running",
        "status": {
            "active": false,
            "step": null,
            "progress": 0
        }
    }`}</code></pre>
            </section>

            <section id="run-complete-scan" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Run Complete Scan</h2>
                <p className="mb-4">Initiates a full biometric scan, including face and body analysis. This is the primary endpoint for starting a new analysis.</p>
                <p className="mb-4"><span className="inline-block bg-gray-800 rounded-md px-4 py-2 font-mono border border-gray-600"><span className="font-bold text-cyan-400 mr-4">POST</span> /run_complete_scan</span></p>
                <p className="mb-2 font-semibold">Request Body (JSON):</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse my-4">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border border-gray-700 p-3 text-left">Key</th>
                                <th className="border border-gray-700 p-3 text-left">Type</th>
                                <th className="border border-gray-700 p-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-700 p-3 font-mono">user_id</td>
                                <td className="border border-gray-700 p-3 font-mono">string</td>
                                <td className="border border-gray-700 p-3">Optional. An existing user ID. If not provided, a new sequential ID will be generated.</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-700 p-3 font-mono">user_name</td>
                                <td className="border border-gray-700 p-3 font-mono">string</td>
                                <td className="border border-gray-700 p-3">Optional. The name of the user.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mb-2 font-semibold">Example Request:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{curl_run_scan}</code></pre>
                <p className="mt-4 mb-2 font-semibold">Example Success Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{`{
        "message": "Complete scan process started in the background.",
        "status": {
            "active": true,
            "step": "main_process",
            "progress": 0,
            "user_id": "USER-0001"
        },
        "user_id": "USER-0001"
    }`}</code></pre>
            </section>

            <section id="get-latest-results" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Get Latest Results</h2>
                <p className="mb-4">Retrieves the most recently generated scan result from the <code className="font-mono text-sm bg-gray-700 p-1 rounded">results</code> directory. Useful for fetching the outcome of a completed scan.</p>
                <p className="mb-4"><span className="inline-block bg-gray-800 rounded-md px-4 py-2 font-mono border border-gray-600"><span className="font-bold text-cyan-400 mr-4">GET</span> /get_latest_results</span></p>
                 <p className="mb-2 font-semibold">Example Success Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{`{
        "timestamp": "2023-10-27T10:00:00",
        "physiological": { ... },
        "biometric": { ... }
    }`}</code></pre>
                <p className="mt-4 mb-2 font-semibold">Example Error Response (No files found):</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{`{
        "detail": "No scan results found."
    }`}</code></pre>
            </section>

            <section id="search-scans" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Search Scans by User ID</h2>
                <p className="mb-4">Finds all saved scan records associated with a specific user ID.</p>
                <p className="mb-4"><span className="inline-block bg-gray-800 rounded-md px-4 py-2 font-mono border border-gray-600"><span className="font-bold text-cyan-400 mr-4">GET</span> /search_scans</span></p>
                <p className="mb-2 font-semibold">Query Parameters:</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse my-4">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border border-gray-700 p-3 text-left">Key</th>
                                <th className="border border-gray-700 p-3 text-left">Type</th>
                                <th className="border border-gray-700 p-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-700 p-3 font-mono">user_id</td>
                                <td className="border border-gray-700 p-3 font-mono">string</td>
                                <td className="border border-gray-700 p-3"><strong className="font-semibold">Required.</strong> The ID of the user to search for.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mb-2 font-semibold">Example Request:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{curl_search_scans}</code></pre>
                <p className="mt-4 mb-2 font-semibold">Example Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{`[
        {
            "id": 1,
            "user_id": "USER-0001",
            "file_path": "results/full_scan_20231027_100500.json",
            "scan_type": "full",
            "created_at": "2023-10-27T10:05:00.123456"
        }
    ]`}</code></pre>
            </section>
            
            <section id="delete-scan" className="mb-12 p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Delete Scan</h2>
                <p className="mb-4">Deletes a specific scan result file and its corresponding record from the database.</p>
                <p className="mb-4"><span className="inline-block bg-gray-800 rounded-md px-4 py-2 font-mono border border-gray-600"><span className="font-bold text-red-400 mr-4">DELETE</span> /delete_scan</span></p>
                <p className="mb-2 font-semibold">Query Parameters:</p>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse my-4">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="border border-gray-700 p-3 text-left">Key</th>
                                <th className="border border-gray-700 p-3 text-left">Type</th>
                                <th className="border border-gray-700 p-3 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-700 p-3 font-mono">filename</td>
                                <td className="border border-gray-700 p-3 font-mono">string</td>
                                <td className="border border-gray-700 p-3"><strong className="font-semibold">Required.</strong> The name of the scan file to delete (e.g., &quot;full_scan_20231027_100500.json&quot;).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mb-2 font-semibold">Example Request:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x-auto"><code className="whitespace-pre-wrap break-words font-mono">{curl_delete_scan}</code></pre>
                <p className="mt-4 mb-2 font-semibold">Example Success Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md border border-gray-600 overflow-x--auto"><code className="whitespace-pre-wrap break-words font-mono">{`{
        "message": "Scan 'full_scan_20231027_100500.json' deleted successfully"
    }`}</code></pre>
            </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIDocsPage;