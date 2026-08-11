import React from 'react';
import { SpreadPosition, PlacedCard } from '../types';
import { RotateCw, X, Sparkles, HelpCircle } from 'lucide-react';

interface SpreadSlotProps {
  position: SpreadPosition;
  placedCard?: PlacedCard;
  isDragOver: boolean;
  onDropCard: (positionId: number) => void;
  onRotateCard: (positionId: number) => void;
  onRemoveCard: (positionId: number) => void;
  onCardClick?: (placedCard: PlacedCard) => void;
}

export const SpreadSlot: React.FC<SpreadSlotProps> = ({
  position,
  placedCard,
  isDragOver,
  onDropCard,
  onRotateCard,
  onRemoveCard,
  onCardClick
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDropCard(position.id);
  };

  return (
    <div className="flex flex-col items-center gap-2 group select-none">
      {/* Slot Label & Info Tooltip */}
      <div className="flex items-center gap-1.5 bg-black/60 px-3.5 py-1.5 rounded-full border border-purple-500/30 text-amber-200 text-xs shadow-md">
        <span className="font-serif font-bold text-amber-200 text-xs md:text-sm">{position.title}</span>
        <div className="relative group/tooltip">
          <HelpCircle className="w-4 h-4 text-purple-300/60 hover:text-amber-200 cursor-pointer" />
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-52 p-3 bg-slate-950 border border-amber-400/40 rounded-xl text-xs text-purple-100 shadow-2xl z-30 pointer-events-none">
            {position.description}
          </div>
        </div>
      </div>

      {/* Target Drop Slot Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative w-36 h-60 md:w-48 md:h-80 rounded-2xl transition-all duration-300 flex items-center justify-center p-2 ${
          placedCard
            ? 'bg-purple-950/40 border-2 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.2)]'
            : isDragOver
            ? 'bg-purple-900/50 border-2 border-dashed border-amber-300 scale-105 shadow-2xl shadow-purple-500/40'
            : 'bg-black/40 border-2 border-dashed border-purple-500/30 hover:border-amber-400/50'
        }`}
      >
        {placedCard ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden group/card flex flex-col justify-between">
            <img
              src={placedCard.card.image_url}
              alt={placedCard.card.name}
              onClick={() => onCardClick?.(placedCard)}
              className={`w-full h-full object-cover rounded-xl cursor-pointer transition-transform duration-500 ${
                placedCard.isReversed ? 'rotate-180' : ''
              }`}
            />

            {/* Overlays on Card Hover */}
            <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-3 z-20 backdrop-blur-sm">
              <button
                onClick={() => onRotateCard(position.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-200 text-slate-950 text-xs font-bold hover:bg-amber-100 transition-colors shadow-lg uppercase tracking-wider"
                title="Toggle Upright / Reversed"
              >
                <RotateCw className="w-4 h-4" />
                <span>Flip</span>
              </button>

              <button
                onClick={() => onRemoveCard(position.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/90 text-red-200 border border-red-500/50 text-xs font-bold hover:bg-red-900 transition-colors shadow-lg uppercase tracking-wider"
                title="Remove Card from Slot"
              >
                <X className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>

            {/* Card Name & Orientation Banner (Always Visible) */}
            <div className="absolute bottom-2 inset-x-1 px-2 py-1.5 bg-black/85 border border-amber-300/50 rounded-lg backdrop-blur-md text-center shadow-lg pointer-events-none z-10 flex flex-col items-center justify-center">
              <p className="text-xs md:text-sm font-serif font-bold text-amber-200 leading-tight truncate w-full">
                {placedCard.card.name}
              </p>
              <p className="text-[10px] font-mono font-medium text-purple-200/90 uppercase tracking-widest mt-0.5">
                {placedCard.isReversed ? '✦ Reversed' : '✦ Upright'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center p-3">
            <Sparkles className={`w-6 h-6 ${isDragOver ? 'text-amber-300 animate-spin' : 'text-purple-300/40'}`} />
            <p className="text-xs text-purple-200/60 uppercase tracking-widest font-mono font-semibold">
              {isDragOver ? 'Drop Here' : 'Drag Card'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
