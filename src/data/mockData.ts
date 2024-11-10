import { Device, AuditReport } from '../types';

export const devices: Device[] = [
  {
    id: '1',
    name: 'Core-SW-01',
    type: 'switch',
    ip: '192.168.1.10',
    complianceScore: 92,
    lastAudit: '2024-03-10T14:30:00Z',
    status: 'online',
    vendor: 'Cisco',
    model: 'Catalyst 9300',
    location: 'Main DC'
  },
  {
    id: '2',
    name: 'Edge-FW-01',
    type: 'firewall',
    ip: '192.168.1.1',
    complianceScore: 88,
    lastAudit: '2024-03-10T14:30:00Z',
    status: 'online',
    vendor: 'Palo Alto',
    model: 'PA-3260',
    location: 'Main DC'
  },
  {
    id: '3',
    name: 'Dist-SW-02',
    type: 'switch',
    ip: '192.168.2.10',
    complianceScore: 78,
    lastAudit: '2024-03-10T14:15:00Z',
    status: 'online',
    vendor: 'Cisco',
    model: 'Catalyst 9200',
    location: 'Branch Office'
  },
  {
    id: '4',
    name: 'Branch-FW-01',
    type: 'firewall',
    ip: '192.168.2.1',
    complianceScore: 95,
    lastAudit: '2024-03-10T14:00:00Z',
    status: 'online',
    vendor: 'Fortinet',
    model: 'FortiGate 100F',
    location: 'Branch Office'
  }
];

export const auditReports: Record<string, AuditReport> = {
  '1': {
    deviceId: '1',
    timestamp: '2024-03-10T14:30:00Z',
    findings: [
      {
        severity: 'high',
        category: 'Access Control',
        description: 'Default VLAN 1 is still in use',
        recommendation: 'Create and use custom VLANs instead of default VLAN 1'
      },
      {
        severity: 'medium',
        category: 'Authentication',
        description: 'TACACS+ backup server not configured',
        recommendation: 'Configure secondary TACACS+ server for redundancy'
      }
    ],
    overallScore: 92
  }
};