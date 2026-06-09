import { StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 10,
    borderLeftWidth: 3,
    padding: 12,
    flex: 1,
    margin: 4,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  unit: {
    fontSize: 11,
    fontWeight: "400",
    color: COLORS.textSecondary,
  },
});
