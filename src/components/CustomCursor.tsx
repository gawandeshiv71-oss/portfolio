import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'open' | 'orbit'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, select, [role="button"]');
      const projectCard = target.closest('[data-cursor="view"]');
      const externalLink = target.closest('a[target="_blank"]');
      const canvas3D = target.closest('canvas, [data-cursor="orbit"]');

      if (projectCard) {
        setCursorType('view');
      } else if (externalLink) {
        setCursorType('open');
      } else if (canvas3D) {
        setCursorType('orbit');
      } else if (interactive) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop for the outer cursor ring
    let animId: number;
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.2,
        y: prev.y + (targetPos.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, targetPos]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision inner center dot */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
        }}
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Outer interactive follower ring */}
      <div
        className={`fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out flex items-center justify-center font-mono font-bold text-[9px] uppercase tracking-wider ${
          cursorType === 'view'
            ? 'w-14 h-14 bg-cyan-500/20 border border-cyan-400 text-cyan-200 backdrop-blur-sm shadow-[0_0_20px_rgba(0,240,255,0.4)]'
            : cursorType === 'open'
            ? 'w-14 h-14 bg-emerald-500/20 border border-emerald-400 text-emerald-200 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.4)]'
            : cursorType === 'orbit'
            ? 'w-16 h-16 border-2 border-dashed border-cyan-400/80 animate-spin text-[8px] text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
            : cursorType === 'pointer'
            ? 'w-10 h-10 border border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
            : 'w-7 h-7 border border-slate-500/60'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          animationDuration: cursorType === 'orbit' ? '8s' : '0s',
        }}
      >
        {cursorType === 'view' && <span>VIEW</span>}
        {cursorType === 'open' && <span>OPEN</span>}
        {cursorType === 'orbit' && <span className="rotate-90">3D</span>}
      </div>
    </>
  );
};
