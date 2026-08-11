import React, { useState, useEffect } from 'react';
import { SpreadType, TarotCard, PlacedCard, InterpretationResult } from '../types';
import { SPREAD_CONFIGS } from '../data/spreadsData';
import { TAROT_CARDS } from '../data/tarotData';
import { SpreadSlot } from './SpreadSlot';
import { DeckArea } from './DeckArea';
import { FanSpreadPicker } from './FanSpreadPicker';
import { InterpretationPanel } from './InterpretationPanel';
import { StardustConfetti } from './StardustConfetti';
import { zenAudio } from '../utils/zenAudio';
import { Sparkles, RefreshCw, Compass, Layers, CheckCircle2, LayoutGrid, Disc } from 'lucide-react';

interface ReadingCanvasProps {
  onSaveReading: (readingData: any) => void;
}

export const ReadingCanvas: React.FC<ReadingCanvasProps> = ({ onSaveReading }) => {
  const [pickerMode, setPickerMode] = useState<'fan' | 'canvas'>('fan');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('three_card');
  const [focusQuestion, setFocusQuestion] = useState<string>('');
  const [allowReversed, setAllowReversed] = useState<boolean>(true);

  const [deck, setDeck] = useState<TarotCard[]>([...TAROT_CARDS]);
  const [placedCards, setPlacedCards] = useState<PlacedCard[]>([]);
  const [activeDraggedCard, setActiveDraggedCard] = useState<TarotCard | null>(null);
  const [dragOverPositionId, setDragOverPositionId] = useState<number | null>(null);

  const [interpretation, setInterpretation] = useState<InterpretationResult | null>(null);
  const [isInterpreting, setIsInterpreting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showStardust, setShowStardust] = useState<boolean>(false);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  const currentSpreadConfig = SPREAD_CONFIGS.find((s) => s.id === selectedSpread) || SPREAD_CONFIGS[0];

  // Trigger stardust celebration when spread sequence completes
  useEffect(() => {
    if (placedCards.length === currentSpreadConfig.cardCount && placedCards.length > 0 && !hasCelebrated) {
      setShowStardust(true);
      setHasCelebrated(true);
      zenAudio.playSingingBowlChime(528); // Celebratory 528Hz Solfeggio chime
    }
  }, [placedCards.length, currentSpreadConfig.cardCount, hasCelebrated]);

  // Handle spread type change
  const handleSpreadChange = (spreadId: SpreadType) => {
    setSelectedSpread(spreadId);
    handleResetReading();
  };

  // Reset reading state
  const handleResetReading = () => {
    setDeck([...TAROT_CARDS]);
    setPlacedCards([]);
    setInterpretation(null);
    setHasCelebrated(false);
    setShowStardust(false);
  };

  // Shuffle deck
  const handleShuffleDeck = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  };

  // Handle Fan Arc Card Pick
  const handleFanSelectCard = (card: TarotCard) => {
    const filledPosIds = new Set(placedCards.map((pc) => pc.positionId));
    const nextPos = currentSpreadConfig.positions.find((p) => !filledPosIds.has(p.id));

    if (!nextPos) return;

    const isReversed = allowReversed ? Math.random() < 0.35 : false;

    setPlacedCards((prev) => [
      ...prev,
      { positionId: nextPos.id, card, isReversed }
    ]);
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  // Place next available card into first empty spread position
  const handleDrawNextCard = () => {
    if (deck.length === 0) return;

    const filledPosIds = new Set(placedCards.map((pc) => pc.positionId));
    const nextPos = currentSpreadConfig.positions.find((p) => !filledPosIds.has(p.id));

    if (!nextPos) return;

    const cardToPlace = deck[0];
    const isReversed = allowReversed ? Math.random() < 0.35 : false;

    setPlacedCards((prev) => [
      ...prev,
      { positionId: nextPos.id, card: cardToPlace, isReversed }
    ]);
    setDeck((prev) => prev.slice(1));
  };

  // Auto-fill entire spread instantly
  const handleAutoFill = () => {
    let currentDeck = [...deck];
    const filledPosIds = new Set(placedCards.map((pc) => pc.positionId));
    const emptyPositions = currentSpreadConfig.positions.filter((p) => !filledPosIds.has(p.id));

    const newPlaced: PlacedCard[] = [];
    emptyPositions.forEach((pos) => {
      if (currentDeck.length > 0) {
        const card = currentDeck[0];
        const isReversed = allowReversed ? Math.random() < 0.35 : false;
        newPlaced.push({ positionId: pos.id, card, isReversed });
        currentDeck = currentDeck.slice(1);
      }
    });

    setPlacedCards((prev) => [...prev, ...newPlaced]);
    setDeck(currentDeck);
  };

  // Drop card into specific slot
  const handleDropCardIntoSlot = (positionId: number) => {
    if (!activeDraggedCard) return;

    // Remove existing card in position if any
    const filteredPlaced = placedCards.filter((pc) => pc.positionId !== positionId);
    const isReversed = allowReversed ? Math.random() < 0.35 : false;

    setPlacedCards([
      ...filteredPlaced,
      { positionId, card: activeDraggedCard, isReversed }
    ]);

    // Remove card from deck
    setDeck((prev) => prev.filter((c) => c.id !== activeDraggedCard.id));
    setActiveDraggedCard(null);
    setDragOverPositionId(null);
  };

  // Toggle upright/reversed for placed card
  const handleRotateCard = (positionId: number) => {
    setPlacedCards((prev) =>
      prev.map((pc) =>
        pc.positionId === positionId ? { ...pc, isReversed: !pc.isReversed } : pc
      )
    );
  };

  // Remove card from slot
  const handleRemoveCard = (positionId: number) => {
    const target = placedCards.find((pc) => pc.positionId === positionId);
    if (!target) return;

    setPlacedCards((prev) => prev.filter((pc) => pc.positionId !== positionId));
    setDeck((prev) => [target.card, ...prev]);
  };

  // Fetch AI/Rule interpretation
  const handleGenerateInterpretation = async () => {
    if (placedCards.length < currentSpreadConfig.cardCount) return;

    setIsInterpreting(true);
    try {
      const res = await fetch('/api/readings/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadType: selectedSpread,
          placedCards,
          focusQuestion
        })
      });

      if (res.ok) {
        const data = await res.json();
        setInterpretation(data.interpretation);
        setIsModalOpen(true);
        setShowStardust(true);
        zenAudio.playSingingBowlChime(432);
      }
    } catch (err) {
      console.error('Interpretation fetch failed:', err);
    } finally {
      setIsInterpreting(false);
    }
  };

  const isSpreadFullyPlaced = placedCards.length === currentSpreadConfig.cardCount;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Spread Selection & Question Top Header */}
      <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 md:p-8 backdrop-blur-sm shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-purple-900/40 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-200/70 text-xs uppercase tracking-[0.2em]">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Interactive Tarot Canvas</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-white">
              Cast Your Celestial Reading
            </h2>
          </div>

          {/* Spread Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {SPREAD_CONFIGS.map((spread) => {
              const isSelected = spread.id === selectedSpread;
              return (
                <button
                  key={spread.id}
                  onClick={() => handleSpreadChange(spread.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)] scale-105'
                      : 'bg-black/30 text-purple-200/70 border border-purple-500/20 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  {spread.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focus Question, Mode Switcher & Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-purple-300/60 font-mono mb-1">
              Focus Question or Intent (Optional)
            </label>
            <input
              type="text"
              value={focusQuestion}
              onChange={(e) => setFocusQuestion(e.target.value)}
              placeholder="e.g., 'What steps should I take in my career?' or 'What energy surrounds my relationship?'"
              className="w-full bg-black/40 border border-purple-500/30 rounded-full px-5 py-2 text-xs md:text-sm text-purple-100 placeholder-purple-300/40 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="md:col-span-6 flex items-center justify-end gap-2 flex-wrap">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-purple-500/30">
              <button
                onClick={() => setPickerMode('fan')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  pickerMode === 'fan'
                    ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'text-purple-200/60 hover:text-white'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Trusted Fan Arc</span>
              </button>
              <button
                onClick={() => setPickerMode('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  pickerMode === 'canvas'
                    ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'text-purple-200/60 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Reading Mat</span>
              </button>
            </div>

            <button
              onClick={handleResetReading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-purple-500/30 text-purple-200/70 text-xs font-medium hover:text-white hover:border-amber-400/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleGenerateInterpretation}
              disabled={!isSpreadFullyPlaced || isInterpreting}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                isSpreadFullyPlaced
                  ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:bg-amber-100 active:scale-95 animate-pulse'
                  : 'bg-black/30 text-purple-300/40 border border-purple-500/10 cursor-not-allowed'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isInterpreting ? 'animate-spin' : ''}`} />
              <span>{isInterpreting ? 'Reading Arcana...' : 'Reveal Interpretation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Fan Arc Picker or Classic Canvas */}
      {pickerMode === 'fan' ? (
        <div className="space-y-8">
          <FanSpreadPicker
            cards={deck}
            requiredCount={currentSpreadConfig.cardCount}
            selectedCards={placedCards.map((pc) => pc.card)}
            onSelectCard={handleFanSelectCard}
            onCutDeck={handleShuffleDeck}
            positionTitles={currentSpreadConfig.positions.map((p) => p.title)}
          />

          {/* Cards Mat Display below Fan Picker */}
          {placedCards.length > 0 && (
            <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 backdrop-blur-sm shadow-2xl space-y-4">
              <h4 className="font-serif text-lg font-bold text-amber-200 text-center uppercase tracking-wider">
                Your Selected Arcana Spread
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
                {currentSpreadConfig.positions.map((pos) => {
                  const placedCard = placedCards.find((pc) => pc.positionId === pos.id);
                  return (
                    <SpreadSlot
                      key={pos.id}
                      position={pos}
                      placedCard={placedCard}
                      isDragOver={false}
                      onDropCard={handleDropCardIntoSlot}
                      onRotateCard={handleRotateCard}
                      onRemoveCard={handleRemoveCard}
                      onCardClick={() => {
                        if (isSpreadFullyPlaced && interpretation) {
                          setIsModalOpen(true);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Col: Deck Controls */}
        <div className="lg:col-span-1">
          <DeckArea
            remainingCards={deck}
            onShuffle={handleShuffleDeck}
            onDrawCard={handleDrawNextCard}
            onAutoFill={handleAutoFill}
            allowReversed={allowReversed}
            onToggleReversed={() => setAllowReversed(!allowReversed)}
            onDragStartCard={(card) => setActiveDraggedCard(card)}
          />
        </div>

        {/* Right 3 Cols: Spread Slots Drop Canvas */}
        <div className="lg:col-span-3 bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 md:p-10 backdrop-blur-sm shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Canvas Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <span className="text-[180px] font-serif font-bold text-amber-200 select-none">✦</span>
          </div>

          {/* Spread Position Slots Grid */}
          <div className="relative z-10 w-full my-auto py-6">
            <div
              className={`grid gap-6 items-center justify-center ${
                selectedSpread === 'three_card'
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : selectedSpread === 'relationship'
                  ? 'grid-cols-1 sm:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-5'
              }`}
            >
              {currentSpreadConfig.positions.map((pos) => {
                const placedCard = placedCards.find((pc) => pc.positionId === pos.id);
                return (
                  <SpreadSlot
                    key={pos.id}
                    position={pos}
                    placedCard={placedCard}
                    isDragOver={dragOverPositionId === pos.id}
                    onDropCard={handleDropCardIntoSlot}
                    onRotateCard={handleRotateCard}
                    onRemoveCard={handleRemoveCard}
                    onCardClick={() => {
                      if (isSpreadFullyPlaced && interpretation) {
                        setIsModalOpen(true);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Canvas Bottom Status Bar */}
          <div className="relative z-10 flex items-center justify-between border-t border-purple-900/40 pt-4 mt-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${isSpreadFullyPlaced ? 'text-amber-400' : 'text-slate-600'}`} />
              <span>
                Cards Placed: {placedCards.length} / {currentSpreadConfig.cardCount}
              </span>
            </div>

            <p className="hidden sm:block text-[11px] font-mono text-amber-300/80">
              {isSpreadFullyPlaced
                ? '✨ All positions filled! Click "Reveal Interpretation"'
                : 'Drag cards or tap "Draw Card" to complete spread'}
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Interpretation Modal */}
      {interpretation && (
        <InterpretationPanel
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          interpretation={interpretation}
          placedCards={placedCards}
          spreadType={selectedSpread}
          focusQuestion={focusQuestion}
          onSaveReading={(tags, notes) => {
            onSaveReading({
              focusQuestion,
              spreadType: selectedSpread,
              placedCards,
              interpretation,
              tags,
              userNotes: notes
            });
          }}
        />
      )}
      {/* Stardust Celebration Confetti Animation */}
      <StardustConfetti isActive={showStardust} onComplete={() => setShowStardust(false)} />
    </div>
  );
};
