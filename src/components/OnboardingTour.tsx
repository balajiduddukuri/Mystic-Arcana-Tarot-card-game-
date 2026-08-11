import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, BookOpen, Layers, RefreshCw } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onStartReading: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose, onStartReading }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to Mystic Arcana',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            Welcome! Tarot is a beautiful, intuitive mirror for your subconscious mind and spiritual journey.
          </p>
          <p>
            Whether you are asking about career, love, or personal alignment, Mystic Arcana provides interactive spreads with beginner-friendly interpretations and deep celestial guidance.
          </p>
          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-500/30 text-amber-200 text-xs font-mono">
            ✨ Tip: No prior experience needed! Our interactive canvas guides every step of your reading.
          </div>
        </div>
      )
    },
    {
      title: '1. Shuffling & Drag-and-Drop',
      icon: <Layers className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            <strong>Drawing Cards:</strong> You can click <span className="text-amber-300">"Shuffle Deck"</span> to randomize the energy, then drag cards directly from the deck into highlighted spread slots.
          </p>
          <p>
            <strong>Touch & Mobile Friendly:</strong> Drag with your finger or mouse, or simply tap <span className="text-amber-300">"Draw Next Card"</span> to auto-place into the next slot.
          </p>
          <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-500/30 text-slate-300 text-xs">
            🎴 You can toggle whether to include reversed card orientation in settings or on the reading canvas!
          </div>
        </div>
      )
    },
    {
      title: '2. Major vs Minor Arcana',
      icon: <BookOpen className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            <strong>Major Arcana (22 Cards):</strong> Represent pivotal soul lessons, major spiritual turning points, and archetypal life themes (e.g., <em>The Fool, The Lovers, The Star</em>).
          </p>
          <p>
            <strong>Minor Arcana (56 Cards):</strong> Divided into 4 suits—<strong>Wands</strong> (Fire/Action), <strong>Cups</strong> (Water/Emotion), <strong>Swords</strong> (Air/Mind), and <strong>Pentacles</strong> (Earth/Material life).
          </p>
        </div>
      )
    },
    {
      title: '3. Upright vs Reversed Meanings',
      icon: <RefreshCw className="w-8 h-8 text-amber-400" />,
      content: (
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
          <p>
            <strong>Upright Cards:</strong> Direct energy expressing the card’s primary qualities out in the open.
          </p>
          <p>
            <strong>Reversed Cards:</strong> Internalized energy, gentle warnings, delays, or subtle shadow aspects requiring introspective care.
          </p>
          <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-500/30 text-amber-200 text-xs">
            🌟 Remember: Reversed cards are never "bad luck"—they are supportive reminders to look within!
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-purple-950/80 to-slate-950 border border-amber-500/30 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 rounded-xl border border-amber-400/20">
              {steps[step].icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-200">
              {steps[step].title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="min-h-[160px] my-2">{steps[step].content}</div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-purple-900/40 pt-4 mt-4">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onStartReading();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Start My Reading
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
