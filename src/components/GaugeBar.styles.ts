import { StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  percent: {
    fontSize: 12,
    fontWeight: "700",
  },
  track: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: 8,
    borderRadius: 4,
  },
});
