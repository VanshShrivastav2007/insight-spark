import { useEffect, useRef } from "react";

/**
 * Ambient "AI Neural Wave" background.
 * Fixed, non-interactive layer that sits behind all app content.
 * Single canvas (no libraries), slow motion, respects prefers-reduced-motion.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const layer = layerRef.current;
    if (!canvas || !layer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    let dots: Node[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const nodeCount = Math.max(18, Math.min(46, Math.round(area / 42000)));
      const dotCount = Math.max(24, Math.min(70, Math.round(area / 26000)));

      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 1 + Math.random() * 0.9,
      }));
      dots = Array.from({ length: dotCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: -0.05 - Math.random() * 0.06,
        r: 0.5 + Math.random() * 0.9,
      }));
    };

    resize();

    // Mouse parallax (very slight, eased)
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 26;
      targetY = (e.clientY / window.innerHeight - 0.5) * 18;
    };

    const drawWave = (t: number, phase: number, amp: number, yBase: number, color: string) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 24) {
        const y =
          yBase +
          Math.sin(x / 420 + t * 0.00013 + phase) * amp +
          Math.sin(x / 190 - t * 0.00009 + phase) * amp * 0.45;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, yBase - amp, 0, height);
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fill();
    };

    let raf = 0;
    const render = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // flowing aurora waves
      drawWave(t, 0, height * 0.045, height * 0.62, "rgba(84, 96, 255, 0.10)");
      drawWave(t, 2.1, height * 0.055, height * 0.74, "rgba(150, 96, 255, 0.09)");
      drawWave(t, 4.3, height * 0.035, height * 0.86, "rgba(64, 140, 255, 0.07)");

      // neural links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 24000) {
            const alpha = (1 - d2 / 24000) * 0.16;
            ctx.strokeStyle = `rgba(150, 170, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(180, 195, 255, 0.28)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const d of dots) {
        ctx.fillStyle = "rgba(200, 190, 255, 0.22)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
        for (const d of dots) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.y < -10) {
            d.y = height + 10;
            d.x = Math.random() * width;
          }
          if (d.x < -10) d.x = width + 10;
          if (d.x > width + 10) d.x = -10;
        }

        curX += (targetX - curX) * 0.03;
        curY += (targetY - curY) * 0.03;
        layer.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;

        raf = window.requestAnimationFrame(render);
      }
    };

    raf = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div ref={layerRef} className="absolute -inset-[8%] will-change-transform">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="neural-glow neural-glow-a" />
        <div className="neural-glow neural-glow-b" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      </div>
      <div className="absolute inset-0 bg-grid-faint opacity-[0.35]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,oklch(0.12_0.03_265/0.55)_100%)]" />
    </div>
  );
}
