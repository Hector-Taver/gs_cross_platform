import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { COLORS } from "../styles/theme";
import { styles } from "./StatusIndicator.styles";

interface Props {
  connected: boolean;
  signalStrength: number;
}

const StatusIndicator: React.FC<Props> = ({ connected, signalStrength }) => {
  const blink = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!connected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blink, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blink, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      blink.setValue(1);
    }
  }, [connected]);

  const color = connected
    ? signalStrength > -80
      ? COLORS.green
      : COLORS.yellow
    : COLORS.red;

  return (
    <View style={styles.row}>
      <Animated.View
        style={[styles.dot, { backgroundColor: color, opacity: blink }]}
      />
      <Text style={[styles.label, { color }]}>
        {connected
          ? signalStrength > -80
            ? "NORMAL"
            : "SINAL FRACO"
          : "DESCONECTADO"}
      </Text>
    </View>
  );
};

export default StatusIndicator;
