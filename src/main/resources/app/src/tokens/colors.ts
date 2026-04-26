export const tripilotsColors = {
  primary: {
    navy: "#000835",
    gold: "#D4AF37",
    teal: "#0A7E8C",
  },
  secondary: {
    coral: "#EB666E",
    sand: "#F5E6D3",
    slate: "#6B7280",
  },
  neutral: {
    white: "#FFFFFF",
    light: "#F9FAFB",
    medium: "#E5E7EB",
    dark: "#1F2937",
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
} as const;

export const tripilotsColorGroups = [
  {
    name: "Primary",
    values: tripilotsColors.primary,
  },
  {
    name: "Secondary",
    values: tripilotsColors.secondary,
  },
  {
    name: "Neutral",
    values: tripilotsColors.neutral,
  },
  {
    name: "Status",
    values: tripilotsColors.status,
  },
] as const;
