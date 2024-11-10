import React, { useState } from 'react';
import { Shield, Activity, Search, Server } from 'lucide-react';
import { Device, DeviceType, DeviceUpdate } from '../types';
import { devices } from '../data/mockData';
import EditableField from './EditableField';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<DeviceType | 'all'>('all');
  const [complianceFilter, setComplianceFilter] = useState<number | 'all'>('all');
  const [devicesList, setDevicesList] = useState<Device[]>(devices);

  const filteredDevices = devicesList.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm);
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    const matchesCompliance = complianceFilter === 'all' || device.complianceScore >= Number(complianceFilter);
    return matchesSearch && matchesType && matchesCompliance;
  });

  const handleDeviceUpdate = (deviceId: string, update: DeviceUpdate) => {
    setDevicesList(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? { ...device, ...update }
          : device
      )
    );
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getDeviceIcon = (type: DeviceType) => {
    return type === 'switch' ? <Server className="w-5 h-5" /> : <Shield className="w-5 h-5" />;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-8 h-8 text-indigo-600" />
          Monitoring
        </h1>
        <p className="mt-2 text-gray-600">Real-time security configuration monitoring</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as DeviceType | 'all')}
          >
            <option value="all">All Types</option>
            <option value="switch">Switches</option>
            <option value="firewall">Firewalls</option>
          </select>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={complianceFilter}
            onChange={(e) => setComplianceFilter(e.target.value as number | 'all')}
          >
            <option value="all">All Compliance Levels</option>
            <option value="90">90%+ Compliant</option>
            <option value="80">80%+ Compliant</option>
            <option value="70">70%+ Compliant</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDeviceIcon(device.type)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <EditableField
                            value={device.name}
                            onChange={(value) => handleDeviceUpdate(device.id, { name: String(value) })}
                          />
                        </div>
                        <div className="text-sm text-gray-500">
                          <EditableField
                            value={device.vendor}
                            onChange={(value) => handleDeviceUpdate(device.id, { vendor: String(value) })}
                          />
                          {' '}
                          <EditableField
                            value={device.model}
                            onChange={(value) => handleDeviceUpdate(device.id, { model: String(value) })}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <EditableField
                      value={device.type}
                      onChange={(value) => handleDeviceUpdate(device.id, { type: value as DeviceType })}
                      type="select"
                      options={['switch', 'firewall']}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <EditableField
                      value={device.ip}
                      onChange={(value) => handleDeviceUpdate(device.id, { ip: String(value) })}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <EditableField
                      value={device.location}
                      onChange={(value) => handleDeviceUpdate(device.id, { location: String(value) })}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getComplianceColor(device.complianceScore)}`}>
                      {device.complianceScore}% Compliant
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;