import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HoroscopeDashboard } from './components/HoroscopeDashboard';
import { ReadingCanvas } from './components/ReadingCanvas';
import { TarotCodex } from './components/TarotCodex';
import { ReadingHistory } from './components/ReadingHistory';
import { OnboardingTour } from './components/OnboardingTour';
import { ZodiacSettingsModal } from './components/ZodiacSettingsModal';
import { ZODIAC_SIGNS } from './data/horoscopeData';
import { ZodiacSignInfo, SavedReading } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reading' | 'history' | 'codex'>('dashboard');
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSignInfo>(ZODIAC_SIGNS[7]); // Default Scorpio
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedZodiac={selectedZodiac}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
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
    </div>
  );
}
