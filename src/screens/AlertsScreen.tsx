import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useMission } from "../contexts/MissionContext";
import AlertItem from "../components/AlertItem";
import { styles } from "./AlertsScreen.styles";
import { globalStyles, COLORS } from "../styles/theme";


type FilterType = "todos" | "critico" | "aviso" | "info" | "não confirmado";

export default function AlertsScreen() {
  const { state, acknowledgeAlert, clearAlerts } = useMission();
  const [filter, setFilter] = useState<FilterType>("todos");

  const filters: FilterType[] = [
    "todos",
    "critico",
    "aviso",
    "info",
    "não confirmado",
  ];

  const filtered = state.alerts.filter((a) => {
    if (filter === "todos") return true;
    if (filter === "não confirmado") return !a.acknowledged;
    return a.type === filter;
  });

  const counts = {
    critical: state.alerts.filter(
      (a) => a.type === "critico" && !a.acknowledged,
    ).length,
    warning: state.alerts.filter((a) => a.type === "aviso" && !a.acknowledged)
      .length,
    total: state.alerts.filter((a) => !a.acknowledged).length,
  };

  return (
    <View style={globalStyles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ALERTAS</Text>
        <Text style={styles.subtitle}>CENTRAL DE ALERTAS</Text>
        <View style={styles.badgeRow}>
          {counts.critical > 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.red }]}>
              <Text style={styles.badgeText}>{counts.critical} CRÍTICO</Text>
            </View>
          )}
          {counts.warning > 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.yellow }]}>
              <Text style={[styles.badgeText, { color: COLORS.background }]}>
                {counts.warning} AVISO
              </Text>
            </View>
          )}
          {counts.total === 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.greenDim }]}>
              <Text style={[styles.badgeText, { color: COLORS.green }]}>
                ✓ TUDO OK
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alert List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>Sem alertas nesta categoria</Text>
          </View>
        ) : (
          filtered.map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onAcknowledge={acknowledgeAlert}
            />
          ))
        )}
      </ScrollView>

      {/* Action bar */}
      {state.alerts.length > 0 && (
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={[globalStyles.buttonOutline, styles.actionBtn]}
            onPress={() =>
              state.alerts.forEach(
                (a) => !a.acknowledged && acknowledgeAlert(a.id),
              )
            }
          >
            <Text style={globalStyles.buttonOutlineText}>CHECAR TODOS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.button,
              styles.actionBtn,
              {
                backgroundColor: COLORS.redDim,
                borderWidth: 1,
                borderColor: COLORS.red,
              },
            ]}
            onPress={clearAlerts}
          >
            <Text style={[globalStyles.buttonText, { color: COLORS.red }]}>
              LIMPAR
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
