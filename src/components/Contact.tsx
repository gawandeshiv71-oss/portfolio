import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  Phone,
  Sparkles,
  Terminal,
  MessageSquare,
  CheckCircle2,
  Clock,
  User,
  AtSign
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { audioManager } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioManager.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all neural matrix fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate futuristic transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      audioManager.playSuccess();

      // Launch celebratory particle confetti
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#10b981', '#8b5cf6', '#ffffff']
      });

      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 1200);
  };

  return (
    <section className="relative min-h-[92vh] py-20 w-full overflow-hidden flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 07 // TRANSMISSION TERMINAL</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-['Space_Grotesk'] uppercase"
          >
            LET'S BUILD <span className="text-gradient">SOMETHING.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm font-mono max-w-xl mx-auto mt-2"
          >
            Have a project in mind, an opportunity, or want to collaborate on AI and software? Connect directly.
          </motion.p>
        </div>

        {/* 3D Holographic Contact Stage */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Real Communication Nodes */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    DIRECT COMMS
                  </span>
                  <span className="text-emerald-400">STATUS: ONLINE</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk'] mb-2">
                  Shivam Gawande
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  Computer Science Student & AI Developer based in Pune, India. Ready to engineer real-world software and autonomous systems.
                </p>

                {/* Direct channel links */}
                <div className="space-y-3">
                  {/* Email */}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onMouseEnter={() => audioManager.playHover()}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 hover:bg-slate-800/60 transition-all text-xs font-mono text-slate-300 group"
                  >
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[10px] text-slate-500 uppercase">Direct Email</span>
                      <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                        {PERSONAL_INFO.email}
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    onMouseEnter={() => audioManager.playHover()}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-400/60 hover:bg-slate-800/60 transition-all text-xs font-mono text-slate-300 group"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">Voice / WhatsApp</span>
                      <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                        +91 {PERSONAL_INFO.phone}
                      </span>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => audioManager.playHover()}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-400/60 hover:bg-slate-800/60 transition-all text-xs font-mono text-slate-300 group"
                  >
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">GitHub Profile</span>
                      <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                        {PERSONAL_INFO.githubUsername}
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => audioManager.playHover()}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-400/60 hover:bg-slate-800/60 transition-all text-xs font-mono text-slate-300 group"
                  >
                    <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 group-hover:scale-110 transition-transform">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">LinkedIn Network</span>
                      <span className="text-white font-medium group-hover:text-sky-300 transition-colors">
                        Shivam Gawande
                      </span>
                    </div>
                  </a>
                </div>

                {/* Telemetry info */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    RESPONSE: &lt; 24 HOURS
                  </span>
                  <span className="text-slate-500">PUNE, IN (IST)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Holographic Transmission Form */}
            <div className="lg:col-span-7 text-left">
              <motion.div
                className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative"
              >
                {/* Form header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    SIGNAL DISPATCH TERMINAL
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ENCRYPTION: ACTIVE
                  </span>
                </div>

                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                      Transmission Dispatched!
                    </h3>
                    <p className="text-slate-300 text-sm max-w-sm">
                      Thank you for connecting. Shivam has received your signal and will reply promptly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        NAME / IDENTIFIER <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Maya Chen"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        EMAIL ADDRESS <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <AtSign className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. maya@enterprise.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        TRANSMISSION PAYLOAD <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Detail your inquiry, project scope, or opportunity..."
                        className="w-full p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <p className="text-xs font-mono text-rose-400 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/50">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => audioManager.playHover()}
                      className="w-full group relative py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-['Space_Grotesk']"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Routing Signal Through Neural Grid...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
