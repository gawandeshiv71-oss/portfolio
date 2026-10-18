import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO, PAGES_LIST } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

interface NavbarProps {
  currentPageId: string;
  onNavigate: (pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPageId, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(audioManager.isMuted);
  }, []);

  const handleLinkClick = (pageId: string) => {
    audioManager.playClick();
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  const toggleSound = () => {
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 py-3.5 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleLinkClick('home')}
            onMouseEnter={() => audioManager.playHover()}
            className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <span className="font-mono text-base font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                {PERSONAL_INFO.monogram}
              </span>
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors font-['Space_Grotesk']">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CWIT CS • AI/ML DEV
              </span>
            </div>
          </button>

          {/* Desktop Multi-Page Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-md">
            {PAGES_LIST.map((page) => {
              const isActive = currentPageId === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handleLinkClick(page.id)}
                  onMouseEnter={() => audioManager.playHover()}
                  className={`relative px-3.5 py-1.5 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 shadow-[0_0_15px_rgba(0,240,255,0.3)] border border-cyan-400/40 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 mr-1">{page.number}</span>
                  {page.title}
                  {isActive && (
                    <motion.span
                      layoutId="nav-glow-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Sound Toggle + Contact Portal */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => audioManager.playHover()}
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label="Toggle UI Audio"
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-400 transition-colors focus:outline-none cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* Quick Contact Portal Button */}
            <button
              onClick={() => handleLinkClick('contact')}
              onMouseEnter={() => audioManager.playHover()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer font-['Space_Grotesk']"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Let's Build</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                audioManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] z-50 p-4 lg:hidden"
          >
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  SECTOR DIRECTORY
                </span>
                <span>07 SECTORS</span>
              </div>

              {PAGES_LIST.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleLinkClick(page.id)}
                  className={`px-4 py-3 rounded-2xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    currentPageId === page.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-slate-500">{page.number}</span>
                    <span>{page.title}</span>
                  </span>
                  <span className="text-xs text-slate-500">&gt;</span>
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-800">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>TRANSMIT TO SHIVAM</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
