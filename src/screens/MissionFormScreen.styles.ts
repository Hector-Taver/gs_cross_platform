import { StyleSheet } from "react-native";
import { COLORS } from "../../src/styles/theme";

export const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 20,
    paddingTop: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.accent,
    fontSize: 11,
    letterSpacing: 4,
  },
  successBanner: {
    backgroundColor: COLORS.greenDim,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  successText: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  orbitGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  orbitBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.surfaceAlt,
  },
  orbitBtnActive: {
    backgroundColor: COLORS.accentDim,
    borderColor: COLORS.accent,
  },
  orbitText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },
  orbitTextActive: {
    color: COLORS.accent,
  },
});
