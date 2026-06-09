import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { MissionState, Alert, MissionConfig } from "../types/mission";
import { saveMissionState, loadMissionState } from "../services/storageService";

// Default State
const defaultState: MissionState = {
  sensors: {
    temperature: 21.5,
    pressure: 101.3,
    radiation: 0.8,
    oxygen: 20.9,
  },
  energy: {
    solarPanelOutput: 4500,
    batteryLevel: 87,
    consumption: 3200,
  },
  communication: {
    signalStrength: -72,
    latency: 240,
    dataRate: 512,
    connected: true,
  },
  orbital: {
    altitude: 408,
    velocity: 7.66,
    inclination: 51.6,
    period: 92.9,
  },
  alerts: [],
  config: {
    missionName: "Apollo X",
    commanderName: "Hector Taver",
    launchDate: "2026-06-01",
    targetOrbit: "LEO",
    crewCount: 3,
  },
  lastUpdated: new Date().toISOString(),
};

// Action Types
type Action =
  | { type: "UPDATE_SENSORS"; payload: Partial<MissionState["sensors"]> }
  | { type: "UPDATE_ENERGY"; payload: Partial<MissionState["energy"]> }
  | {
      type: "UPDATE_COMMUNICATION";
      payload: Partial<MissionState["communication"]>;
    }
  | { type: "UPDATE_ORBITAL"; payload: Partial<MissionState["orbital"]> }
  | { type: "ADD_ALERT"; payload: Alert }
  | { type: "ACKNOWLEDGE_ALERT"; payload: string }
  | { type: "CLEAR_ALERTS" }
  | { type: "UPDATE_CONFIG"; payload: MissionConfig }
  | { type: "LOAD_STATE"; payload: MissionState }
  | { type: "SIMULATE_TICK" };

// Helpers
const randomVariation = (base: number, range: number) =>
  parseFloat((base + (Math.random() - 0.5) * range).toFixed(2));

const generateId = () => Math.random().toString(36).substring(2, 10);

const checkAlerts = (state: MissionState): Alert[] => {
  const newAlerts: Alert[] = [];
  const now = new Date().toISOString();

  if (state.sensors.temperature > 35 || state.sensors.temperature < -10)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: `⚠️ Temperatura crítica: ${state.sensors.temperature}°C`,
      timestamp: now,
      acknowledged: false,
    });

  if (state.sensors.oxygen < 18)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: `⚠️ Níveis de oxigênio baixo: ${state.sensors.oxygen}%`,
      timestamp: now,
      acknowledged: false,
    });

  if (state.sensors.radiation > 2)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: `⚠️ Radiação alta detectada: ${state.sensors.radiation} mSv/h`,
      timestamp: now,
      acknowledged: false,
    });

  if (state.energy.batteryLevel < 20)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: `⚠️ Bateria muito baixa: ${state.energy.batteryLevel}%`,
      timestamp: now,
      acknowledged: false,
    });

  if (state.energy.batteryLevel < 40 && state.energy.batteryLevel >= 20)
    newAlerts.push({
      id: generateId(),
      type: "aviso",
      message: `⚠️ Bateria baixa: ${state.energy.batteryLevel}%`,
      timestamp: now,
      acknowledged: false,
    });

  if (!state.communication.connected)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: "⚠️ Link de comunicação perdido!",
      timestamp: now,
      acknowledged: false,
    });

  if (state.communication.signalStrength < -90)
    newAlerts.push({
      id: generateId(),
      type: "aviso",
      message: `⚠️ Sinal fraco: ${state.communication.signalStrength} dBm`,
      timestamp: now,
      acknowledged: false,
    });

  if (state.orbital.altitude < 200)
    newAlerts.push({
      id: generateId(),
      type: "critico",
      message: `⚠️ Altitude Orbital crítica: ${state.orbital.altitude} km`,
      timestamp: now,
      acknowledged: false,
    });

  return newAlerts;
};

