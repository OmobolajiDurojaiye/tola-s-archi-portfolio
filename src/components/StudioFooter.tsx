import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, FileDown, MapPin } from 'lucide-react';
import { PROFILE } from '../data/profile';

/**
 * Interactive Pixel & Architectural Light Canvas Footer inspired by Image 2:
 * Obsidian black backdrop, giant split-depth serif "Architecture" typography,
 * and an animated minimalist cantilevered pavilion rendered in living cream & nude pixels.
 */
export function StudioFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let time = 0;

    // Floating blueprint pixel particles
    const particles = Array.from({ length: 46 }, (_, idx) => ({
      x: (idx * 37) % 100 / 100,
      y: (idx * 61) % 100 / 100,
      speed: 0.00018 + (idx % 5) * 0.00009,
      size: idx % 3 === 0 ? 4 : 2.5,
      phase: idx * 0.7,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawPixelRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      cell: number,
      color: string,
      density = 1,
      waveOffset = 0
    ) => {
      ctx.fillStyle = color;
      for (let px = x; px < x + w; px += cell) {
        for (let py = y; py < y + h; py += cell) {
          const wave = Math.sin(px * 0.04 + py * 0.03 + time * 1.4 + waveOffset);
          if (density >= 1 || wave > 1 - density * 2) {
            ctx.fillRect(Math.round(px), Math.round(py), cell - 1, cell - 1);
          }
        }
      }
    };

    const render = () => {
      time += 0.016;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      // Obsidian base
      ctx.fillStyle = '#0E0D0C';
      ctx.fillRect(0, 0, W, H);

      // Interactive ambient light aura
      const lx = pointerRef.current.active
        ? pointerRef.current.x * W
        : W * (0.5 + Math.sin(time * 0.45) * 0.16);
      const ly = pointerRef.current.active
        ? pointerRef.current.y * H
        : H * (0.46 + Math.cos(time * 0.35) * 0.08);

      const aura = ctx.createRadialGradient(lx, ly, 10, lx, ly, Math.max(W, H) * 0.48);
      aura.addColorStop(0, 'rgba(216, 195, 168, 0.24)');
      aura.addColorStop(0.45, 'rgba(198, 168, 140, 0.09)');
      aura.addColorStop(1, 'rgba(14, 13, 12, 0)');
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, W, H);

      // Subtle architectural pixel dot grid
      const gridStep = W < 640 ? 22 : 28;
      ctx.fillStyle = 'rgba(247, 243, 236, 0.055)';
      for (let gx = gridStep / 2; gx < W; gx += gridStep) {
        for (let gy = gridStep / 2; gy < H; gy += gridStep) {
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
      }

      // Compute responsive pavilion geometry centered in canvas
      const scale = Math.min(W / 560, H / 320, 1.25);
      const cx = W / 2;
      const baseY = H * 0.78;
      const cell = Math.max(3, Math.round(4.2 * scale));

      // Floating plinth steps (Cream)
      const plinthW = 340 * scale;
      drawPixelRect(cx - plinthW * 0.5, baseY, plinthW, 12 * scale, cell, '#F7F3EC', 1);
      drawPixelRect(cx - plinthW * 0.44, baseY - 12 * scale, plinthW * 0.88, 11 * scale, cell, '#EADFD1', 0.96, 1);

      // Ground floor glass pavilion (warm amber/nude lit interior)
      const gfW = 260 * scale;
      const gfH = 82 * scale;
      const gfX = cx - gfW * 0.48;
      const gfY = baseY - 12 * scale - gfH;

      // Interior glow gradient
      const glowPulse = 0.72 + Math.sin(time * 1.6) * 0.14;
      drawPixelRect(
        gfX + 6 * scale,
        gfY + 6 * scale,
        gfW - 12 * scale,
        gfH - 8 * scale,
        cell,
        `rgba(216, 195, 168, ${glowPulse * 0.42})`,
        0.78,
        0.5
      );

      // Ground floor structural mullions (Obsidian black)
      ctx.fillStyle = '#0E0D0C';
      for (let m = 0; m <= 5; m++) {
        const mx = gfX + (gfW / 5) * m;
        ctx.fillRect(mx, gfY, Math.max(2, 3 * scale), gfH);
      }

      // Cantilevered upper cream architectural box (Signature Image 2 silhouette)
      const upW = 290 * scale;
      const upH = 96 * scale;
      const upX = cx - upW * 0.54;
      const upY = gfY - upH + 4 * scale;

      // Outer cream shell
      drawPixelRect(upX, upY, upW, 14 * scale, cell, '#F7F3EC', 1);
      drawPixelRect(upX, upY + upH - 14 * scale, upW, 14 * scale, cell, '#F7F3EC', 1);
      drawPixelRect(upX, upY, 16 * scale, upH, cell, '#F7F3EC', 1);
      drawPixelRect(upX + upW - 22 * scale, upY, 22 * scale, upH, cell, '#DFCBB5', 0.98, 2);

      // Recessed upper gallery window with animated nude/cream shimmer
      drawPixelRect(
        upX + 22 * scale,
        upY + 18 * scale,
        upW - 50 * scale,
        upH - 36 * scale,
        cell,
        'rgba(198, 168, 140, 0.32)',
        0.65,
        2.2
      );

      // Upper window vertical black mullions
      ctx.fillStyle = '#0E0D0C';
      for (let m = 1; m <= 3; m++) {
        const mx = upX + 22 * scale + ((upW - 50 * scale) / 4) * m;
        ctx.fillRect(mx, upY + 16 * scale, Math.max(2, 2.5 * scale), upH - 32 * scale);
      }

      // Perspective right side wall extension
      drawPixelRect(
        upX + upW,
        upY + 18 * scale,
        46 * scale,
        upH + gfH - 22 * scale,
        cell,
        'rgba(234, 223, 209, 0.34)',
        0.62,
        3.1
      );

      // Rising luminous pixel dust
      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -0.05) p.y = 1.05;
        const alpha = 0.25 + 0.35 * Math.sin(time * 2 + p.phase);
        ctx.fillStyle = p.phase % 2 > 1 ? `rgba(247, 243, 236, ${alpha})` : `rgba(198, 168, 140, ${alpha})`;
        ctx.fillRect(p.x * W, p.y * H, p.size, p.size);
      }

      animationId = window.requestAnimationFrame(render);
    };

    animationId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  };

  return (
    <footer className="relative bg-[#0E0D0C] text-[#F7F3EC] overflow-hidden mt-12 sm:mt-20">
      {/* Interactive Pixel Architectural Pavilion Stage */}
      <div
        onPointerMove={handleMove}
        onPointerLeave={() => {
          pointerRef.current.active = false;
        }}
        className="relative h-[300px] sm:h-[420px] w-full flex items-center justify-center overflow-hidden border-b border-[#D8C3A8]/15"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />

        {/* Depth-layered monumental serif typography inspired by Image 2 */}
        <div className="relative z-10 pointer-events-none select-none text-center px-4">
          <h2 className="font-serif-display font-light tracking-[-0.02em] leading-none text-[clamp(3.3rem,13vw,10.5rem)] flex items-baseline justify-center">
            <span className="text-[#F7F3EC]/95 drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              Archit
            </span>
            <span className="text-[#F7F3EC]/25 mix-blend-overlay">ec</span>
            <span className="text-[#D8C3A8] drop-shadow-[0_8px_28px_rgba(198,168,140,0.45)]">
              ture
            </span>
          </h2>
          <p className="mt-2 font-mono-arch text-[10px] sm:text-xs uppercase tracking-[0.28em] text-[#D8C3A8]/85">
            Durojaiye Omotola Opeyemi · Interactive Pixel Pavilion
          </p>
        </div>
      </div>

      {/* SIWES Contact & Navigation Band */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F3EC]/10 border border-[#D8C3A8]/25 font-mono-arch text-[10px] uppercase tracking-[0.18em] text-[#D8C3A8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8C3A8]" />
              Open for SIWES Placement
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl text-[#F7F3EC] leading-tight">
              Ready to contribute to your architecture studio.
            </h3>
            <p className="text-xs sm:text-sm text-[#EADFD1]/70 leading-relaxed max-w-md">
              300-level B.Sc. Architecture student at Nile University of Nigeria. Available for SIWES internships in Abuja and across Nigeria.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="font-mono-arch text-[10px] uppercase tracking-[0.2em] text-[#C6A88C]">
              Direct Contact
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href={PROFILE.emailHref}
                className="flex items-center gap-2.5 text-[#F7F3EC] hover:text-[#D8C3A8] transition"
              >
                <Mail className="w-4 h-4 text-[#C6A88C]" />
                <span className="break-all">{PROFILE.email}</span>
              </a>
              <a
                href={PROFILE.phoneHref}
                className="flex items-center gap-2.5 text-[#F7F3EC] hover:text-[#D8C3A8] transition"
              >
                <Phone className="w-4 h-4 text-[#C6A88C]" />
                <span>{PROFILE.phone}</span>
              </a>
              <div className="flex items-center gap-2.5 text-[#EADFD1]/70">
                <MapPin className="w-4 h-4 text-[#C6A88C]" />
                <span>{PROFILE.location}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2.5">
            <p className="font-mono-arch text-[10px] uppercase tracking-[0.2em] text-[#C6A88C]">
              Quick Links
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#F7F3EC] text-[#0E0D0C] text-xs sm:text-sm font-medium hover:bg-[#EADFD1] transition"
            >
              <span>Browse All 15 Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#F7F3EC]/10 border border-[#D8C3A8]/25 text-[#F7F3EC] text-xs sm:text-sm font-medium hover:bg-[#F7F3EC]/15 transition"
            >
              <span>Download Full CV (PDF)</span>
              <FileDown className="w-4 h-4 text-[#D8C3A8]" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#F7F3EC]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono-arch text-[#EADFD1]/50">
          <span>© 2026 {PROFILE.fullName}</span>
          <span>Nile University of Nigeria · B.Sc. Architecture</span>
        </div>
      </div>
    </footer>
  );
}
