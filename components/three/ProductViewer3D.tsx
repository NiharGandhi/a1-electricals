"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLModel } from "./STLModel";
import {
  productStlUrls,
  productLabels,
  type ProductModelKey,
} from "@/lib/three/productModels";

const productKeys: ProductModelKey[] = [
  "cableGland",
  "cableLug",
  "cableCleat",
  "heatShrink",
];

function SceneContent({ productKey }: { productKey: ProductModelKey }) {
  const url = productStlUrls[productKey];
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, -2, 2]} intensity={0.5} color="#e65100" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#e65100" />
      <spotLight position={[0, 5, 5]} angle={0.4} penumbra={1} intensity={0.8} />
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#e65100" wireframe />
          </mesh>
        }
      >
        <STLModel url={url} scale={1.2} color="#c77d2e" metalness={0.9} roughness={0.15} />
      </Suspense>
      <Environment preset="studio" />
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </>
  );
}

interface ProductViewer3DProps {
  className?: string;
  showSelector?: boolean;
}

export function ProductViewer3D({
  className = "",
  showSelector = true,
}: ProductViewer3DProps) {
  const [product, setProduct] = useState<ProductModelKey>("cableGland");

  return (
    <div className={`relative ${className}`}>
      {showSelector && (
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          {productKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setProduct(key)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
                product === key
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_0_20px_var(--accent-glow)]"
                  : "border-[var(--border)] bg-[var(--surface)]/80 text-[var(--muted)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]/30"
              }`}
            >
              {productLabels[key]}
            </button>
          ))}
        </div>
      )}
      <div className="h-full min-h-[450px] w-full">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <SceneContent productKey={product} />
        </Canvas>
      </div>
    </div>
  );
}
