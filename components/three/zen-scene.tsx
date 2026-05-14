"use client";

import { Canvas } from "@react-three/fiber";
import { DustParticles } from "./dust-particles";
import { SakuraPetals } from "./sakura-petals";
import { Suspense } from "react";

interface ZenSceneProps {
  className?: string;
  particleColor?: string;
  showSakura?: boolean;
  particleCount?: number;
}

export function ZenScene({
  className = "",
  particleColor = "#8a7a6a",
  showSakura = true,
  particleCount = 60,
}: ZenSceneProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <DustParticles count={particleCount} color={particleColor} />
          {showSakura && <SakuraPetals count={15} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
