"use client";

import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const ProductViewer3D = dynamic(
  () =>
    import("@/components/three/ProductViewer3D").then((m) => m.ProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[450px] bg-[var(--surface)] rounded-2xl flex items-center justify-center">
        <span className="text-[var(--muted)] text-sm">Loading 3D Viewer...</span>
      </div>
    ),
  }
);

export function ProductViewerSection() {
  return (
    <section className="py-28 md:py-36 relative">
      <Container>
        <SectionTitle
          overline="3D View"
          title="Interactive Product Models"
          subtitle="Explore our products in 3D. Drag to rotate, scroll to zoom."
        />
        <div className="mt-14 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
          <ProductViewer3D showSelector />
        </div>
      </Container>
    </section>
  );
}
