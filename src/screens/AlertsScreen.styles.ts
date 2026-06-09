import { StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";

export const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingBottom: 8,
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
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  filterBar: {
    maxHeight: 44,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filterContent: {
    gap: 8,
    alignItems: "center",
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterBtnActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  filterTextActive: {
    color: COLORS.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 8,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  actionBar: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    marginTop: 0,
  },
});
