import { useEffect, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useMission } from "../../src/contexts/MissionContext";
import SensorCard from "../../src/components/SensorCard";
import GaugeBar from "../../src/components/GaugeBar";
import StatusIndicator from "../../src/components/StatusIndicator";
import { globalStyles, COLORS } from "../../src/styles/theme";
import { styles } from "./DashboardScreen.styles";

const getSensorStatus = (type: string, value: number) => {
  switch (type) {
    case "temperature":
      return value > 35 || value < -10
        ? "critical"
        : value > 28
          ? "warning"
          : "normal";
    case "oxygen":
      return value < 18 ? "critical" : value < 19.5 ? "warning" : "normal";
    case "radiation":
      return value > 2 ? "critical" : value > 1.5 ? "warning" : "normal";
    case "pressure":
      return value < 95 || value > 110 ? "warning" : "normal";
    default:
      return "normal";
  }
};

export default function DashboardScreen() {
  const { state } = useMission();
  const { sensors, energy, communication, orbital, config, lastUpdated } =
    state;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [lastUpdated]);

  const unacknowledgedCount = state.alerts.filter(
    (a) => !a.acknowledged,
  ).length;

  return (
    <ScrollView
      style={globalStyles.screen}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.missionName}>{config.missionName}</Text>
        <Text style={styles.subtitle}>CENTRAL DE CONTROLE</Text>
        <View style={styles.headerRow}>
          <StatusIndicator
            connected={communication.connected}
            signalStrength={communication.signalStrength}
          />
          <Animated.Text style={[styles.ticker, { opacity: pulseAnim }]}>
            ● LIVE
          </Animated.Text>
        </View>
        {unacknowledgedCount > 0 && (
          <View style={styles.alertBanner}>
            <Text style={styles.alertBannerText}>
              {unacknowledgedCount} ALERTAS NÃO CONFIRMADOS
              {unacknowledgedCount > 1 ? "S" : ""}
            </Text>
          </View>
        )}
      </View>

      {/* Sensors */}
      <Text style={globalStyles.cardTitle}>Dados dos Sensores</Text>
      <View style={styles.grid}>
        <SensorCard
          label="Temperatura"
          value={sensors.temperature}
          unit="°C"
          status={getSensorStatus("temperature", sensors.temperature)}
        />
        <SensorCard
          label="Pressão"
          value={sensors.pressure}
          unit="hPa"
          status={getSensorStatus("pressure", sensors.pressure)}
        />
      </View>
      <View style={styles.grid}>
        <SensorCard
          label="Radiação"
          value={sensors.radiation}
          unit="mSv/h"
          status={getSensorStatus("radiation", sensors.radiation)}
        />
        <SensorCard
          label="Oxigênio"
          value={sensors.oxygen}
          unit="%"
          status={getSensorStatus("oxygen", sensors.oxygen)}
        />
      </View>

      {/* Energy */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>Sistema de Energia</Text>
        <GaugeBar
          value={energy.batteryLevel}
          label="Nível da Bateria"
          color={COLORS.green}
        />
        <View style={globalStyles.row}>
          <View>
            <Text style={globalStyles.label}>Geração</Text>
            <Text style={globalStyles.value}>
              {energy.solarPanelOutput.toFixed(0)} W
            </Text>
          </View>
          <View>
            <Text style={globalStyles.label}>Consumo</Text>
            <Text style={globalStyles.value}>
              {energy.consumption.toFixed(0)} W
            </Text>
          </View>
          <View>
            <Text style={globalStyles.label}>Ganho</Text>
            <Text
              style={[
                globalStyles.value,
                {
                  color:
                    energy.solarPanelOutput - energy.consumption >= 0
                      ? COLORS.green
                      : COLORS.red,
                },
              ]}
            >
              {(energy.solarPanelOutput - energy.consumption).toFixed(0)} W
            </Text>
          </View>
        </View>
      </View>

      {/* Communication */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>Comunicação</Text>
        <View style={[globalStyles.row, { marginBottom: 10 }]}>
          <Text style={globalStyles.label}>Status</Text>
          <StatusIndicator
            connected={communication.connected}
            signalStrength={communication.signalStrength}
          />
        </View>
        <View style={globalStyles.row}>
          <View>
            <Text style={globalStyles.label}>Sinal</Text>
            <Text style={globalStyles.value}>
              {communication.signalStrength.toFixed(0)} dBm
            </Text>
          </View>
          <View>
            <Text style={globalStyles.label}>Latência</Text>
            <Text style={globalStyles.value}>
              {communication.latency.toFixed(0)} ms
            </Text>
          </View>
          <View>
            <Text style={globalStyles.label}>Transferência</Text>
            <Text style={globalStyles.value}>
              {communication.dataRate.toFixed(0)} kbps
            </Text>
          </View>
        </View>
      </View>

      {/* Orbital Stability */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.cardTitle}>Estabilidade Orbital</Text>
        <View style={styles.orbitGrid}>
          <View style={styles.orbitItem}>
            <Text style={globalStyles.label}>Altitude</Text>
            <Text
              style={[
                globalStyles.value,
                { color: orbital.altitude < 200 ? COLORS.red : COLORS.accent },
              ]}
            >
              {orbital.altitude.toFixed(1)} km
            </Text>
          </View>
          <View style={styles.orbitItem}>
            <Text style={globalStyles.label}>Velocidade</Text>
            <Text style={globalStyles.value}>
              {orbital.velocity.toFixed(2)} km/s
            </Text>
          </View>
          <View style={styles.orbitItem}>
            <Text style={globalStyles.label}>Inclinação</Text>
            <Text style={globalStyles.value}>
              {orbital.inclination.toFixed(1)}°
            </Text>
          </View>
          <View style={styles.orbitItem}>
            <Text style={globalStyles.label}>Período</Text>
            <Text style={globalStyles.value}>
              {orbital.period.toFixed(1)} min
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Comandante: {config.commanderName} · Tripulação: {config.crewCount}
        {"\n"}
        Última atualização: {new Date(lastUpdated).toLocaleTimeString()}
      </Text>
    </ScrollView>
  );
}
