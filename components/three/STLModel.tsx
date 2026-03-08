"use client";

import { useLoader } from "@react-three/fiber";
import { Center, Float } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface STLModelProps {
  url: string;
  color?: string;
  scale?: number;
  metalness?: number;
  roughness?: number;
  float?: boolean;
}

export function STLModel({
  url,
  color = "#e65100",
  scale = 1,
  metalness = 0.7,
  roughness = 0.3,
  float = true,
}: STLModelProps) {
  const geometry = useLoader(STLLoader, url);

  const mesh = (
    <Center>
      <mesh scale={scale} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </mesh>
    </Center>
  );

  if (float) {
    return (
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        {mesh}
      </Float>
    );
  }

  return mesh;
}
