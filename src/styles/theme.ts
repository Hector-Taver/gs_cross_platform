import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#020B18",
  surface: "#061427",
  surfaceAlt: "#0A1F35",
  border: "#0D3B6E",
  accent: "#00D4FF",
  accentDim: "#005F73",
  green: "#00FF88",
  greenDim: "#00663A",
  yellow: "#FFD60A",
  yellowDim: "#665700",
  red: "#FF3B3B",
  redDim: "#660000",
  textPrimary: "#E0F2FE",
  textSecondary: "#94A3B8",
  textMuted: "#475569",
  white: "#FFFFFF",
};

export const FONTS = {
  title: 22,
  subtitle: 18,
  body: 14,
  small: 12,
  tiny: 10,
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.accent,
    fontSize: FONTS.subtitle,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: FONTS.small,
    letterSpacing: 0.5,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: FONTS.body,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: FONTS.body,
    marginBottom: 4,
  },
  inputFocused: {
    borderColor: COLORS.accent,
  },
  inputError: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: FONTS.tiny,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: "700",
    fontSize: FONTS.body,
    letterSpacing: 1,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonOutlineText: {
    color: COLORS.accent,
    fontWeight: "600",
    fontSize: FONTS.body,
  },
  headerTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.title,
    fontWeight: "800",
    letterSpacing: 2,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: FONTS.tiny,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
});
