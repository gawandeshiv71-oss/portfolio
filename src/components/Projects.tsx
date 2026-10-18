import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  Sparkles,
  ArrowUpRight,
  Shield,
  Activity,
  Car,
  Truck
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './SocialIcons';
import { audioManager } from '../utils/audio';

// Interactive 3D Tilt Card Component
const Project3DCard: React.FC<{
  project: ProjectItem;
  index: number;
  onOpenModal: (p: ProjectItem) => void;
}> = ({ project, index, onOpenModal }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Specific visual mockup design for each project
  const renderMockup = () => {
    switch (project.id) {
      case 'transitos':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-900 border border-cyan-500/25 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-cyan-400 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-300">
                <Truck className="w-4 h-4 text-cyan-400" />
                TRANSIT_OS // TELEMETRY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                ACTIVE
              </span>
            </div>
            {/* Visual radar/route map graphic */}
            <div className="relative z-10 py-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>FLEET DISPATCH</span>
                <span className="text-emerald-400">98.6% ON-TIME</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="w-3/4 h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 z-10 text-[10px] font-mono text-slate-400">
              <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">TRUCKS: 48</div>
              <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">OWNERS: 12</div>
              <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">AI: ONLINE</div>
            </div>
          </div>
        );
      case 'aos-ai-ca':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900 border border-emerald-500/25 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-emerald-400 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-300">
                <Activity className="w-4 h-4 text-emerald-400" />
                AOS // CA AGENT PIPELINE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                AUTONOMOUS
              </span>
            </div>
            <div className="z-10 space-y-1.5 font-mono text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&gt;</span>
                <span className="text-slate-400">Reconciling ledger entries...</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">&gt;</span>
                <span className="text-white">GST discrepancy: 0 anomalies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span>
                <span className="text-slate-400">Automated audit summary generated.</span>
              </div>
            </div>
            <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-400">
              <span>WORKFLOW: +75% FASTER</span>
              <span className="text-emerald-400 font-bold">100% RECONCILED</span>
            </div>
          </div>
        );
      case 'atm-management':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 border border-purple-500/25 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-purple-400 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 text-xs font-mono text-purple-300">
                <Shield className="w-4 h-4 text-purple-400" />
                C++ ATM ENGINE // OOP
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                SECURE
              </span>
            </div>
            <div className="z-10 font-mono text-[11px] bg-slate-950/80 p-2.5 rounded-lg border border-purple-900/50 text-slate-300 space-y-1">
              <div><span className="text-purple-400">class</span> <span className="text-white font-bold">AccountManager</span> {'{'}</div>
              <div className="pl-3 text-slate-400">authenticatePIN(cardId, pin);</div>
              <div className="pl-3 text-emerald-400">commitLedgerTransaction();</div>
              <div>{'}'};</div>
            </div>
            <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-400">
              <span>MEM OPTIMIZED</span>
              <span className="text-purple-400 font-bold">C++ 17 RUNTIME</span>
            </div>
          </div>
        );
      case 'royal-ride':
        return (
          <div className="w-full h-44 rounded-xl bg-gradient-to-br from-slate-950 via-rose-950/40 to-slate-900 border border-rose-500/25 p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-rose-400 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl" />
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 text-xs font-mono text-rose-300">
                <Car className="w-4 h-4 text-rose-400" />
                ROYAL RIDE // FLEET
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                LUXURY
              </span>
            </div>
            <div className="z-10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                <span>RELATIONAL DB:</span>
                <span className="text-rose-400 font-bold">3NF NORMALIZED</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                <span>RESERVATIONS:</span>
                <span className="text-emerald-400 font-bold">REAL-TIME SYNC</span>
              </div>
            </div>
            <div className="flex items-center justify-between z-10 text-[10px] font-mono text-slate-400">
              <span>SQL INTEGRATION</span>
              <span className="text-rose-400 font-bold">FLEET AUDITED</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          audioManager.playHover();
        }}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'translateZ(24px)' : 'translateZ(0px)'
          }`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative glass-panel rounded-3xl p-6 sm:p-7 border border-slate-700/60 hover:border-cyan-400/60 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full group"
      >
        {/* Top Mockup Showcase */}
        <div className="mb-5">
          {renderMockup()}
        </div>

        {/* Project Metadata & Descriptions */}
        <div className="flex-1 flex flex-col text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                FEATURED
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk'] mb-1">
            {project.title}
          </h3>

          <p className="text-xs font-mono text-cyan-400/90 mb-3">
            {project.tagline}
          </p>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/90 border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              audioManager.playClick();
            }}
            onMouseEnter={() => audioManager.playHover()}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <button
            onClick={() => {
              audioManager.playClick();
              onOpenModal(project);
            }}
            onMouseEnter={() => audioManager.playHover()}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span>Live Specs</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-28 w-full overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>DEPLOYED SYSTEMS & RESEARCH</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            3D Projects <span className="text-gradient">Showcase</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Real-world software architectures spanning AI agents, logistics platforms, systems engineering in C++, and relational databases.
          </motion.p>
        </div>

        {/* 3D Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((proj, idx) => (
            <Project3DCard
              key={proj.id}
              project={proj}
              index={idx}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