// Reducer
const missionReducer = (state: MissionState, action: Action): MissionState => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;

    case "UPDATE_SENSORS": {
      const updated = {
        ...state,
        sensors: { ...state.sensors, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      const newAlerts = checkAlerts(updated);
      return { ...updated, alerts: [...state.alerts, ...newAlerts] };
    }

    case "UPDATE_ENERGY": {
      const updated = {
        ...state,
        energy: { ...state.energy, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      const newAlerts = checkAlerts(updated);
      return { ...updated, alerts: [...state.alerts, ...newAlerts] };
    }

    case "UPDATE_COMMUNICATION": {
      const updated = {
        ...state,
        communication: { ...state.communication, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      const newAlerts = checkAlerts(updated);
      return { ...updated, alerts: [...state.alerts, ...newAlerts] };
    }

    case "UPDATE_ORBITAL": {
      const updated = {
        ...state,
        orbital: { ...state.orbital, ...action.payload },
        lastUpdated: new Date().toISOString(),
      };
      const newAlerts = checkAlerts(updated);
      return { ...updated, alerts: [...state.alerts, ...newAlerts] };
    }

    case "ADD_ALERT":
      return { ...state, alerts: [action.payload, ...state.alerts] };

    case "ACKNOWLEDGE_ALERT":
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload ? { ...a, acknowledged: true } : a,
        ),
      };

    case "CLEAR_ALERTS":
      return { ...state, alerts: [] };

    case "UPDATE_CONFIG":
      return {
        ...state,
        config: action.payload,
        lastUpdated: new Date().toISOString(),
      };

    case "SIMULATE_TICK": {
      const updated: MissionState = {
        ...state,
        sensors: {
          temperature: randomVariation(state.sensors.temperature, 2),
          pressure: randomVariation(state.sensors.pressure, 1),
          radiation: randomVariation(state.sensors.radiation, 0.3),
          oxygen: randomVariation(state.sensors.oxygen, 0.5),
        },
        energy: {
          solarPanelOutput: randomVariation(state.energy.solarPanelOutput, 100),
          batteryLevel: Math.min(
            100,
            Math.max(0, randomVariation(state.energy.batteryLevel, 1)),
          ),
          consumption: randomVariation(state.energy.consumption, 80),
        },
        communication: {
          ...state.communication,
          signalStrength: randomVariation(
            state.communication.signalStrength,
            5,
          ),
          latency: randomVariation(state.communication.latency, 20),
          dataRate: randomVariation(state.communication.dataRate, 30),
        },
        orbital: {
          altitude: randomVariation(state.orbital.altitude, 2),
          velocity: randomVariation(state.orbital.velocity, 0.05),
          inclination: randomVariation(state.orbital.inclination, 0.1),
          period: randomVariation(state.orbital.period, 0.2),
        },
        lastUpdated: new Date().toISOString(),
      };
      const newAlerts = checkAlerts(updated);
      return {
        ...updated,
        alerts: [...state.alerts, ...newAlerts].slice(0, 50),
      };
    }

    default:
      return state;
  }
};

// Context
interface MissionContextType {
  state: MissionState;
  dispatch: React.Dispatch<Action>;
  acknowledgeAlert: (id: string) => void;
  clearAlerts: () => void;
  updateConfig: (config: MissionConfig) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(missionReducer, defaultState);

  // Load persisted state on mount
  useEffect(() => {
    (async () => {
      const saved = await loadMissionState();
      if (saved) dispatch({ type: "LOAD_STATE", payload: saved });
    })();
  }, []);

  // Simulate live sensor ticks every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "SIMULATE_TICK" });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Persist state changes
  useEffect(() => {
    saveMissionState(state);
  }, [state]);

  const acknowledgeAlert = useCallback((id: string) => {
    dispatch({ type: "ACKNOWLEDGE_ALERT", payload: id });
  }, []);

  const clearAlerts = useCallback(() => {
    dispatch({ type: "CLEAR_ALERTS" });
  }, []);

  const updateConfig = useCallback((config: MissionConfig) => {
    dispatch({ type: "UPDATE_CONFIG", payload: config });
  }, []);

  return (
    <MissionContext.Provider
      value={{ state, dispatch, acknowledgeAlert, clearAlerts, updateConfig }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = (): MissionContextType => {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMission must be used within MissionProvider");
  return ctx;
};
