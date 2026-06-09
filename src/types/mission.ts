export interface SensorData {
  temperature: number; // °C
  pressure: number; // hPa
  radiation: number; // mSv/h
  oxygen: number; // %
}

export interface EnergyData {
  solarPanelOutput: number; // W
  batteryLevel: number; // %
  consumption: number; // W
}

export interface CommunicationData {
  signalStrength: number; // dBm
  latency: number; // ms
  dataRate: number; // kbps
  connected: boolean;
}

export interface OrbitalData {
  altitude: number; // km
  velocity: number; // km/s
  inclination: number; // degrees
  period: number; // minutes
}

export interface Alert {
  id: string;
  type: "critico" | "aviso" | "info";
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface MissionConfig {
  missionName: string;
  commanderName: string;
  launchDate: string;
  targetOrbit: string;
  crewCount: number;
}

export interface MissionState {
  sensors: SensorData;
  energy: EnergyData;
  communication: CommunicationData;
  orbital: OrbitalData;
  alerts: Alert[];
  config: MissionConfig;
  lastUpdated: string;
}
