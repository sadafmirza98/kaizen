"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SakuraPetalsProps {
  count?: number;
}

export function SakuraPetals({ count = 20 }: SakuraPetalsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 18,
      y: Math.random() * 14 - 4,
      z: (Math.random() - 0.5) * 6,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      speedY: -(Math.random() * 0.008 + 0.004),
      speedX: (Math.random() - 0.5) * 0.004,
      speedRot: (Math.random() - 0.5) * 0.02,
      phase: Math.random() * Math.PI * 2,
      id: i,
    }));
  }, [count]);

  const petalData = useRef(petals);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const p = petalData.current[i];
      if (!p) return;

      p.y += p.speedY;
      p.x += p.speedX + Math.sin(t * 0.5 + p.phase) * 0.003;
      p.rotZ += p.speedRot;

      child.position.set(p.x, p.y, p.z);
      child.rotation.set(p.rotX, p.rotY, p.rotZ);

      if (p.y < -8) {
        p.y = 8;
        p.x = (Math.random() - 0.5) * 18;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {petals.map((petal) => (
        <mesh
          key={petal.id}
          position={[petal.x, petal.y, petal.z]}
          rotation={[petal.rotX, petal.rotY, petal.rotZ]}
        >
          <planeGeometry args={[0.12, 0.08]} />
          <meshBasicMaterial
            color="#e8b4b8"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
