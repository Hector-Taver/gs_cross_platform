import AsyncStorage from "@react-native-async-storage/async-storage";
import { MissionState } from "../types/mission";

const MISSION_STATE_KEY = "@mission_state";
const MISSION_CONFIG_KEY = "@mission_config";

export const saveMissionState = async (state: MissionState): Promise<void> => {
  try {
    await AsyncStorage.setItem(MISSION_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Erro ao salvar estado da missão:", error);
  }
};

export const loadMissionState = async (): Promise<MissionState | null> => {
  try {
    const json = await AsyncStorage.getItem(MISSION_STATE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Erro ao carregar estado da missão:", error);
    return null;
  }
};

export const clearMissionState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(MISSION_STATE_KEY);
    await AsyncStorage.removeItem(MISSION_CONFIG_KEY);
  } catch (error) {
    console.error("Erro ao limpar estado da missão:", error);
  }
};
