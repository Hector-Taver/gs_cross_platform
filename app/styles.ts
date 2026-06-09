import { StyleSheet } from "react-native";
import { COLORS } from "../src/styles/theme";

export const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceAlt,
  },
  tabButtonFocused: {
    backgroundColor: COLORS.accentDim,
    borderColor: COLORS.accent,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.textMuted,
  },
  tabLabelFocused: {
    color: COLORS.accent,
  },
  badge: {
    backgroundColor: COLORS.red,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '700',
  },
});
