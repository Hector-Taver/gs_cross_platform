import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useMission } from "../../src/contexts/MissionContext";
import { COLORS } from "../../src/styles/theme";
import { styles } from "../styles";

function CustomTabBar({ state, navigation }: any) {
  const { state: missionState } = useMission();
  const alertCount = missionState.alerts.filter((a) => !a.acknowledged).length;

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const labels: Record<string, string> = {
          index: "DASHBOARD",
          alerts: "ALERTAS",
          mission: "CONFIG",
        };
        const label = labels[route.name] ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tabButton, isFocused && styles.tabButtonFocused]}
            onPress={onPress}
            activeOpacity={0.8}
          >
            <View style={styles.labelRow}>
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
              >
                {label}
              </Text>
              {route.name === "alerts" && alertCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {alertCount > 9 ? "9+" : alertCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.accent,
        headerTitleStyle: { fontWeight: "700", letterSpacing: 2 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "CONTROLE DA MISSÃO" }} />
      <Tabs.Screen name="alerts" options={{ title: "CENTRAL DE ALERTA" }} />
      <Tabs.Screen name="mission" options={{ title: "CONFIGURAÇÃO DA MISSÃO" }} />
    </Tabs>
  );
}
