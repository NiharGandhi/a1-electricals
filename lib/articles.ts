export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  keywords: string[];
  content: string;
}

export const articles: Article[] = [
  {
    slug: "cable-lug-selection-guide-aluminium-copper-bimetallic",
    title: "How to Select the Right Cable Lug: Aluminium, Copper & Bimetallic",
    description:
      "A practical guide to choosing between aluminium, copper, and bimetallic cable lugs for LV and MV power applications. Covers conductor material compatibility, corrosion considerations, IEC standards, and installation best practices.",
    publishedAt: "2025-01-15",
    category: "Selection Guide",
    keywords: [
      "cable lug selection",
      "aluminium cable lugs",
      "copper cable lugs",
      "bimetallic cable lugs",
      "cable termination",
      "IEC 61238-1",
    ],
    content: `
## Why Cable Lug Material Matters

The cable lug — sometimes called a cable terminal or cable shoe — is the mechanical and electrical interface between a conductor and a piece of equipment. Choosing the wrong material can cause galvanic corrosion, increased contact resistance, or premature failure in service.

The three main lug materials you will encounter are:

- **Aluminium lugs** — for aluminium conductors
- **Copper lugs** — for copper conductors
- **Bimetallic (Al/Cu) lugs** — for connecting aluminium conductors to copper equipment terminals

## Aluminium Cable Lugs

Aluminium lugs are manufactured from high-conductivity aluminium alloy (typically EN AW-1350 or similar). They are used exclusively with aluminium conductors and are suitable for LV and MV distribution networks.

### Key characteristics
- Lower cost than copper equivalents
- Lightweight — important for overhead and large-conductor installations
- Must be used with appropriate joint compound (oxide inhibitor) to prevent aluminium oxidation at the contact interface
- Should not be connected directly to copper bus bars without a bimetallic interface, as direct Al/Cu contact creates a galvanic cell

### Standards
Aluminium cable lugs conforming to **IEC 61238-1** have been tested for mechanical pull-out strength, electrical resistance, and short-circuit performance.

## Copper Cable Lugs

Copper lugs are the standard choice for copper conductors. They offer:

- Excellent conductivity (typically IACS 99.9% for electrolytic copper)
- Good corrosion resistance in most environments
- Direct compatibility with copper bus bars and switchgear terminals

Compression copper lugs are available in standard barrel and long-barrel (extended palm) configurations to suit different equipment bolt patterns.

## Bimetallic Cable Lugs

Bimetallic lugs solve the fundamental problem of connecting aluminium conductors to copper equipment. They consist of an aluminium barrel (crimped onto the conductor) friction-welded or brazed to a copper palm (bolted to the equipment terminal).

### When to specify bimetallic lugs
- MV and LV switchgear with copper bus bars, fed by aluminium cables
- Transformer LV terminal connections to aluminium distribution cables
- Any application where the conductor and the equipment terminal are dissimilar metals

Bimetallic lugs from A-1 Electricals are manufactured with a friction-welded Al/Cu interface and are tested to **IEC 61238-1** to verify that the joint performs as well as a same-metal connection under electrical and mechanical load.

## Quick Selection Summary

| Conductor | Equipment Terminal | Lug Type |
|---|---|---|
| Copper | Copper | Copper lug |
| Aluminium | Aluminium | Aluminium lug |
| Aluminium | Copper | Bimetallic lug |
| Copper | Aluminium | Bimetallic lug (Cu barrel / Al palm) |

## Installation Tips

1. **Clean the conductor end** — remove oxidation from aluminium conductors with a wire brush immediately before crimping, then apply oxide inhibitor compound.
2. **Use the correct die** — each conductor size and lug series requires the matching compression die. Using an incorrect die results in under- or over-crimping.
3. **Torque terminal bolts correctly** — refer to the equipment manufacturer's torque specification. Over-torquing compresses the palm and can crack the barrel.
4. **Apply heat-shrink or insulating boots** where required by the installation standard (e.g., IP2X minimum for LV panels).

## Compliance

A-1 Electricals compression and bimetallic cable lugs are manufactured under **ISO 9001:2015** quality management and tested to **IEC 61238-1**. Products carry **CE and RoHS** compliance marks.

For product selection or technical enquiries, [contact our engineering team](/contact) or [submit a project inquiry](/inquiry).
`,
  },
  {
    slug: "shear-bolt-connector-installation-iec-61238-1",
    title: "Shear Bolt Connectors: Installation Guide & IEC 61238-1 Compliance",
    description:
      "Everything you need to know about shear bolt cable connectors — how they work, why they are specified for tool-free termination, IEC 61238-1 test requirements, and step-by-step installation for LV and MV conductors.",
    publishedAt: "2025-02-10",
    category: "Technical Guide",
    keywords: [
      "shear bolt connector",
      "shear bolt cable lug",
      "tool-free cable termination",
      "IEC 61238-1",
      "LV MV connector installation",
      "torque calibrated connector",
    ],
    content: `
## What is a Shear Bolt Connector?

A shear bolt connector (also called a shear-off bolt or breakaway bolt connector) uses specially designed bolts that shear off at a pre-calibrated torque. Once the bolt head shears, the correct contact pressure has been applied — no torque wrench is needed.

This design eliminates one of the most common installation errors in cable termination: incorrect tightening torque. Under-torqued connections have high contact resistance and can overheat. Over-torqued connections can damage the conductor, deform the connector body, or crack the insulation.

## How Shear Bolts Work

Each shear bolt has a machined neck (the shear zone) between the drive head and the thread. The neck is dimensioned so that it fails in torsion at the exact torque required to achieve the correct contact pressure on the conductor.

Once the head shears off:
- The remaining stud is flush or below the connector body surface
- No sharp protrusions remain
- The connection has been made at the correct force — every time, regardless of the installer's experience

## Conductor Compatibility

Shear bolt connectors from A-1 Electricals are designed for:

- **Sector-shape stranded or solid conductors** (aluminium and copper)
- Cross-section range: typically 50 mm² to 240 mm² (refer to product specification tables for exact range)
- LV applications (up to 1 kV) and MV applications where specified

The aluminium alloy body accommodates both aluminium and copper conductors without requiring an additional bimetallic insert in many cases, because the connector material and shear force are designed to create a reliable gas-tight joint that inhibits oxidation.

## IEC 61238-1 — What Does It Require?

IEC 61238-1 is the international standard for compression and mechanical connectors for power cables with rated voltages up to 30 kV (36 kV Um).

For shear bolt connectors, the key tests are:

| Test | Purpose |
|---|---|
| Electrical resistance measurement | Verify contact resistance is equal to or lower than a same-length conductor |
| Pull-out test | Verify mechanical grip on the conductor |
| Short-circuit test | Verify the joint survives fault currents without failure |
| Heating cycle test | Verify long-term stability under thermal cycling |

A connector that passes IEC 61238-1 has been proven to perform as well as the conductor itself — it will not be the weak point in the circuit.

## Step-by-Step Installation

1. **Strip the conductor** to the insertion depth marked on the connector barrel (or specified in the datasheet).
2. **Insert the conductor** fully into the barrel. Ensure all strands are within the barrel — no strands should be outside.
3. **Hand-tighten the shear bolts** in sequence (follow the bolt numbering on the connector body if marked).
4. **Use a standard socket wrench or ratchet** to tighten each bolt until the head shears off. The shear is audible and tactile — a clean snap.
5. **Inspect the connection** — all bolt heads should have sheared, flush with or below the connector body.
6. **Apply insulation** as required (heat-shrink sleeve, insulating tape, or pre-insulated connector variant).

## Common Mistakes to Avoid

- **Partial insertion** — if the conductor is not fully inserted, the shear bolt tightens against air, and the head may shear before adequate contact pressure is achieved.
- **Wrong connector size** — always verify the conductor cross-section matches the connector's rated range.
- **Re-torquing sheared bolts** — once a bolt head has sheared, the remaining stud cannot be re-torqued. If in doubt about the installation, use a new connector.

## Why Specify Shear Bolt Connectors?

Shear bolt connectors are preferred by utilities and EPC contractors because they:

- Require no calibrated tooling on site
- Reduce training requirements — correct torque is achieved by design
- Are faster to install than compression connectors (no crimping tool required)
- Provide consistent, verifiable results — sheared heads confirm correct installation

A-1 Electricals shear bolt connectors are manufactured under **ISO 9001:2015** and fully comply with **IEC 61238-1**. [View the product range](/products/shear-bolt) or [contact us](/contact) for technical support.
`,
  },
  {
    slug: "cable-cleat-selection-guide-iec-61914",
    title: "Cable Cleat Selection Guide: Short Circuit Forces & IEC 61914",
    description:
      "How to select the right cable cleats for single-core and trefoil cable formations. Explains short-circuit electromagnetic forces, IEC 61914 test categories, aluminium vs polyamide cleat types, and sizing calculations.",
    publishedAt: "2025-03-05",
    category: "Selection Guide",
    keywords: [
      "cable cleat selection",
      "IEC 61914",
      "short circuit cable forces",
      "aluminium cable cleats",
      "polyamide cable cleats",
      "trefoil cable formation",
      "single core cable support",
    ],
    content: `
## Why Cable Cleats Are Safety-Critical

Cable cleats are often treated as a secondary consideration — chosen after the cable, route, and tray system have been specified. This is a mistake.

When a short-circuit occurs, the electromagnetic forces between adjacent single-core cables can be enormous. Without correctly rated cleats, cables can violently separate, damage insulation, cause additional faults, and injure personnel. A cable cleat is not just a fixing device — it is a short-circuit restraint.

## Understanding Short-Circuit Electromagnetic Forces

When current flows through parallel conductors, the magnetic fields interact:

- **Cables in trefoil (triangular) formation**: the force alternates between attraction and repulsion. During a short circuit, the cables attempt to move to a flat (planar) formation.
- **Cables in flat (planar) formation**: the outer cables are attracted to the centre cable while the centre cable experiences alternating forces.

The peak electromagnetic force per unit length between two parallel conductors carrying a fault current *I* (peak) separated by a distance *d* (centre-to-centre) is:

\`\`\`
F = (μ₀ / 2π) × (I² / d)  [N/m]
\`\`\`

For a typical 33 kV system with a 25 kA fault level, the peak force can exceed several kilonewtons per metre on closely-spaced cables. This force must be restrained by the cleats.

## IEC 61914 — Cable Cleat Standard

IEC 61914:2015 is the international standard for cable cleats. It defines:

### Test Categories
| Category | Application |
|---|---|
| Category A | Short-circuit restraint tested (the main structural requirement) |
| Category B | Short-circuit restraint + environmental tests (UV, temperature, salt spray) |
| Category C | As B, but with additional impact and flammability tests for hazardous areas |

### What "Passed IEC 61914" Means
A cleat that has been tested to IEC 61914 Category A has been subjected to a short-circuit current impulse (typically 25 kA or 40 kA for 0.1 seconds) in a test that simulates the worst-case electromagnetic force. The cable must remain within the cleat and the cleat must remain on its mounting after the test.

Always request the test report and confirm the rated short-circuit current matches or exceeds your system fault level.

## Aluminium vs Polyamide Cleats

### Aluminium Cleats
- Higher mechanical strength — better for high fault-level systems (25 kA, 40 kA, and above)
- Inherently corrosion-resistant — suitable for outdoor, coastal, and industrial environments
- Electrically conductive — may need to be insulated from the cable sheath in some earthing arrangements
- Higher weight — relevant for large installations where cleat weight loads the cable tray

### Polyamide (Nylon/PA66) Cleats
- Electrically non-conductive — no issues with induced circulating currents
- Good UV and chemical resistance
- Lower mechanical strength — typically suitable for lower fault-level systems
- Lighter weight

For most utility substation and HV/MV cable applications, **aluminium cleats** are specified. Polyamide cleats are common in LV distribution, data centres, and applications where electrical isolation between cleat and sheath is required.

## Sizing and Spacing

### Cleat Spacing
IEC 61914 does not specify cleat spacing — this must be calculated based on:
1. The cable outer diameter
2. The system fault current and duration
3. The cleat's rated short-circuit capacity
4. The cable weight per metre

As a rule of thumb, HV single-core cables in trefoil are typically cleated at **300 mm to 900 mm** spacing, with closer spacing near joints, terminations, and bends.

### Checking Your Calculation
Cable cleat manufacturers (including A-1 Electricals) can provide force calculation spreadsheets based on system parameters. Provide:
- System voltage
- Maximum prospective fault current (kA symmetrical)
- Fault duration (seconds)
- Cable OD and formation (trefoil / flat)
- Proposed cleat spacing

## Common Specification Errors

1. **Specifying cleat by cable OD only** — OD determines the physical fit, but the fault level determines the required restraint category. A cleat that fits but is not rated for the fault level provides no protection.
2. **Ignoring the formation** — a cleat rated for trefoil may not be suitable for flat formation, and vice versa.
3. **Using plastic cleats on HV systems** — unless specifically tested to the required fault level, polyamide cleats are generally not adequate above 11 kV in high fault-level networks.
4. **No allowance for thermal expansion** — cables expand and contract with load cycling. Cleats must allow some axial movement (slip) while restraining radial movement.

## A-1 Electricals Cable Cleats

A-1 Electricals manufactures aluminium and polyamide cable cleats for single-core and trefoil cable formations in LV, MV, and HV applications. All products are designed and tested to **IEC 61914**.

[View the cable cleats range](/products/cable-cleats) or [contact our engineering team](/contact) to discuss your project requirements.
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
