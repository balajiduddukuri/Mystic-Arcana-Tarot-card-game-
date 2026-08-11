import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Compass, History, Settings, HelpCircle, Flame, Music, Volume2 } from 'lucide-react';
import { ZodiacSignInfo } from '../types';
import { zenAudio } from '../utils/zenAudio';

interface NavbarProps {
  activeTab: 'dashboard' | 'reading' | 'history' | 'codex';
  setActiveTab: (tab: 'dashboard' | 'reading' | 'history' | 'codex') => void;
  selectedZodiac: ZodiacSignInfo;
  onOpenSettings: () => void;
  onOpenTutorial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedZodiac,
  onOpenSettings,
  onOpenTutorial
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAudioPlaying(zenAudio.getIsPlaying());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMusic = () => {
    const active = zenAudio.togglePlay();
    setIsAudioPlaying(active);
  };
  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-purple-500/20 px-4 lg:px-8 h-16 flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-widest text-amber-200 uppercase">
              MYSTIC ARCANA
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-purple-300/60 font-mono">
              Tarot & Celestial Oracle • By Duddukuri Balaji
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-purple-900/20 p-1 rounded-full border border-purple-500/20">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'dashboard'
                ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-purple-200/60 hover:text-purple-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('reading')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'reading'
                ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-purple-200/60 hover:text-purple-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Readings</span>
          </button>

          <button
            onClick={() => setActiveTab('codex')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'codex'
                ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-purple-200/60 hover:text-purple-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Encyclopedia</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'history'
                ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-purple-200/60 hover:text-purple-100'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>
        </nav>

        {/* User Controls & Quick CTA */}
        <div className="flex items-center gap-3">
          {/* Zodiac Badge */}
          <button
            onClick={onOpenSettings}
            className="hidden sm:flex items-center gap-2 bg-purple-900/30 px-4 py-1.5 rounded-full border border-purple-500/30 text-amber-200 text-xs font-semibold hover:border-amber-400/50 transition-colors"
            title="Change Zodiac Sign"
          >
            <span className="text-sm">{selectedZodiac.symbol}</span>
            <span>{selectedZodiac.name}</span>
          </button>

          {/* Zen Music Quick Toggle */}
          <button
            onClick={handleToggleMusic}
            className={`p-2 rounded-full border transition-all ${
              isAudioPlaying
                ? 'bg-amber-200 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)] animate-pulse'
                : 'bg-black/40 border-purple-500/30 text-purple-200/70 hover:text-amber-200 hover:border-amber-400/40'
            }`}
            title={isAudioPlaying ? 'Mute Zen Music' : 'Play Zen Music'}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </button>

          {/* Guide / Tutorial Button */}
          <button
            onClick={onOpenTutorial}
            className="p-2 rounded-full bg-black/40 border border-purple-500/30 text-purple-200/70 hover:text-amber-200 hover:border-amber-400/40 transition-all"
            title="Beginner Guide & Tutorial"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full bg-black/40 border border-purple-500/30 text-purple-200/70 hover:text-amber-200 hover:border-amber-400/40 transition-all"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => setActiveTab('reading')}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-200 text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Reading</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around mt-3 pt-2 border-t border-purple-900/30">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeTab === 'dashboard' ? 'text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Oracle</span>
        </button>
        <button
          onClick={() => setActiveTab('reading')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeTab === 'reading' ? 'text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Reading</span>
        </button>
        <button
          onClick={() => setActiveTab('codex')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeTab === 'codex' ? 'text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Codex</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 text-[11px] ${
            activeTab === 'history' ? 'text-amber-300 font-bold' : 'text-slate-400'
          }`}
        >
          <History className="w-4 h-4" />
          <span>History</span>
        </button>
      </div>
    </header>
  );
};
