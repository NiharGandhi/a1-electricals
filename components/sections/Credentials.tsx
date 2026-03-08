import { Container } from "@/components/ui/Container";

const certs = [
  {
    num: "01",
    badge: "ISO 9001",
    title: "Quality Management",
    description: "ISO 9001:2015 certified for manufacturing excellence, raw material traceability, and continuous process improvement.",
  },
  {
    num: "02",
    badge: "CE",
    title: "CE Marked",
    description: "European conformity across the product range, ensuring safety and environmental regulatory compliance.",
  },
  {
    num: "03",
    badge: "RoHS",
    title: "RoHS Compliant",
    description: "Restriction of hazardous substances — suitable for export markets with strict environmental mandates.",
  },
  {
    num: "04",
    badge: "IEC",
    title: "IEC 61238-1",
    description: "Products tested per IEC 61238-1 and applicable international standards for connector performance.",
  },
  {
    num: "05",
    badge: "FIEO",
    title: "FIEO Member",
    description: "Federation of Indian Export Organisations member, facilitating international trade and global partnerships.",
  },
  {
    num: "06",
    badge: "TÜV",
    title: "TÜV Certified",
    description: "Independent safety and quality certification providing additional assurance for critical applications.",
  },
];

const standards = [
  "IEC 61238-1", "DIN 46235", "DIN 46329", "DIN 46267", "DIN 46234",
  "BS 4579", "BS 7609", "BS 6121", "IS 8309", "IS 8507",
  "IEC 60502", "IEC 61914", "IEC 62444", "IEEE 80", "UL 467",
];

export function Credentials() {
  return (
    <section className="py-24 md:py-32 bg-[var(--background)]">
      <Container>

        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--muted)]">
            Certifications & Standards
          </p>
          <h2
            className="display text-[var(--foreground)]"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Quality &amp;
            <br />
            <span style={{ color: "var(--accent)" }}>Compliance.</span>
          </h2>
        </div>

        {/* Gap-px grid — peer_reject pattern */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px mb-14"
          style={{ background: "var(--border)" }}
        >
          {certs.map((cert) => (
            <div
              key={cert.num}
              className="flex flex-col gap-5 p-8 transition-colors duration-200 bg-[var(--background)] hover:bg-[var(--surface)]"
            >
              {/* Number + badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                  {cert.num}
                </span>
                <span
                  className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
                  style={{
                    color: "var(--accent)",
                    border: "1px solid var(--accent)",
                    background: "var(--accent-glow)",
                  }}
                >
                  {cert.badge}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-sm font-semibold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {cert.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-[var(--muted)]">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Standards strip */}
        <div className="pt-10 border-t border-[var(--border)]">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--muted)] mb-5 text-center">
            Standards Compliance
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {standards.map((std) => (
              <span
                key={std}
                className="text-[10px] font-mono font-medium tracking-wider px-3 py-1.5 rounded transition-colors duration-200 cursor-default"
                style={{
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                {std}
              </span>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
