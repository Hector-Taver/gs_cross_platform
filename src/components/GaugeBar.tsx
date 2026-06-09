import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../styles/theme";
import { styles } from "./GaugeBar.styles";

interface Props {
  value: number;
  label: string;
  color?: string;
}

const GaugeBar: React.FC<Props> = ({ value, label, color = COLORS.accent }) => {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor =
    clamped < 20 ? COLORS.red : clamped < 40 ? COLORS.yellow : color;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.percent, { color: barColor }]}>
          {clamped.toFixed(0)}%
        </Text>
      </View>
      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${clamped}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
};

export default GaugeBar;
