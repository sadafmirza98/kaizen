"use client";

import { motion } from "framer-motion";

function SteamWisp({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute bottom-full"
      style={{ left: `${x}%`, width: 2, originY: 1 }}
      animate={{ y: [0, -24, -40], opacity: [0, 0.4, 0], scaleX: [1, 1.8, 2.5] }}
      transition={{ duration: 2.2 + delay * 0.4, repeat: Infinity, delay, ease: "easeOut" }}
    >
      <div className="w-full h-7 rounded-full" style={{ background: "linear-gradient(to top, oklch(0.72 0.008 85 / 0.35), transparent)" }} />
    </motion.div>
  );
}

function RainStreak({ x, duration, delay }: { x: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-px"
      style={{
        left: `${x}%`,
        height: "40%",
        background: "linear-gradient(to bottom, transparent, oklch(0.72 0.008 85 / 0.25), transparent)",
      }}
      animate={{ y: ["-100%", "300%"] }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    />
  );
}

export function WorkspaceScene() {
  return (
    <div className="relative w-full h-full" aria-hidden>

      {/* Large shoji circle — the moon/window */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%", right: "8%",
          width: "55%",
          aspectRatio: "1",
          borderRadius: "50%",
          border: "1px solid oklch(1 0 0 / 0.12)",
          background: "radial-gradient(circle at 45% 40%, oklch(0.45 0.04 100 / 0.35) 0%, oklch(0.30 0.03 90 / 0.20) 50%, transparent 75%)",
          boxShadow: "inset 0 0 60px oklch(0.55 0.06 90 / 0.15), 0 0 80px oklch(0.55 0.06 90 / 0.08)",
        }}
      >
        {/* Inner ring */}
        <div
          className="absolute"
          style={{
            inset: "8%",
            borderRadius: "50%",
            border: "1px solid oklch(1 0 0 / 0.06)",
          }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px" style={{ background: "oklch(1 0 0 / 0.05)" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px" style={{ background: "oklch(1 0 0 / 0.05)" }} />
        </div>

        {/* Rain inside circle */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[15, 30, 45, 60, 75, 88].map((x, i) => (
            <RainStreak key={i} x={x} duration={1.0 + i * 0.12} delay={i * 0.18} />
          ))}
        </div>
      </div>

      {/* Bonsai silhouette — atmospheric, dark */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "28%", right: "12%", width: "22%", aspectRatio: "0.7" }}
      >
        {/* Trunk */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "8%",
            height: "45%",
            background: "oklch(0.18 0.008 60 / 0.7)",
            borderRadius: "2px 2px 0 0",
          }}
        />
        {/* Canopy layers */}
        {[
          { w: "90%", h: "35%", bottom: "38%", left: "5%", opacity: 0.55 },
          { w: "70%", h: "28%", bottom: "55%", left: "15%", opacity: 0.45 },
          { w: "50%", h: "22%", bottom: "68%", left: "25%", opacity: 0.35 },
        ].map((layer, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: layer.w,
              height: layer.h,
              bottom: layer.bottom,
              left: layer.left,
              background: `radial-gradient(ellipse at 40% 40%, oklch(0.28 0.06 140 / ${layer.opacity}) 0%, oklch(0.20 0.04 130 / ${layer.opacity * 0.6}) 100%)`,
            }}
          />
        ))}
      </div>

      {/* Laptop on desk */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "22%", left: "18%", width: "38%" }}
      >
        {/* Screen */}
        <div
          style={{
            background: "oklch(0.10 0.005 60)",
            border: "1px solid oklch(1 0 0 / 0.15)",
            borderRadius: "6px 6px 0 0",
            aspectRatio: "16/10",
            padding: "8px",
            boxShadow: "0 0 40px oklch(0.42 0.06 145 / 0.15)",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "oklch(0.08 0.004 60)",
              borderRadius: 3,
              padding: "8px 10px",
              fontFamily: "monospace",
              fontSize: 7,
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: "oklch(0.45 0.008 60)" }}>~/projects/kaizen</div>
            <div>
              <span style={{ color: "oklch(0.55 0.10 145)" }}>❯ </span>
              <span style={{ color: "oklch(0.72 0.008 85)" }}>kaizen --help</span>
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ color: "oklch(0.62 0.08 80)" }}
            >
              150+ microtools at your fingertips.
            </motion.div>
            <div style={{ marginTop: 4 }}>
              <span style={{ color: "oklch(0.45 0.008 60)" }}>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ▋
                </motion.span>
              </span>
            </div>
          </div>
        </div>
        {/* Base */}
        <div
          style={{
            height: 6,
            background: "linear-gradient(to bottom, oklch(0.28 0.008 60), oklch(0.22 0.006 60))",
            borderRadius: "0 0 4px 4px",
          }}
        />
      </div>

      {/* Tea cup */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: "22%", left: "8%", width: "8%" }}
      >
        <div className="relative flex flex-col items-center">
          <SteamWisp delay={0} x={20} />
          <SteamWisp delay={0.8} x={60} />
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              background: "linear-gradient(135deg, oklch(0.22 0.008 60), oklch(0.18 0.006 60))",
              borderRadius: "0 0 50% 50% / 0 0 40% 40%",
              border: "1px solid oklch(1 0 0 / 0.12)",
            }}
          />
          <div
            style={{
              width: "130%",
              height: 3,
              background: "oklch(0.20 0.008 60)",
              borderRadius: 2,
              marginTop: -1,
            }}
          />
        </div>
      </div>

      {/* Hanging lantern */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: "8%", right: "35%", transformOrigin: "top center" }}
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ width: 1, height: 20, background: "oklch(1 0 0 / 0.15)", margin: "0 auto" }} />
        <div
          style={{
            width: 16,
            height: 22,
            borderRadius: "40%",
            background: "radial-gradient(ellipse at 40% 35%, oklch(0.75 0.10 75 / 0.9), oklch(0.55 0.08 65 / 0.7))",
            boxShadow: "0 0 12px 4px oklch(0.72 0.10 75 / 0.20)",
          }}
        />
      </motion.div>

      {/* Desk surface */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: "22%",
          background: "linear-gradient(to bottom, oklch(0.22 0.010 65 / 0.8), oklch(0.16 0.008 60))",
          borderTop: "1px solid oklch(1 0 0 / 0.08)",
        }}
      />

      {/* Ambient floor glow */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: "30%",
          background: "linear-gradient(to top, oklch(0.14 0.010 70 / 0.6), transparent)",
        }}
      />
    </div>
  );
}
