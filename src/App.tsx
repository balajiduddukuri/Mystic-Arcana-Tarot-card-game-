import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HoroscopeDashboard } from './components/HoroscopeDashboard';
import { ReadingCanvas } from './components/ReadingCanvas';
import { TarotCodex } from './components/TarotCodex';
import { ReadingHistory } from './components/ReadingHistory';
import { OnboardingTour } from './components/OnboardingTour';
import { ZodiacSettingsModal } from './components/ZodiacSettingsModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { ZenAudioPlayer } from './components/ZenAudioPlayer';
import { ZODIAC_SIGNS } from './data/horoscopeData';
import { THEMES, ThemeConfig } from './data/themes';
import { ZodiacSignInfo, SavedReading } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reading' | 'history' | 'codex'>('dashboard');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[7]); // Default Scorpio
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // Active theme ID state
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem('mystic_arcana_theme') || 'mystic';
  });

  const activeTheme: ThemeConfig = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  const handleSelectTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    localStorage.setItem('mystic_arcana_theme', themeId);
  };

  // Active saved reading for detail view
  const [activeHistoryReading, setActiveHistoryReading] = useState<SavedReading | null>(null);

  const handleSaveReadingToDatabase = async (readingData: any) => {
    try {
      await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readingData)
      });
    } catch (err) {
      console.error('Failed to persist reading:', err);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${activeTheme.containerBg} text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-x-hidden`}>
      {/* Dynamic Theme Background Gradient Aura */}
      <div className={`fixed inset-0 bg-gradient-to-b ${activeTheme.bgGradient} pointer-events-none transition-all duration-700`} />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedZodiac={selectedZodiac}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
            onOpenThemeSelector={() => setIsThemeOpen(true)}
          />

          {/* Main Container View Area */}
          <main className="px-4 lg:px-8 pt-6">
            {activeTab === 'dashboard' && (
              <HoroscopeDashboard
                selectedZodiac={selectedZodiac}
                onSelectZodiac={setSelectedZodiac}
                onStartReading={() => setActiveTab('reading')}
              />
            )}

            {activeTab === 'reading' && (
              <ReadingCanvas onSaveReading={handleSaveReadingToDatabase} />
            )}

            {activeTab === 'codex' && <TarotCodex />}

            {activeTab === 'history' && (
              <ReadingHistory
                onOpenSavedReading={(reading) => {
                  setActiveHistoryReading(reading);
                }}
              />
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-purple-500/10 bg-black/30 py-6 text-center text-xs text-purple-300/50 space-y-1">
          <p className="font-serif tracking-widest uppercase">
            Mystic Arcana • Created by <span className="text-amber-200/80 font-semibold">Duddukuri Balaji</span>
          </p>
          <p className="text-[10px] text-purple-400/40">
            78-Card Tarot Experience & Celestial Oracle
          </p>
        </footer>
      </div>

      {/* Modals */}
      <OnboardingTour
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onStartReading={() => {
          setIsTutorialOpen(false);
          setActiveTab('reading');
        }}
      />

      <ZodiacSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedZodiac={selectedZodiac}
        onSelectZodiac={setSelectedZodiac}
      />

      <ThemeSelectorModal
        isOpen={isThemeOpen}
        onClose={() => setIsThemeOpen(false)}
        currentThemeId={currentThemeId}
        onSelectTheme={handleSelectTheme}
      />

      {/* Floating Zen Audio Soundscape Player */}
      <ZenAudioPlayer />
    </div>
  );
}
