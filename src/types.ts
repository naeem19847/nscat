export type DeviceType = 'switch' | 'firewall';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ip: string;
  complianceScore: number;
  lastAudit: string;
  status: 'online' | 'offline';
  vendor: string;
  model: string;
  location: string;
}

export interface DeviceUpdate {
  name?: string;
  type?: DeviceType;
  ip?: string;
  complianceScore?: number;
  vendor?: string;
  model?: string;
  location?: string;
}

export interface AuditReport {
  deviceId: string;
  timestamp: string;
  findings: AuditFinding[];
  overallScore: number;
}

export interface AuditFinding {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  description: string;
  recommendation: string;
}