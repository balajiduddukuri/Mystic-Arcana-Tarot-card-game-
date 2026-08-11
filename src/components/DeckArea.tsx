import React, { useState } from 'react';
import { TarotCard } from '../types';
import { Shuffle, Layers, Sparkles, Plus, ToggleLeft, ToggleRight } from 'lucide-react';

interface DeckAreaProps {
  remainingCards: TarotCard[];
  onShuffle: () => void;
  onDrawCard: () => void;
  onAutoFill: () => void;
  allowReversed: boolean;
  onToggleReversed: () => void;
  onDragStartCard: (card: TarotCard) => void;
}

export const DeckArea: React.FC<DeckAreaProps> = ({
  remainingCards,
  onShuffle,
  onDrawCard,
  onAutoFill,
  allowReversed,
  onToggleReversed,
  onDragStartCard
}) => {
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffleClick = () => {
    setIsShuffling(true);
    onShuffle();
    setTimeout(() => setIsShuffling(false), 800);
  };

  const topCard = remainingCards[0];

  return (
    <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-5 backdrop-blur-sm shadow-2xl space-y-4">
      {/* Header Controls */}
      <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif text-sm font-bold text-amber-200">Tarot Deck ({remainingCards.length}/78)</h3>
        </div>

        {/* Reversals Toggle */}
        <button
          onClick={onToggleReversed}
          className="flex items-center gap-1.5 text-xs text-purple-200/70 hover:text-amber-200 transition-colors"
          title="Enable/disable reversed card orientations"
        >
          <span className="text-[10px] uppercase font-mono">Reversals:</span>
          {allowReversed ? (
            <ToggleRight className="w-5 h-5 text-amber-400" />
          ) : (
            <ToggleLeft className="w-5 h-5 text-purple-300/40" />
          )}
        </button>
      </div>

      {/* Stacked Deck Visual with Drag */}
      <div className="flex flex-col items-center justify-center py-2">
        {remainingCards.length > 0 && topCard ? (
          <div
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', topCard.id);
              onDragStartCard(topCard);
            }}
            onClick={onDrawCard}
            className={`relative w-36 h-60 md:w-44 md:h-72 cursor-grab active:cursor-grabbing group select-none transition-transform duration-300 ${
              isShuffling ? 'animate-bounce scale-95' : 'hover:scale-105'
            }`}
          >
            {/* Multi-layered card stack shadow effect */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-purple-950/80 border border-purple-700/40 shadow" />
            <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-xl bg-indigo-950/80 border border-indigo-700/40 shadow" />

            {/* Top Deck Card Back */}
            <div className="relative w-full h-full rounded-xl bg-[#121225] border-2 border-amber-200/50 p-2.5 shadow-2xl flex flex-col items-center justify-between">
              <div className="w-full border border-amber-200/30 rounded-lg p-3 h-full flex flex-col items-center justify-center gap-3 bg-black/30">
                <Sparkles className="w-6 h-6 text-amber-200 animate-pulse" />
                <p className="font-serif text-xs md:text-sm text-amber-200 font-bold text-center uppercase tracking-widest">MYSTIC DECK</p>
                <span className="text-xs text-purple-200/70 font-mono font-medium">Drag or Tap</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-36 h-60 md:w-44 md:h-72 rounded-xl border-2 border-dashed border-purple-500/30 flex items-center justify-center text-purple-300/50 text-xs font-mono uppercase tracking-widest">
            Deck Empty
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={handleShuffleClick}
          disabled={isShuffling}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-black/40 border border-purple-500/30 text-purple-100 text-xs font-semibold uppercase tracking-wider hover:border-amber-400/40 active:scale-95 transition-all"
        >
          <Shuffle className={`w-3.5 h-3.5 text-amber-400 ${isShuffling ? 'animate-spin' : ''}`} />
          <span>Shuffle</span>
        </button>

        <button
          onClick={onDrawCard}
          disabled={remainingCards.length === 0}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-amber-200 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(251,191,36,0.3)] hover:bg-amber-100 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Draw Card</span>
        </button>
      </div>

      <button
        onClick={onAutoFill}
        className="w-full py-2 rounded-full bg-black/40 border border-purple-500/30 text-amber-200 text-xs font-semibold uppercase tracking-wider hover:border-amber-400/50 transition-colors"
      >
        ✦ Auto-Fill Spread
      </button>
    </div>
  );
};
