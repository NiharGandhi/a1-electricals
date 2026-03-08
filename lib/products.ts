/** Column definition for catalog specification tables */
export interface SpecTableColumn {
  key: string;
  label: string;
  unit?: string;
}

/** Tabular specification data from product catalog/datasheet */
export interface SpecificationTable {
  columns: SpecTableColumn[];
  rows: Record<string, string | number>[];
}

export interface Product {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  image: string;
  features: string[];
  specs?: string[];
  standards: string[];
  applications: string[];
  /** Optional catalog-style specification table (dimensions, part numbers, etc.) */
  specificationTable?: SpecificationTable;
}

export interface ProductCategory {
  slug: string;
  title: string;
  shortLabel: string;
  description: string;
  image: string;
  icon: string;
}

export const categories: ProductCategory[] = [
  {
    slug: "shear-bolt",
    title: "Shear Bolt Cable Lugs & Connectors",
    shortLabel: "Shear Bolt",
    description:
      "Mechanical, torque-controlled termination solutions for fast, reliable, and tool-independent installation.",
    image: "/category/shear-bolt.jpg",
    icon: "SB",
  },
  {
    slug: "ehv-power-clamps",
    title: "EHV Power Clamps & Connectors",
    shortLabel: "EHV Clamps",
    description:
      "Substation connectors for applications up to 550kV for busbars, switchyards, and power plants.",
    image: "/category/ehv-power-clamps.jpg",
    icon: "EHV",
  },
  {
    slug: "compression-lugs",
    title: "Compression Cable Lugs & Connectors",
    shortLabel: "Compression",
    description:
      "Copper, aluminium, and bimetallic cable lugs and connectors for reliable electrical termination.",
    image: "/category/compression-lugs.jpg",
    icon: "CL",
  },
  {
    slug: "cable-cleats",
    title: "Aluminium & Polyamide Cable Cleats",
    shortLabel: "Cable Cleats",
    description:
      "Cable cleats for secure cable management, designed for short-circuit withstand and long-term reliability.",
    image: "/category/cable-cleats.jpg",
    icon: "CC",
  },
  {
    slug: "terminations-joints",
    title: "Cable Terminations & Joints",
    shortLabel: "Terminations",
    description:
      "Heat shrink terminations, joints, tubings, and accessories for cable termination and jointing.",
    image: "/category/terminations-joints.jpg",
    icon: "TJ",
  },
  {
    slug: "cable-glands",
    title: "Industrial Brass Cable Glands",
    shortLabel: "Cable Glands",
    description:
      "Brass cable glands, wiping glands, and accessories for industrial ingress protection.",
    image: "/category/cable-glands.jpg",
    icon: "CG",
  },
  {
    slug: "busbar-braid",
    title: "Copper Bus Bar & Flexible Braid",
    shortLabel: "Bus Bar",
    description:
      "Flexible copper braids, laminated and solid busbars, earth rods, and tailor-made components.",
    image: "/category/busbar-braid.jpg",
    icon: "BB",
  },
];

