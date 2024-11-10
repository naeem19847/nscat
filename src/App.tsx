import React, { useState } from 'react';
import { Activity, FileText, Shield, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';
import Auditing from './components/Auditing';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'auditing'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Network Security Configuration Audit Tool (NSCAT)</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Monitoring
                </button>
                <button
                  onClick={() => setActiveTab('auditing')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'auditing'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Auditing
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'reports'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Reporting
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-2">Network Security Configuration Audit Tool</h1>
          <p className="text-indigo-100 text-lg">
            An AI-based Tool to conduct realtime audit of security configurations of Network Devices
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-indigo-800 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">Real-time Monitoring</div>
              <p className="text-indigo-200">Continuous security assessment of network devices</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">AI-Powered Analysis</div>
              <p className="text-indigo-200">Intelligent security configuration auditing</p>
            </div>
            <div className="bg-indigo-800 rounded-lg p-4 flex-1">
              <div className="text-2xl font-bold mb-1">Comprehensive Reports</div>
              <p className="text-indigo-200">Detailed security compliance insights</p>
            </div>
          </div>
        </div>
      </div>

      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'auditing' && <Auditing />}
        {activeTab === 'reports' && <Reports />}
      </main>
    </div>
  );
}

export default App;