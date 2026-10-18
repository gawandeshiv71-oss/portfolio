import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Layers, Sparkles, Terminal } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { GithubIcon } from './SocialIcons';
import { audioManager } from '../utils/audio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            audioManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex flex-col gap-2 mb-6 pr-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cyber-badge text-xs font-mono w-fit">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-cyan-300 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {project.stats.map((st, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="block text-[10px] font-mono text-slate-500 uppercase">{st.label}</span>
                <span className="text-sm font-bold text-white">{st.value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6 text-left">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Project Architecture & Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="space-y-2">
              {project.fullDetails.map((detail, idx) => (
                <p key={idx} className="text-xs text-slate-400 leading-relaxed pl-3 border-l-2 border-cyan-500/40">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-6 text-left">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Key System Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-8 text-left">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioManager.playClick()}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-600 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Source Repository</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playClick()}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Interface</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
