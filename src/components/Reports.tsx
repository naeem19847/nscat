import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { auditReports, devices } from '../data/mockData';

const Reports: React.FC = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-8 h-8 text-indigo-600" />
          NSCAT Reporting
        </h1>
        <p className="mt-2 text-gray-600">Detailed security configuration findings</p>
      </div>

      <div className="space-y-6">
        {Object.entries(auditReports).map(([deviceId, report]) => {
          const device = devices.find(d => d.id === deviceId);
          if (!device) return null;

          return (
            <div key={deviceId} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{device.name}</h2>
                  <p className="text-sm text-gray-500">
                    {device.type} | {device.ip} | Last Audit: {new Date(report.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{report.overallScore}% Compliant</div>
                  <div className="text-sm text-gray-500">Overall Compliance</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Findings</h3>
                <div className="space-y-4">
                  {report.findings.map((finding, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getSeverityIcon(finding.severity)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              finding.severity === 'critical' ? 'bg-red-100 text-red-800' :
                              finding.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                              finding.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {finding.severity.toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{finding.category}</span>
                          </div>
                          <p className="text-gray-900 mb-2">{finding.description}</p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Recommendation:</span> {finding.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reports;