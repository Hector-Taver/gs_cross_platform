import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../styles/theme";
import { styles } from "./SensorCard.styles";

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  status?: "normal" | "warning" | "critical";
}

const statusColor = {
  normal: COLORS.green,
  warning: COLORS.yellow,
  critical: COLORS.red,
};

const SensorCard: React.FC<Props> = ({
  label,
  value,
  unit,
  status = "normal",
}) => {
  const color = statusColor[status];
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>
        {value}
        {unit ? <Text style={styles.unit}> {unit}</Text> : null}
      </Text>
    </View>
  );
};

export default SensorCard;
