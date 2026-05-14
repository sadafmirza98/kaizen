"use client";

import dynamic from "next/dynamic";

const ZenScene = dynamic(
  () => import("./zen-scene").then((m) => m.ZenScene),
  { ssr: false }
);

export { ZenScene };