export const products: Product[] = [
  // Shear Bolt
  {
    slug: "shear-bolt-lv-straight-connector",
    title: "Shear Bolt LV Straight Connector",
    category: "Shear Bolt Cable Lugs & Connectors",
    categorySlug: "shear-bolt",
    description:
      "For LV & MV applications with sector shape stranded or solid conductor. Manufactured from aluminium alloy with torque-calibrated shear-off bolts ensuring consistent contact pressure. Confirming to IEC 61238-1 requirements.",
    image: "/products/shear-bolts/lv-straight-connector.jpg",
    features: [
      "For sector shape stranded or solid conductor",
      "Aluminium alloy construction",
      "Confirming to IEC 61238-1 requirements",
    ],
    standards: ["IEC 61238-1"],
    applications: [
      "LV & MV distribution network",
      "Utility & EPC projects",
      "Transformer & switchgear terminations",
    ],
    specificationTable: {
      columns: [
        { key: "nominalSectionMin", label: "Nom X-Section Area min", unit: "mm²" },
        { key: "nominalSectionMax", label: "Nom X-Section Area max", unit: "mm²" },
        { key: "a", label: "a", unit: "mm" },
        { key: "b", label: "b", unit: "mm" },
        { key: "d3", label: "d3", unit: "mm" },
        { key: "af", label: "A/F", unit: "mm" },
        { key: "partNumber", label: "P/N" },
        { key: "unitsPerPack", label: "Units/Pack" },
      ],
      rows: [
        {
          nominalSectionMin: 50,
          nominalSectionMax: 95,
          a: 80.0,
          b: 25.0,
          d3: 25.0,
          af: 13.0,
          partNumber: "ASBLVIC 50-95",
          unitsPerPack: 4,
        },
        {
          nominalSectionMin: 95,
          nominalSectionMax: 185,
          a: 100.0,
          b: 34.0,
          d3: 32.5,
          af: 17.0,
          partNumber: "ASBLVIC 95-185",
          unitsPerPack: 4,
        },
        {
          nominalSectionMin: 185,
          nominalSectionMax: 300,
          a: 120.0,
          b: 40.0,
          d3: 41.0,
          af: 17.0,
          partNumber: "ASBLVIC 185-300",
          unitsPerPack: 4,
        },
      ],
    },
  },
  {
    slug: "shear-bolt-lv-branch-connector",
    title: "Shear Bolt LV Branch Connector",
    category: "Shear Bolt Cable Lugs & Connectors",
    categorySlug: "shear-bolt",
    description:
      "Branch connector for LV & MV applications with sector shape stranded or solid conductor. IEC 61238-1 compliant with aluminium alloy construction.",
    image: "/products/shear-bolts/lv-branch-connector.jpg",
    features: [
      "Sector shape stranded or solid conductor",
      "Aluminium alloy body",
      "Confirming to IEC 61238-1 requirements",
    ],
    standards: ["IEC 61238-1", "ISO 9001:2015", "CE & RoHS"],
    applications: [
      "LV & MV distribution branching",
      "Utility tap-off connections",
      "Street lighting connections",
    ],
    specificationTable: {
      columns: [
        { key: "nominalSectionMin", label: "Nom X-Section Area min", unit: "mm²" },
        { key: "nominalSectionMax", label: "Nom X-Section Area max", unit: "mm²" },
        { key: "a", label: "a", unit: "mm" },
        { key: "b", label: "b", unit: "mm" },
        { key: "d3", label: "d3", unit: "mm" },
        { key: "af", label: "A/F", unit: "mm" },
        { key: "partNumber", label: "P/N" },
        { key: "unitsPerPack", label: "Units/Pack" },
      ],
      rows: [
        {
          nominalSectionMin: "70-95",
          nominalSectionMax: "50-70",
          a: 42.0,
          b: 30.0,
          d3: 42.0,
          af: 13.0,
          partNumber: "ASBLVUBC 70-95/50-70",
          unitsPerPack: 4,
        },
        {
          nominalSectionMin: "150-185",
          nominalSectionMax: "70-150",
          a: 50.0,
          b: 37.0,
          d3: 54.0,
          af: 17.0,
          partNumber: "ASBLVUBC 150-185/70-150",
          unitsPerPack: 4,
        },
        {
          nominalSectionMin: "185-300",
          nominalSectionMax: "185-300",
          a: 60.0,
          b: 51.0,
          d3: 65.5,
          af: 17.0,
          partNumber: "ASBLVUBC 185-300/185-300",
          unitsPerPack: 4,
        },
      ],
    },
  },
  {
    slug: "shear-bolt-mv-cable-lugs",
    title: "Shear Bolt Cable Lugs (MV)",
    category: "Shear Bolt Cable Lugs & Connectors",
    categorySlug: "shear-bolt",
    description:
      "Shear bolt cable lugs for MV applications with single or two hole palm configuration. Material: Aluminium alloy. Finish: Natural / Tin Plated. Confirming to IEC 61238-1 requirements.",
    image: "/products/shear-bolts/mv-cable-lugs.jpg",
    features: [
      "Single or two hole palm configuration",
      "Flat palm for busbar termination",
      "Optimized palm thickness",
      "Wide cable range compatibility",
      "Gas-tight connections",
    ],
    standards: ["IEC 61238-1", "EN 50483", "ISO 9001:2015"],
    applications: [
      "MV cable termination",
      "Busbar connections",
      "Switchgear terminations",
      "Renewable energy installations",
    ],
    specificationTable: {
      columns: [
        { key: "nomSectionAlRE", label: "Nom. X-Section Area Al (RE)", unit: "mm²" },
        { key: "nomSectionAlRM", label: "Nom. X-Section Area Al (RM)", unit: "mm²" },
        { key: "nomSectionAlSM", label: "Nom. X-Section Area Al (SM)", unit: "mm²" },
        { key: "nomSectionRM", label: "Nom. X-Section (RM)", unit: "mm²" },
        { key: "nomSectionSM", label: "Nom. X-Section (SM)", unit: "mm²" },
        { key: "noOfScrew", label: "No of Screw" },
        { key: "partNumber", label: "P/N" },
        { key: "unitsPerPack", label: "Units/Pack" },
      ],
      rows: [
        {
          nomSectionAlRE: "16-95",
          nomSectionAlRM: "16-95",
          nomSectionAlSM: "25-70",
          nomSectionRM: "16-70",
          nomSectionSM: "25-70",
          noOfScrew: 1,
          partNumber: "ASBCL 16-95",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "50-150",
          nomSectionAlRM: "50-150",
          nomSectionAlSM: "50-120",
          nomSectionRM: "35-120",
          nomSectionSM: "50-120",
          noOfScrew: 1,
          partNumber: "ASBCL 50-150",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "95-240",
          nomSectionAlRM: "95-240",
          nomSectionAlSM: "95-185",
          nomSectionRM: "95-240",
          nomSectionSM: "95-185",
          noOfScrew: 2,
          partNumber: "ASBCL 95-240",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "120-300",
          nomSectionAlRM: "120-300",
          nomSectionAlSM: "120-240",
          nomSectionRM: "120-300",
          nomSectionSM: "120-240",
          noOfScrew: 2,
          partNumber: "ASBCL 120-300",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "185-400",
          nomSectionAlRM: "185-400",
          nomSectionAlSM: "185-300",
          nomSectionRM: "185-400",
          nomSectionSM: "185-300",
          noOfScrew: 3,
          partNumber: "ASBCL 185-400",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "400-630",
          nomSectionAlRM: "400-630",
          nomSectionAlSM: "400-500",
          nomSectionRM: "400-630",
          nomSectionSM: "400-500",
          noOfScrew: 3,
          partNumber: "ASBCL 400-630",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "630-1000",
          nomSectionAlRM: "630-1000",
          nomSectionAlSM: "630-1000",
          nomSectionRM: "630-1000",
          nomSectionSM: "630-1000",
          noOfScrew: 4,
          partNumber: "ASBCL 630-1000",
          unitsPerPack: 3,
        },
      ],
    },
  },
  {
    slug: "shear-bolt-mv-cable-connectors",
    title: "Shear Bolt Cable Connectors (MV)",
    category: "Shear Bolt Cable Lugs & Connectors",
    categorySlug: "shear-bolt",
    description:
      "Shear bolt inline cable connectors for MV applications. Material: Aluminium alloy. Finish: Natural / Tin Plated. Confirming to IEC 61238-1 requirements for reliable inline cable jointing.",
    image: "/products/shear-bolts/mv-cable-connectors.jpg",
    features: [
      "Inline cable connection",
      "Full circumferential mechanical compression",
      "High pull-out strength",
      "Vibration resistant",
      "Thermal stability under cyclic load",
    ],
    standards: ["IEC 61238-1", "ISO 9001:2015", "CE & RoHS"],
    applications: [
      "MV cable jointing",
      "Distribution network",
      "Retrofit and maintenance",
    ],
    specificationTable: {
      columns: [
        { key: "nomSectionAlRE", label: "Nominal X-Section Area Al (RE)", unit: "mm²" },
        { key: "nomSectionAlRM", label: "Nominal X-Section Area Al (RM)", unit: "mm²" },
        { key: "nomSectionAlSM", label: "Nominal X-Section Area Al (SM)", unit: "mm²" },
        { key: "nomSectionCuRM", label: "Nominal X-Section Area Cu (RM)", unit: "mm²" },
        { key: "nomSectionCuSM", label: "Nominal X-Section Area Cu (SM)", unit: "mm²" },
        { key: "noOfScrew", label: "No of Screw" },
        { key: "partNumber", label: "P/N" },
        { key: "unitsPerPack", label: "Units/Pack" },
      ],
      rows: [
        {
          nomSectionAlRE: "16-95",
          nomSectionAlRM: "16-95",
          nomSectionAlSM: "25-70",
          nomSectionCuRM: "16-70",
          nomSectionCuSM: "25-70",
          noOfScrew: 2,
          partNumber: "ASBCC 16-95",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "50-150",
          nomSectionAlRM: "50-150",
          nomSectionAlSM: "50-120",
          nomSectionCuRM: "35-120",
          nomSectionCuSM: "50-120",
          noOfScrew: 2,
          partNumber: "ASBCC 50-150",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "95-240",
          nomSectionAlRM: "95-240",
          nomSectionAlSM: "95-185",
          nomSectionCuRM: "95-240",
          nomSectionCuSM: "95-185",
          noOfScrew: 4,
          partNumber: "ASBCC 95-240",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "120-300",
          nomSectionAlRM: "120-300",
          nomSectionAlSM: "120-240",
          nomSectionCuRM: "120-300",
          nomSectionCuSM: "120-240",
          noOfScrew: 4,
          partNumber: "ASBCC 120-300",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "185-400",
          nomSectionAlRM: "185-400",
          nomSectionAlSM: "185-300",
          nomSectionCuRM: "185-400",
          nomSectionCuSM: "185-300",
          noOfScrew: 6,
          partNumber: "ASBCC 185-400",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "400-630",
          nomSectionAlRM: "400-630",
          nomSectionAlSM: "400-500",
          nomSectionCuRM: "400-630",
          nomSectionCuSM: "400-500",
          noOfScrew: 6,
          partNumber: "ASBCC 400-630",
          unitsPerPack: 3,
        },
        {
          nomSectionAlRE: "630-1000",
          nomSectionAlRM: "630-1000",
          nomSectionAlSM: "—",
          nomSectionCuRM: "630-1000",
          nomSectionCuSM: "—",
          noOfScrew: 8,
          partNumber: "ASBCC 630-1000",
          unitsPerPack: 3,
        },
      ],
    },
  },

  // EHV Power Clamps
  {
    slug: "parallel-connector-tube-conductor",
    title: "Parallel Connector for Al Tube & Conductor",
    category: "EHV Power Clamps & Connectors",
    categorySlug: "ehv-power-clamps",
    description:
      "High-quality cast and machined parallel connector for connecting aluminium tube to aluminium conductor in substation applications up to 550kV.",
    image: "/products/ehv/parallel-connector.jpg",
    features: [
      "High quality casting and machining",
      "High mechanical strength",
      "Superior electrical performance",
      "Low resistivity connections",
      "Up to 550kV applications",
    ],
    specs: [
      "Voltage: Up to 550kV",
      "Material: High-strength aluminium",
      "Type: Parallel groove",
    ],
    standards: ["IEC", "ANSI", "IS"],
    applications: [
      "Transmission & distribution substations",
      "Switchyards (AIS & GIS)",
      "Power plants",
    ],
  },
  {
    slug: "straight-connector-conductor-flatbar",
    title: "Straight Connector for Al Conductor to Flatbar",
    category: "EHV Power Clamps & Connectors",
    categorySlug: "ehv-power-clamps",
    description:
      "Straight connector for connecting aluminium conductor to aluminium flatbar. Designed for substation busbar connections.",
    image: "/products/ehv/straight-connector.jpg",
    features: [
      "Conductor to flatbar connection",
      "High tensile strength",
      "Precision machined contact surfaces",
      "Corrosion resistant",
    ],
    specs: [
      "Voltage: Up to 550kV",
      "Material: Aluminium alloy",
      "Type: Straight / Bolted",
    ],
    standards: ["IEC", "ANSI", "IS"],
    applications: [
      "Substation busbar connections",
      "Equipment terminal connections",
      "Railways & metro traction substations",
    ],
  },
  {
    slug: "t-connector-aluminium",
    title: "T-Connector for Aluminium Conductor",
    category: "EHV Power Clamps & Connectors",
    categorySlug: "ehv-power-clamps",
    description:
      "T-type connector for aluminium conductor branching in substation applications. High quality casting with superior electrical performance.",
    image: "/products/ehv/t-connector.jpg",
    features: [
      "T-type branching connection",
      "High mechanical and tensile strength",
      "Superior electrical performance",
      "Suitable for outdoor installations",
    ],
    specs: [
      "Voltage: Up to 550kV",
      "Material: Aluminium alloy",
      "Type: T-connector",
    ],
    standards: ["IEC", "ANSI", "IS"],
    applications: [
      "Substation branching",
      "Power plant connections",
      "Industrial power distribution",
    ],
  },

  // Compression Lugs
  {
    slug: "copper-compression-cable-lugs",
    title: "Copper Compression Cable Lugs",
    category: "Compression Cable Lugs & Connectors",
    categorySlug: "compression-lugs",
    description:
      "Heavy-duty copper cable lugs for reliable electrical termination. Manufactured from electrolytic copper with tin plating for corrosion resistance.",
    image: "/products/compression/copper-lugs.jpg",
    features: [
      "Electrolytic copper construction",
      "Tin plated finish",
      "Precision machined bore",
      "Single or two hole palm",
      "Long barrel for secure crimping",
    ],
    specs: [
      "Range: 1.5-1000 mm²",
      "Material: Electrolytic copper",
      "Finish: Tin plated",
    ],
    standards: ["BS 4579", "DIN 46235", "IS 8309", "IEC 61238-1"],
    applications: [
      "Power cable termination",
      "Switchgear connections",
      "Panel wiring",
      "Motor terminations",
    ],
  },
  {
    slug: "aluminium-compression-cable-lugs",
    title: "Aluminium Compression Cable Lugs",
    category: "Compression Cable Lugs & Connectors",
    categorySlug: "compression-lugs",
    description:
      "Aluminium cable lugs for aluminium conductor termination. Precision machined with oxide inhibiting compound for gas-tight connections.",
    image: "/products/compression/aluminium-lugs.jpg",
    features: [
      "High conductivity aluminium",
      "Precision machined bore",
      "Oxide inhibiting compound",
      "Available with inspection holes",
    ],
    specs: [
      "Range: 10-1000 mm²",
      "Material: Aluminium",
      "Finish: Natural",
    ],
    standards: ["DIN 46329", "IS 8507", "IEC 61238-1"],
    applications: [
      "Aluminium cable termination",
      "Distribution transformers",
      "Overhead line connections",
    ],
  },
  {
    slug: "bimetallic-cable-lugs",
    title: "Bimetallic Cable Lugs",
    category: "Compression Cable Lugs & Connectors",
    categorySlug: "compression-lugs",
    description:
      "Bimetallic cable lugs with aluminium barrel and copper palm for connecting aluminium cables to copper busbars. Friction-welded joint for reliable transition.",
    image: "/products/compression/bimetallic-lugs.jpg",
    features: [
      "Aluminium barrel + copper palm",
      "Friction-welded bimetallic joint",
      "Eliminates galvanic corrosion risk",
      "Tin plated copper palm",
    ],
    specs: [
      "Range: 10-630 mm²",
      "Material: Al/Cu bimetallic",
      "Joint: Friction welded",
    ],
    standards: ["DIN 46234", "IS 8507", "IEC 61238-1"],
    applications: [
      "Al cable to Cu busbar connection",
      "Transformer connections",
      "Distribution panels",
    ],
  },
  {
    slug: "inline-connectors",
    title: "Compression Inline Connectors",
    category: "Compression Cable Lugs & Connectors",
    categorySlug: "compression-lugs",
    description:
      "Copper and aluminium inline connectors for cable jointing. Available in standard and reducing types for different cable sizes.",
    image: "/products/compression/inline-connectors.jpg",
    features: [
      "Copper and aluminium variants",
      "Standard and reducing types",
      "Deep inspection hole",
      "High conductivity barrel",
    ],
    specs: [
      "Range: 10-630 mm²",
      "Material: Cu or Al",
      "Type: Standard / Reducing",
    ],
    standards: ["BS 4579", "DIN 46267", "IEC 61238-1"],
    applications: [
      "Cable jointing",
      "Cable extension",
      "Underground cable networks",
    ],
  },

  // Cable Cleats
  {
    slug: "aluminium-cable-cleats",
    title: "Aluminium Cable Cleats",
    category: "Aluminium & Polyamide Cable Cleats",
    categorySlug: "cable-cleats",
    description:
      "Heavy-duty aluminium cable cleats designed for short-circuit withstand in power cable installations. Suitable for trefoil and single cable arrangements.",
    image: "/products/cleats/aluminium-cleats.jpg",
    features: [
      "Short-circuit withstand rated",
      "Aluminium alloy construction",
      "Trefoil and single cable types",
      "UV and corrosion resistant",
      "Easy installation",
    ],
    specs: [
      "Cable range: 20-150mm diameter",
      "Material: Aluminium alloy",
      "Mounting: Bolt-on",
    ],
    standards: ["IEC 61914", "ISO 9001:2015"],
    applications: [
      "Power cable installations",
      "Cable tray management",
      "Substation cable routing",
      "Tunnel and shaft installations",
    ],
  },
  {
    slug: "polyamide-cable-cleats",
    title: "Polyamide Cable Cleats",
    category: "Aluminium & Polyamide Cable Cleats",
    categorySlug: "cable-cleats",
    description:
      "Lightweight polyamide cable cleats for LV cable management. UV stabilized, flame retardant, and suitable for harsh environments.",
    image: "/products/cleats/polyamide-cleats.jpg",
    features: [
      "Lightweight polyamide construction",
      "UV stabilized and flame retardant",
      "Halogen-free material",
      "Snap-fit installation",
      "Wide cable range accommodation",
    ],
    specs: [
      "Cable range: 12-65mm diameter",
      "Material: Polyamide (PA66)",
      "Color: Black (UV stabilized)",
    ],
    standards: ["IEC 61914", "UL 94 V-0"],
    applications: [
      "LV cable installations",
      "Industrial cable management",
      "Marine and offshore",
    ],
  },

  // Terminations & Joints
  {
    slug: "heat-shrink-terminations",
    title: "Heat Shrink Cable Terminations",
    category: "Cable Terminations & Joints",
    categorySlug: "terminations-joints",
    description:
      "Heat shrink cable terminations for MV and LV power cables. Complete kits with stress control tube, breakout, and weather-resistant outer tube.",
    image: "/products/terminations/heat-shrink-terminations.jpg",
    features: [
      "Complete termination kits",
      "Stress control technology",
      "Weather and UV resistant",
      "Indoor and outdoor types",
      "Easy heat-gun installation",
    ],
    specs: [
      "Voltage: Up to 36kV",
      "Cable range: 25-630 mm²",
      "Type: Indoor / Outdoor",
    ],
    standards: ["IEC 60502", "IEEE 48"],
    applications: [
      "MV cable termination",
      "Switchgear connections",
      "Transformer terminations",
      "Outdoor overhead connections",
    ],
  },
  {
    slug: "heat-shrink-joints",
    title: "Heat Shrink Cable Joints",
    category: "Cable Terminations & Joints",
    categorySlug: "terminations-joints",
    description:
      "Heat shrink straight-through and branch joints for MV and LV cables. Complete joint kits with connectors, stress control, and outer protection.",
    image: "/products/terminations/heat-shrink-joints.jpg",
    features: [
      "Straight-through and branch types",
      "Complete joint kits",
      "Integrated stress control",
      "Moisture sealed construction",
    ],
    specs: [
      "Voltage: Up to 36kV",
      "Cable range: 25-630 mm²",
      "Type: Straight / Branch",
    ],
    standards: ["IEC 60502", "IEC 60840"],
    applications: [
      "Underground cable jointing",
      "Cable repair and extension",
      "Distribution network",
    ],
  },

  // Cable Glands
  {
    slug: "brass-cable-glands-a2",
    title: "Industrial Brass Cable Glands (A2 Type)",
    category: "Industrial Brass Cable Glands",
    categorySlug: "cable-glands",
    description:
      "A2-type industrial brass cable glands for unarmoured cables. Nickel plated finish with IP68 rating for demanding industrial environments.",
    image: "/products/glands/brass-a2.jpg",
    features: [
      "A2 type for unarmoured cables",
      "Nickel plated brass",
      "IP68 rated sealing",
      "Wide cable range",
      "Neoprene sealing ring",
    ],
    specs: [
      "Thread: M16-M75 / PG",
      "Material: Brass, Nickel plated",
      "Rating: IP68",
    ],
    standards: ["BS 6121", "IEC 62444"],
    applications: [
      "Industrial panels",
      "Junction boxes",
      "Control panels",
      "Process industries",
    ],
  },
  {
    slug: "double-compression-glands",
    title: "Double Compression Cable Glands",
    category: "Industrial Brass Cable Glands",
    categorySlug: "cable-glands",
    description:
      "Double compression cable glands for armoured cables. Brass construction with inner and outer seal for complete cable and armour retention.",
    image: "/products/glands/double-compression.jpg",
    features: [
      "Double compression mechanism",
      "Armour and cable seal",
      "360° armour contact",
      "Earth continuity",
      "Weatherproof and flameproof options",
    ],
    specs: [
      "Thread: M20-M75",
      "Material: Brass / Nickel plated",
      "Rating: IP68 / Ex d / Ex e",
    ],
    standards: ["BS 6121", "IEC 62444", "ATEX"],
    applications: [
      "Armoured cable installations",
      "Hazardous area (Ex zones)",
      "Oil & gas installations",
      "Marine environments",
    ],
  },

  // Busbar & Braid
  {
    slug: "flexible-copper-braids",
    title: "Flexible Copper Braids",
    category: "Copper Bus Bar & Flexible Braid",
    categorySlug: "busbar-braid",
    description:
      "Flexible copper braids for grounding, bonding, and vibration-absorbing connections. Custom lengths and terminations available.",
    image: "/products/busbar/flexible-braids.png",
    features: [
      "High flexibility",
      "Custom lengths available",
      "Various termination options",
      "High current capacity",
      "Vibration absorption",
    ],
    specs: [
      "Material: Electrolytic copper",
      "Cross-section: Custom",
      "Finish: Tin plated / Natural",
    ],
    standards: ["IS 8130", "DIN 46444"],
    applications: [
      "Grounding connections",
      "Transformer connections",
      "Generator bonding",
      "Anti-vibration links",
    ],
  },
  {
    slug: "laminated-busbars",
    title: "Laminated Copper Busbars",
    category: "Copper Bus Bar & Flexible Braid",
    categorySlug: "busbar-braid",
    description:
      "Laminated copper busbars for high-current distribution. Custom designed for switchgear, transformers, and electrical panels.",
    image: "/products/busbar/laminated-busbars.jpg",
    features: [
      "Custom designed per drawing",
      "High current capacity",
      "Epoxy or Mylar insulation",
      "Tin or silver plated contacts",
      "Precision punched holes",
    ],
    specs: [
      "Material: Electrolytic copper",
      "Insulation: Epoxy / Mylar",
      "Finish: Tin / Silver plated",
    ],
    standards: ["IS 8130", "IEC 61439"],
    applications: [
      "Switchgear assemblies",
      "Transformer connections",
      "UPS systems",
      "Power distribution panels",
    ],
  },
  {
    slug: "earth-rods",
    title: "Copper Bonded Earth Rods",
    category: "Copper Bus Bar & Flexible Braid",
    categorySlug: "busbar-braid",
    description:
      "Copper bonded steel earth rods for grounding systems. Molecularly bonded copper layer for long-term corrosion resistance and conductivity.",
    image: "/products/busbar/earth-rods.jpg",
    features: [
      "Molecularly bonded copper",
      "High tensile steel core",
      "Minimum 250 micron copper thickness",
      "Threaded coupling provision",
      "Driving stud included",
    ],
    specs: [
      "Diameter: 14.2mm, 17.2mm, 20mm",
      "Length: 1.2m, 1.5m, 2.4m, 3.0m",
      "Copper thickness: Min 250 micron",
    ],
    standards: ["UL 467", "BS 7430", "IEEE 80"],
    applications: [
      "Earthing and grounding systems",
      "Lightning protection",
      "Substation grounding",
      "Building earthing",
    ],
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
