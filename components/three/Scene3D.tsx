"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function CableGland() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const brassColor = "#c77d2e";
  const darkBrass = "#8b5a1e";

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.4}>
        {/* Main hexagonal body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.7, 6]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.95}
            roughness={0.15}
            envMapIntensity={2}
          />
        </mesh>

        {/* Thread section top */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 0.4, 32]} />
          <meshStandardMaterial
            color={darkBrass}
            metalness={0.9}
            roughness={0.25}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Thread grooves (rings) */}
        {[0.4, 0.5, 0.6, 0.7].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.4, 0.015, 8, 32]} />
            <meshStandardMaterial
              color={darkBrass}
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Top cap / gland nut */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.48, 0.48, 0.3, 6]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.95}
            roughness={0.12}
            envMapIntensity={2}
          />
        </mesh>

        {/* Top opening */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.25, 0.32, 0.15, 32]} />
          <meshStandardMaterial
            color={darkBrass}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Bottom thread section */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.42, 0.38, 0.4, 32]} />
          <meshStandardMaterial
            color={darkBrass}
            metalness={0.9}
            roughness={0.25}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Bottom thread grooves */}
        {[-0.4, -0.5, -0.6, -0.7].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.4, 0.015, 8, 32]} />
            <meshStandardMaterial
              color={darkBrass}
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Bottom opening ring */}
        <mesh position={[0, -0.8, 0]}>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <meshStandardMaterial
            color={brassColor}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Inner bore (visible darkness) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 2.5, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0} roughness={1} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#e65100"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.6} color="#e65100" />
        <pointLight position={[2, 3, 4]} intensity={0.8} color="#e65100" />
        <pointLight position={[-2, -3, 3]} intensity={0.4} color="#ff7d33" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.4}
          penumbra={1}
          intensity={1}
          color="#ffffff"
        />
        <Environment preset="studio" />
        <CableGland />
        <ParticleField />
      </Canvas>
    </div>
  );
}
