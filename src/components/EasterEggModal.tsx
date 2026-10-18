import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../utils/audio';

export const EasterEggModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedBuffer, setTypedBuffer] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      const newBuffer = (typedBuffer + key).slice(-6);
      setTypedBuffer(newBuffer);

      if (newBuffer === 'shivam') {
        triggerEasterEgg();
        setTypedBuffer('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedBuffer]);

  const triggerEasterEgg = () => {
    setIsOpen(true);
    audioManager.playPowerUp();
    audioManager.playSuccess();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#00f0ff', '#10b981', '#ef4444', '#ffffff', '#a855f7']
    });
  };

  return (
    <>
      {/* Hidden Neural Trigger Glyph in DOM (User can also click this) */}
      <button
        onClick={triggerEasterEgg}
        className="fixed bottom-3 left-3 z-30 opacity-20 hover:opacity-100 transition-opacity p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5 cursor-pointer"
        title="Secret Terminal (or type 'shivam')"
      >
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">TYPE "shivam"</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop with chromatic blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            {/* Terminal Holographic Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-red-500/40 shadow-[0_0_80px_rgba(239,68,68,0.3)] z-10 text-left overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 animate-pulse" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-mono w-fit mb-4">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>[SECURITY OVERRIDE // LEVEL 5]</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] mb-2">
                YOU FOUND THE OTHER SIDE.
              </h2>

              <p className="text-sm font-mono text-cyan-300 mb-6 leading-relaxed">
                Welcome to Shivam's Neural Workspace & Core Kernel.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 space-y-2 mb-6">
                <div className="text-emerald-400">&gt; Core Status: AI_NEURAL_KERNEL_ONLINE</div>
                <div className="text-cyan-400">&gt; Developer: Shivam Gawande (CWIT CS)</div>
                <div className="text-purple-400">&gt; Active Research: Multi-Agent Systems & Low-Latency C++ Engines</div>
                <div className="text-slate-400">&gt; Secret Glyph Unlocked. Keep building beyond boundaries.</div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                Return to Digital Universe
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
