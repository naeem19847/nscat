import React, { useState } from 'react';
import { Settings, Plus, Trash2, Play } from 'lucide-react';
import { AuditConfig, AuditRule, Device, DeviceType } from '../types';
import { devices } from '../data/mockData';

const defaultRules: Record<DeviceType, AuditRule[]> = {
  switch: [
    {
      id: '1',
      category: 'Access Control',
      check: 'Default VLAN Configuration',
      severity: 'high',
      expectedValue: 'no default vlan',
      weight: 8
    },
    {
      id: '2',
      category: 'Authentication',
      check: 'TACACS+ Configuration',
      severity: 'medium',
      expectedValue: 'tacacs+ enabled',
      weight: 6
    }
  ],
  firewall: [
    {
      id: '1',
      category: 'Security Policy',
      check: 'Default Deny Policy',
      severity: 'critical',
      expectedValue: 'default-deny',
      weight: 10
    },
    {
      id: '2',
      category: 'Logging',
      check: 'Syslog Configuration',
      severity: 'medium',
      expectedValue: 'syslog enabled',
      weight: 6
    }
  ]
};

const Auditing: React.FC = () => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [auditConfigs, setAuditConfigs] = useState<AuditConfig[]>([
    {
      id: '1',
      name: 'Switch Security Baseline',
      deviceType: 'switch',
      rules: [...defaultRules.switch]
    },
    {
      id: '2',
      name: 'Firewall Security Baseline',
      deviceType: 'firewall',
      rules: [...defaultRules.firewall]
    }
  ]);
  const [activeConfig, setActiveConfig] = useState<string>(auditConfigs[0].id);

  const handleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const addRule = (configId: string) => {
    setAuditConfigs(prev => prev.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          rules: [...config.rules, {
            id: Date.now().toString(),
            category: 'New Category',
            check: 'New Check',
            severity: 'medium',
            expectedValue: '',
            weight: 5
          }]
        };
      }
      return config;
    }));
  };

  const removeRule = (configId: string, ruleId: string) => {
    setAuditConfigs(prev => prev.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          rules: config.rules.filter(rule => rule.id !== ruleId)
        };
      }
      return config;
    }));
  };

  const updateRule = (configId: string, ruleId: string, updates: Partial<AuditRule>) => {
    setAuditConfigs(prev => prev.map(config => {
      if (config.id === configId) {
        return {
          ...config,
          rules: config.rules.map(rule =>
            rule.id === ruleId ? { ...rule, ...updates } : rule
          )
        };
      }
      return config;
    }));
  };

  const startAudit = () => {
    // Simulate starting an audit
    console.log('Starting audit for devices:', selectedDevices);
    alert('Audit started for selected devices. Check the Reports tab for results.');
  };

  const currentConfig = auditConfigs.find(config => config.id === activeConfig);
  const filteredDevices = devices.filter(device => device.type === currentConfig?.deviceType);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-8 h-8 text-indigo-600" />
          Security Audit Configuration
        </h1>
        <p className="mt-2 text-gray-600">Configure and run security audits for network devices</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Configurations */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Audit Rules</h2>
              <div className="flex gap-2">
                <select
                  value={activeConfig}
                  onChange={(e) => setActiveConfig(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {auditConfigs.map(config => (
                    <option key={config.id} value={config.id}>
                      {config.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => addRule(activeConfig)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {currentConfig?.rules.map(rule => (
                <div key={rule.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                          type="text"
                          value={rule.category}
                          onChange={(e) => updateRule(activeConfig, rule.id, { category: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Check</label>
                        <input
                          type="text"
                          value={rule.check}
                          onChange={(e) => updateRule(activeConfig, rule.id, { check: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expected Value</label>
                        <input
                          type="text"
                          value={rule.expectedValue}
                          onChange={(e) => updateRule(activeConfig, rule.id, { expectedValue: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Severity</label>
                          <select
                            value={rule.severity}
                            onChange={(e) => updateRule(activeConfig, rule.id, { severity: e.target.value as any })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Weight</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={rule.weight}
                            onChange={(e) => updateRule(activeConfig, rule.id, { weight: Number(e.target.value) })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeRule(activeConfig, rule.id)}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Selection */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Select Devices</h2>
              <button
                onClick={startAudit}
                disabled={selectedDevices.length === 0}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  selectedDevices.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Audit
              </button>
            </div>

            <div className="space-y-2">
              {filteredDevices.map(device => (
                <label key={device.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => handleDeviceSelection(device.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{device.name}</div>
                    <div className="text-sm text-gray-500">{device.ip}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auditing;