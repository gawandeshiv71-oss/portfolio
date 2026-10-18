import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

type RenderMode = 'particles' | 'dither' | 'wireframe' | 'glitch';

export const DigitalIdentityPortrait: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<RenderMode>('particles');
  const [photoSource, setPhotoSource] = useState<'badge' | 'outdoor'>('badge');
  const [isHovered, setIsHovered] = useState(false);
  const [particleStats, setParticleStats] = useState({ count: 0, fps: 60 });

  const activePhotoUrl =
    photoSource === 'badge'
      ? PERSONAL_INFO.avatarPhotos.badge
      : PERSONAL_INFO.avatarPhotos.outdoor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -9999, y: -9999, radius: 75 };

    interface Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      brightness: number;
    }

    let particles: Particle[] = [];

    // Load Image and Sample Pixels
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activePhotoUrl;

    img.onload = () => {
      // Set canvas display resolution
      const w = 380;
      const h = 500;
      canvas.width = w;
      canvas.height = h;

      // Draw image offscreen to sample pixels
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCanvas.width = w;
      offCanvas.height = h;

      // Draw aspect-cover
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let drawW = w;
      let drawH = h;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        drawW = h * imgAspect;
        offsetX = -(drawW - w) / 2;
      } else {
        drawH = w / imgAspect;
        offsetY = -(drawH - h) / 2;
      }

      offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
      const imgData = offCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Density step for particles
      const step = 5;
      particles = [];

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a > 30) {
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            
            // Stylize with cyber tint (electric blue + neon emerald)
            const cyR = Math.floor(r * 0.5);
            const cyG = Math.floor(g * 0.8 + 40);
            const cyB = Math.floor(b * 1.0 + 60);

            particles.push({
              x: x + (Math.random() - 0.5) * 40,
              y: y + (Math.random() - 0.5) * 40,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              color: `rgb(${cyR}, ${cyG}, ${cyB})`,
              size: Math.max(1.2, brightness * 3.2),
              brightness
            });
          }
        }
      }

      setParticleStats((prev) => ({ ...prev, count: particles.length }));
    };

    // Mouse Listeners on Canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouse.x = (e.clientX - rect.left) * scaleX;
      mouse.y = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      audioManager.playHover();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('mouseenter', handleMouseEnter);

    // Animation Render Loop
    let time = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.03;

      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mode === 'particles') {
        // Particle Point Cloud Mode
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Distance from mouse
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Repulsion physics
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 7;
            p.vy -= Math.sin(angle) * force * 7;
          }

          // Spring back to origin
          const homeX = p.ox + Math.sin(time + p.oy * 0.05) * 1.5;
          const homeY = p.oy + Math.cos(time + p.ox * 0.05) * 1.5;
          const returnForceX = (homeX - p.x) * 0.08;
          const returnForceY = (homeY - p.y) * 0.08;

          p.vx += returnForceX;
          p.vy += returnForceY;
          p.vx *= 0.84;
          p.vy *= 0.84;

          p.x += p.vx;
          p.y += p.vy;

          // Render Particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (mode === 'dither') {
        // Futuristic Dot-Matrix Dither
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dist = Math.hypot(mouse.x - p.ox, mouse.y - p.oy);
          const active = dist < 70;

          ctx.fillStyle = active
            ? '#00f0ff'
            : p.brightness > 0.5
            ? '#38bdf8'
            : '#0f3c5c';

          ctx.fillRect(
            p.ox - (active ? 2 : 1),
            p.oy - (active ? 2 : 1),
            active ? 3.5 : p.brightness * 2.8,
            active ? 3.5 : p.brightness * 2.8
          );
        }
      } else if (mode === 'wireframe') {
        // Holographic Wireframe Scan
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i += 2) {
          const p = particles[i];
          if (p.brightness > 0.4) {
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(p.ox, p.oy, 1.5, 1.5);

            const next = particles[i + 1];
            if (next && Math.hypot(p.ox - next.ox, p.oy - next.oy) < 15) {
              ctx.beginPath();
              ctx.moveTo(p.ox, p.oy);
              ctx.lineTo(next.ox, next.oy);
              ctx.stroke();
            }
          }
        }
      } else if (mode === 'glitch') {
        // RGB Displacement Glitch
        for (let i = 0; i < particles.length; i += 2) {
          const p = particles[i];
          const shift = Math.sin(time * 8 + p.oy * 0.1) * 6;

          // Cyan channel
          ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
          ctx.fillRect(p.ox + shift, p.oy, 2, 2);

          // Crimson channel
          ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
          ctx.fillRect(p.ox - shift, p.oy, 2, 2);
        }
      }

      // Digital Scanline Laser Line
      const scanY = (time * 60) % canvas.height;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [activePhotoUrl, mode]);

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Outer Holographic Frame */}
      <div className="relative glass-panel rounded-3xl p-4 sm:p-5 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            DIGITAL_ID // SHIVAM_GAWANDE
          </span>
          <span className="text-slate-500">
            {particleStats.count > 0 ? `${particleStats.count} PARTICLES` : 'COMPUTING...'}
          </span>
        </div>

        {/* The Interactive Canvas */}
        <div className="relative w-full aspect-[380/500] rounded-2xl bg-[#030712] overflow-hidden border border-cyan-500/20 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover cursor-crosshair select-none"
          />

          {/* Biometric HUD Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

          {/* Hover interaction cue */}
          <div
            className={`absolute bottom-3 left-4 right-4 py-1.5 px-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-center text-[10px] font-mono text-cyan-300 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {isHovered ? '⚡ CURSOR FIELD ACTIVE • PARTICLES DISPLACING' : 'TOUCH / HOVER TO INTERACT WITH FACE PARTICLES'}
          </div>
        </div>

        {/* Bottom Mode Switcher HUD */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>RECONSTRUCTION MODE:</span>
            {/* Toggle Photo Source */}
            <button
              onClick={() => {
                audioManager.playClick();
                setPhotoSource((p) => (p === 'badge' ? 'outdoor' : 'badge'));
              }}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{photoSource === 'badge' ? 'Event Photo' : 'Portrait Photo'}</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {(['particles', 'dither', 'wireframe', 'glitch'] as RenderMode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  audioManager.playClick();
                  setMode(m);
                }}
                className={`py-1.5 px-2 rounded-lg text-[10px] font-mono uppercase transition-all duration-200 cursor-pointer ${
                  mode === m
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
