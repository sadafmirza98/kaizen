"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/tools/tool-layout";
import { Copy, Check, RefreshCw } from "lucide-react";

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(baseHex: string) {
  const [h, s, l] = hexToHsl(baseHex);
  return {
    shades: [90, 80, 70, 60, 50, 40, 30, 20, 10].map((lightness) => ({
      hex: hslToHex(h, s, lightness),
      label: `${lightness * 10 > 500 ? 1000 - lightness * 10 : lightness * 10}`,
    })),
    complementary: hslToHex((h + 180) % 360, s, l),
    analogous: [
      hslToHex((h + 30) % 360, s, l),
      hslToHex((h - 30 + 360) % 360, s, l),
    ],
    triadic: [
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l),
    ],
    split: [
      hslToHex((h + 150) % 360, s, l),
      hslToHex((h + 210) % 360, s, l),
    ],
  };
}

function ColorSwatch({ hex, label }: { hex: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="group flex flex-col items-center gap-1.5"
      aria-label={`Copy ${hex}`}
    >
      <div
        className="w-full h-12 rounded-lg border border-black/10 transition-transform group-hover:scale-105"
        style={{ backgroundColor: hex }}
      />
      <div className="flex items-center gap-1">
        {copied
          ? <Check className="w-2.5 h-2.5 text-green-500" />
          : <Copy className="w-2.5 h-2.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />}
        <span className="text-[10px] font-mono text-muted-foreground">{label ?? hex}</span>
      </div>
    </button>
  );
}

function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#5c7a5c");
  const [palette, setPalette] = useState(() => generatePalette("#5c7a5c"));

  const generate = useCallback(() => {
    setPalette(generatePalette(baseColor));
  }, [baseColor]);

  const randomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    setBaseColor(hex);
    setPalette(generatePalette(hex));
  };

  return (
    <div className="space-y-6">
      {/* Color picker */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 flex-1 max-w-xs">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
            aria-label="Base color picker"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setBaseColor(v);
            }}
            className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none"
            aria-label="Hex color value"
          />
        </div>
        <button
          onClick={generate}
          className="flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Generate
        </button>
        <button
          onClick={randomColor}
          className="p-3 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Random color"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Shades */}
      <div className="space-y-2">
        <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Shades</h3>
        <div className="grid grid-cols-9 gap-2">
          {palette.shades.map((s) => (
            <ColorSwatch key={s.hex} hex={s.hex} label={s.hex} />
          ))}
        </div>
      </div>

      {/* Harmonies */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Complementary</h3>
          <div className="grid grid-cols-2 gap-2">
            <ColorSwatch hex={baseColor} />
            <ColorSwatch hex={palette.complementary} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Analogous</h3>
          <div className="grid grid-cols-3 gap-2">
            <ColorSwatch hex={palette.analogous[0]} />
            <ColorSwatch hex={baseColor} />
            <ColorSwatch hex={palette.analogous[1]} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs text-muted-foreground uppercase tracking-wide">Triadic</h3>
          <div className="grid grid-cols-3 gap-2">
            <ColorSwatch hex={baseColor} />
            <ColorSwatch hex={palette.triadic[0]} />
            <ColorSwatch hex={palette.triadic[1]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorPalettePage() {
  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate harmonious color palettes — shades, complementary, analogous, and triadic."
      category="generators"
    >
      <ColorPaletteGenerator />
    </ToolLayout>
  );
}
