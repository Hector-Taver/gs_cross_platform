import { StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export const alertTypeStyle = {
  critico: {
    border: COLORS.red,
    bg: "#1A0000",
    badge: COLORS.red,
  },
  aviso: {
    border: COLORS.yellow,
    bg: "#1A1400",
    badge: COLORS.yellow,
  },
  info: {
    border: COLORS.accent,
    bg: "#001A20",
    badge: COLORS.accent,
  },
};

export const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    marginRight: 10,
  },
  textBlock: {
    flex: 1,
  },
  message: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },
  acknowledged: {
    color: COLORS.textMuted,
  },
  time: {
    color: COLORS.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  ackBtn: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  ackText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  ackdLabel: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "700",
  },
});
