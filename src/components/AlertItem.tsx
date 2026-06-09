import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Alert } from "../types/mission";
import { COLORS } from "../styles/theme";
import { styles, alertTypeStyle } from "./AlertItem.styles";

interface Props {
  alert: Alert;
  onAcknowledge: (id: string) => void;
}

const AlertItem: React.FC<Props> = ({ alert, onAcknowledge }) => {
  const style = alertTypeStyle[alert.type];
  const time = new Date(alert.timestamp).toLocaleTimeString();

  return (
    <View
      style={[
        styles.container,
        {
          borderLeftColor: style.border,
          backgroundColor: alert.acknowledged ? COLORS.surface : style.bg,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text
            style={[styles.message, alert.acknowledged && styles.acknowledged]}
          >
            {alert.message}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        {!alert.acknowledged && (
          <TouchableOpacity
            style={[styles.ackBtn, { borderColor: style.border }]}
            onPress={() => onAcknowledge(alert.id)}
          >
          </TouchableOpacity>
        )}
        {alert.acknowledged && <Text style={styles.ackdLabel}>✓</Text>}
      </View>
    </View>
  );
};

export default AlertItem;
