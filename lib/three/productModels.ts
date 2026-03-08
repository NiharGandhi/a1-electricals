/**
 * STL URLs for 3D product models.
 * Replace placeholder paths with your actual STL file paths when ready.
 * Options: put files in /public/models/ and use e.g. "/models/cable-gland.stl"
 */
export const productStlUrls = {
  cableGland: "/placeholders/cable-gland.stl",
  cableLug: "/placeholders/cable-lug.stl",
  cableCleat: "/placeholders/cable-lug.stl", // reuse until you have cable-cleat.stl
  heatShrink: "/placeholders/cable-lug.stl", // reuse until you have heat-shrink.stl
} as const;

export type ProductModelKey = keyof typeof productStlUrls;

export const productLabels: Record<ProductModelKey, string> = {
  cableGland: "Cable Gland",
  cableLug: "Cable Lug",
  cableCleat: "Cable Cleat",
  heatShrink: "Heat Shrink",
};
