import { StyleSheet } from "react-native";
import { COLORS } from "../../src/styles/theme";

export const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    paddingTop: 10,
  },
  missionName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.accent,
    fontSize: 11,
    letterSpacing: 4,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticker: {
    color: COLORS.red,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
  },
  alertBanner: {
    backgroundColor: "#330000",
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.red,
  },
  alertBannerText: {
    color: COLORS.red,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
  grid: {
    flexDirection: "row",
    marginBottom: 4,
  },
  orbitGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  orbitItem: {
    width: "50%",
    padding: 8,
  },
  footer: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },
});
