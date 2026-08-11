import React, { useState } from 'react';
import { TarotCard } from '../types';
import { Sparkles, Scissors, RefreshCw, CheckCircle2 } from 'lucide-react';
import { zenAudio } from '../utils/zenAudio';

interface FanSpreadPickerProps {
  cards: TarotCard[];
  requiredCount: number;
  selectedCards: TarotCard[];
  onSelectCard: (card: TarotCard) => void;
  onCutDeck: () => void;
  positionTitles: string[];
}

export const FanSpreadPicker: React.FC<FanSpreadPickerProps> = ({
  cards,
  requiredCount,
  selectedCards,
  onSelectCard,
  onCutDeck,
  positionTitles
}) => {
  const [isCutting, setIsCutting] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCutClick = () => {
    setIsCutting(true);
    zenAudio.playSingingBowlChime(432);
    onCutDeck();
    setTimeout(() => setIsCutting(false), 1200);
  };

  const isComplete = selectedCards.length >= requiredCount;
  const currentStepTitle = !isComplete
    ? positionTitles[selectedCards.length] || `Card ${selectedCards.length + 1}`
    : 'All Cards Selected';

  // Calculate arc angles for 22 display cards in fan arc
  const visibleFanCards = cards.slice(0, 36);

  return (
    <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 backdrop-blur-sm shadow-2xl space-y-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/10 border border-amber-300/30 text-amber-200 text-xs uppercase tracking-widest font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Trusted Tarot Fan Arc Picker</span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-amber-200">
          {!isComplete ? (
            <span>Pick Position {selectedCards.length + 1}: <span className="text-white underline decoration-amber-400">{currentStepTitle}</span></span>
          ) : (
            <span className="text-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> Cards Picked! Ready for Reading
            </span>
          )}
        </h3>
        <p className="text-xs text-purple-200/70 max-w-lg mx-auto italic">
          {!isComplete
            ? "Hover over the celestial deck, feel the energy call to you, and click a card to place it into your spread."
            : "All required cards have been chosen from the deck. Click 'Reveal Interpretation' below to consult the oracle."}
        </p>
      </div>

      {/* Progress Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap relative z-10">
        {Array.from({ length: requiredCount }).map((_, idx) => {
          const isPicked = idx < selectedCards.length;
          const isCurrent = idx === selectedCards.length;
          return (
            <div
              key={idx}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isPicked
                  ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_10px_rgba(251,191,36,0.4)]'
                  : isCurrent
                  ? 'bg-purple-900/80 text-amber-300 border-2 border-amber-400 animate-pulse'
                  : 'bg-black/40 text-purple-300/40 border border-purple-500/20'
              }`}
            >
              <span>{positionTitles[idx] || `Slot ${idx + 1}`}:</span>
              <span>{isPicked ? selectedCards[idx].name : 'Pending'}</span>
            </div>
          );
        })}
      </div>

      {/* Cut Deck Action Button */}
      <div className="flex justify-center relative z-10">
        <button
          onClick={handleCutClick}
          disabled={isCutting || isComplete}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-purple-500/30 text-amber-200 text-xs font-bold uppercase tracking-wider hover:border-amber-400/50 hover:bg-black/60 active:scale-95 transition-all disabled:opacity-40"
        >
          <Scissors className={`w-4 h-4 text-amber-400 ${isCutting ? 'animate-spin' : ''}`} />
          <span>{isCutting ? 'Cutting Deck...' : 'Cut The Deck'}</span>
        </button>
      </div>

      {/* Cut Deck Animation Container */}
      {isCutting ? (
        <div className="h-64 flex items-center justify-center gap-8 animate-pulse relative">
          <div className="w-32 h-52 bg-[#121225] border-2 border-amber-300 rounded-xl p-2 shadow-2xl -translate-x-8 rotate-[-12deg] transition-all duration-700">
            <div className="w-full h-full border border-amber-300/30 rounded-lg flex items-center justify-center">
              <span className="text-amber-200 text-xs font-serif font-bold">LEFT DECK</span>
            </div>
          </div>
          <div className="w-32 h-52 bg-[#121225] border-2 border-amber-300 rounded-xl p-2 shadow-2xl translate-x-8 rotate-[12deg] transition-all duration-700">
            <div className="w-full h-full border border-amber-300/30 rounded-lg flex items-center justify-center">
              <span className="text-amber-200 text-xs font-serif font-bold">RIGHT DECK</span>
            </div>
          </div>
        </div>
      ) : (
        /* Fan Spread Deck Ribbon Arc */
        <div className="relative h-72 w-full flex items-center justify-center overflow-x-auto py-6 scrollbar-none">
          {!isComplete ? (
            <div className="relative w-[700px] md:w-[900px] h-60 flex justify-center items-end">
              {visibleFanCards.map((card, idx) => {
                const total = visibleFanCards.length;
                // Calculate rotation angle between -45 and +45 degrees
                const angle = -45 + (idx / (total - 1)) * 90;
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={card.id + '_' + idx}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      zenAudio.playCardDrawSFX();
                      onSelectCard(card);
                    }}
                    style={{
                      transform: `rotate(${angle}deg) translateY(${isHovered ? -35 : 0}px) scale(${isHovered ? 1.15 : 1})`,
                      transformOrigin: 'bottom center',
                      zIndex: isHovered ? 50 : idx
                    }}
                    className="absolute bottom-0 w-24 h-40 md:w-28 md:h-48 cursor-pointer transition-all duration-200 group select-none"
                  >
                    <div className={`w-full h-full rounded-xl bg-[#121225] border-2 p-1.5 shadow-2xl flex flex-col items-center justify-between transition-colors ${
                      isHovered ? 'border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)]' : 'border-purple-500/30'
                    }`}>
                      <div className="w-full h-full border border-amber-200/20 rounded-lg flex flex-col items-center justify-center gap-2 bg-black/30 p-2">
                        <Sparkles className={`w-4 h-4 ${isHovered ? 'text-amber-300 animate-spin' : 'text-purple-300/40'}`} />
                        <span className="text-[10px] font-serif font-bold text-amber-200/80 uppercase tracking-widest text-center">MYSTIC</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 py-8">
              {selectedCards.map((c, idx) => (
                <div key={c.id} className="w-28 h-48 md:w-36 md:h-60 rounded-xl border-2 border-amber-300 p-1.5 bg-[#121225] shadow-2xl flex flex-col items-center justify-between">
                  <img src={c.image_url} alt={c.name} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
