import React, { useState } from 'react';
import { Activity, FileText, Shield } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">NetSec Config Audit Tool</span>
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

      <main>
        {activeTab === 'dashboard' ? <Dashboard /> : <Reports />}
      </main>
    </div>
  );
}

export default App;