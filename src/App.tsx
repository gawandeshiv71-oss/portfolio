import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsUniverse } from './components/SkillsUniverse';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { LearningJourney } from './components/LearningJourney';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { PagesHUD } from './components/PagesHUD';
import { EasterEggModal } from './components/EasterEggModal';
import { PAGES_LIST } from './data/portfolioData';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageId, setCurrentPageId] = useState<string>('home');

  // Sync hash on mount and on popstate
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const match = PAGES_LIST.find((p) => p.id === hash);
      if (match) {
        setCurrentPageId(match.id);
      }
    };

    syncFromHash();
    window.addEventListener('popstate', syncFromHash);
    return () => window.removeEventListener('popstate', syncFromHash);
  }, []);

  // Keyboard navigation: 1-7 or Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // Keys 1 to 7
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= PAGES_LIST.length) {
        navigateToPage(PAGES_LIST[num - 1].id);
        return;
      }

      const currentIndex = PAGES_LIST.findIndex((p) => p.id === currentPageId);
      if (e.key === 'ArrowRight' && currentIndex < PAGES_LIST.length - 1) {
        navigateToPage(PAGES_LIST[currentIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToPage(PAGES_LIST[currentIndex - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageId]);

  const navigateToPage = (pageId: string) => {
    setCurrentPageId(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentPageIndex = Math.max(
    0,
    PAGES_LIST.findIndex((p) => p.id === currentPageId)
  );

  const renderActivePage = () => {
    switch (currentPageId) {
      case 'home':
        return <Hero onNavigate={navigateToPage} />;
      case 'about':
        return <About onNavigate={navigateToPage} />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <SkillsUniverse />;
      case 'journey':
        return (
          <div className="flex flex-col">
            <LearningJourney />
            <Education />
          </div>
        );
      case 'achievements':
        return <Achievements />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={navigateToPage} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Secret Easter Egg listener */}
      <EasterEggModal />

      {/* Futuristic Preloader */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Futuristic OS Navbar */}
      <Navbar
        currentPageId={currentPageId}
        onNavigate={navigateToPage}
      />

      {/* Main Cinematic Multi-Page Transition Stage */}
      <main className="relative flex flex-col min-h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPageId}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Floating Sector HUD Navigation */}
      <PagesHUD
        currentPageIndex={currentPageIndex}
        onPageChange={(idx) => navigateToPage(PAGES_LIST[idx].id)}
      />

      {/* Global Futuristic Footer */}
      <Footer />
    </div>
  );
}

export default App;
