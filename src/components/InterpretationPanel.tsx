import React, { useState } from 'react';
import { InterpretationResult, PlacedCard, SpreadType } from '../types';
import { SPREAD_CONFIGS } from '../data/spreadsData';
import { X, Sparkles, Bookmark, Check, ShieldAlert, Zap, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InterpretationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  interpretation: InterpretationResult;
  placedCards: PlacedCard[];
  spreadType: SpreadType;
  focusQuestion: string;
  onSaveReading: (tags: string[], notes: string) => void;
}

export const InterpretationPanel: React.FC<InterpretationPanelProps> = ({
  isOpen,
  onClose,
  interpretation,
  placedCards,
  spreadType,
  focusQuestion,
  onSaveReading
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('General');
  const [userNotes, setUserNotes] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const spread = SPREAD_CONFIGS.find((s) => s.id === spreadType) || SPREAD_CONFIGS[0];

  const handleSave = () => {
    onSaveReading([selectedTag], userNotes);
    setIsSaved(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between bg-slate-950 px-6 py-4 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 rounded-xl border border-amber-400/20">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-200">
                Celestial Reading Interpretation
              </h3>
              <p className="text-xs text-slate-400 font-mono">Spread: {spread.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Focus Question Banner */}
          {focusQuestion && (
            <div className="bg-purple-950/60 rounded-2xl border border-purple-500/30 p-4 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-amber-400">Focus Question</p>
                <p className="text-sm font-serif font-bold text-slate-200">"{focusQuestion}"</p>
              </div>
            </div>
          )}

          {/* Overall Reading Summary */}
          <div className="bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 rounded-2xl border border-amber-400/30 p-6 space-y-4 shadow-xl">
            <h4 className="font-serif text-base font-bold text-amber-300">Synthesis & Guidance Summary</h4>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              {interpretation.overallSummary}
            </p>

            {/* Themes Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-mono">Primary Themes:</span>
              {interpretation.primaryThemes?.map((theme, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-medium"
                >
                  ✨ {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Opportunities & Warnings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opportunities */}
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-serif font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>Key Opportunities</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {interpretation.opportunities?.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings */}
            <div className="bg-amber-950/30 border border-amber-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>Awareness & Gentle Warnings</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {interpretation.warnings?.map((warn, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card-by-Card Breakdown */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200 border-b border-purple-900/40 pb-2">
              Card Position Breakdown & Neighbor Interactions
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {interpretation.cardDetails?.map((detail, idx) => {
                const pc = placedCards[idx];
                return (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start gap-4 bg-slate-950 rounded-2xl border border-slate-800 p-4 hover:border-amber-400/30 transition-colors"
                  >
                    {/* Thumbnail Card */}
                    {pc && (
                      <div className="w-28 h-44 shrink-0 rounded-xl overflow-hidden border border-amber-300/50 shadow-lg relative group">
                        <img
                          src={pc.card.image_url}
                          alt={pc.card.name}
                          className={`w-full h-full object-cover ${pc.isReversed ? 'rotate-180' : ''}`}
                        />
                        <div className="absolute bottom-1 inset-x-1 p-1 bg-black/80 border border-amber-300/40 rounded text-center backdrop-blur-sm">
                          <p className="font-serif text-[11px] font-bold text-amber-200 leading-tight truncate">
                            {pc.card.name}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Card Explanation */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-mono text-amber-300 uppercase tracking-wider font-bold">
                          {detail.positionTitle}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-amber-200/20 text-amber-200 border border-amber-400/30 font-serif font-bold">
                          {detail.cardName} {detail.isReversed ? '(Reversed)' : '(Upright)'}
                        </span>
                      </div>

                      <p className="text-slate-200 text-xs md:text-sm leading-relaxed">{detail.meaningInPosition}</p>

                      <div className="pt-2 border-t border-purple-950/80 text-xs text-purple-300/90 italic">
                        <strong>Interaction Flow:</strong> {detail.neighborInteraction}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Save Reading Section */}
          <div className="bg-slate-950 rounded-2xl border border-amber-500/30 p-6 space-y-4">
            <h4 className="font-serif text-base font-bold text-amber-300">Save to Reading Journal</h4>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">Category Tag:</span>
              {['General', 'Love & Relationships', 'Career & Finances', 'Spiritual Growth'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-400/40'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="Add personal reflections, feelings, or notes about this reading..."
              className="w-full h-24 bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
            />

            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs transition-all ${
                isSaved
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Reading Saved in Journal</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save Reading to History</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
