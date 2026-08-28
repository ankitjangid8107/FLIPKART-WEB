"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const tick = () => setLeft(Math.max(0, end.getTime() - Date.now()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);

  const h = left === null ? "--" : String(Math.floor(left / 3_600_000)).padStart(2, "0");
  const m = left === null ? "--" : String(Math.floor((left % 3_600_000) / 60_000)).padStart(2, "0");
  const s = left === null ? "--" : String(Math.floor((left % 60_000) / 1000)).padStart(2, "0");

  return (
    <span className="inline-flex items-center gap-1 font-mono text-sm font-bold">
      <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-white">{h}</span>:
      <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-white">{m}</span>:
      <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-white">{s}</span>
    </span>
  );
}
