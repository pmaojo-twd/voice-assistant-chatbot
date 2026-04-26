export const tripilotsTypography = {
  font: {
    display: "'Alexandria', serif",
    body: "'Poppins', sans-serif",
    mono: "'Courier New', monospace",
  },
  sizes: {
    h1: { size: "48px", weight: 700, lineHeight: "56px", spacing: "-1.6px" },
    h2: { size: "36px", weight: 700, lineHeight: "44px", spacing: "-1.2px" },
    h3: { size: "28px", weight: 600, lineHeight: "36px", spacing: "-0.8px" },
    h4: { size: "24px", weight: 600, lineHeight: "32px", spacing: "-0.4px" },
    body: { size: "16px", weight: 400, lineHeight: "24px", spacing: "0px" },
    bodySm: { size: "14px", weight: 400, lineHeight: "20px", spacing: "0px" },
    label: { size: "12px", weight: 600, lineHeight: "16px", spacing: "0.5px" },
    caption: { size: "11px", weight: 400, lineHeight: "14px", spacing: "0px" },
  },
} as const;

export const tripilotsTypeScale = [
  { name: "H1", ...tripilotsTypography.sizes.h1 },
  { name: "H2", ...tripilotsTypography.sizes.h2 },
  { name: "H3", ...tripilotsTypography.sizes.h3 },
  { name: "H4", ...tripilotsTypography.sizes.h4 },
  { name: "Body", ...tripilotsTypography.sizes.body },
  { name: "Body Small", ...tripilotsTypography.sizes.bodySm },
  { name: "Label", ...tripilotsTypography.sizes.label },
  { name: "Caption", ...tripilotsTypography.sizes.caption },
] as const;
