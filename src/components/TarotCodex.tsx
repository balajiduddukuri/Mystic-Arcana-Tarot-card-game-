import React, { useState } from 'react';
import { TAROT_CARDS } from '../data/tarotData';
import { TarotCard } from '../types';
import { Search, BookOpen, Sparkles, Filter, X, Heart, Briefcase, Compass } from 'lucide-react';

export const TarotCodex: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterArcana, setFilterArcana] = useState<'all' | 'major' | 'minor'>('all');
  const [filterSuit, setFilterSuit] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [activeTab, setActiveTab] = useState<'codex' | 'guides'>('codex');

  // Filter cards logic
  const filteredCards = TAROT_CARDS.filter((card) => {
    const matchesQuery =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      card.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesArcana = filterArcana === 'all' || card.arcana_type === filterArcana;
    const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;

    return matchesQuery && matchesArcana && matchesSuit;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 md:p-8 backdrop-blur-sm shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-200/70 text-xs uppercase tracking-[0.2em]">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Celestial Encyclopedia</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-white">
              The Tarot Codex & Learning Sanctuary
            </h2>
            <p className="text-purple-100/80 text-xs md:text-sm italic">
              Explore the full 78-card deck symbolism, upright & reversed meanings, elements, and beginner guides.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-full border border-purple-500/30">
            <button
              onClick={() => setActiveTab('codex')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'codex'
                  ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'text-purple-200/60 hover:text-white'
              }`}
            >
              78-Card Deck
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'guides'
                  ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'text-purple-200/60 hover:text-white'
              }`}
            >
              Beginner Guides
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        {activeTab === 'codex' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 text-purple-300/60 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search card name, keyword, or meaning..."
                className="w-full bg-black/40 border border-purple-500/30 rounded-full pl-10 pr-4 py-2 text-xs text-purple-100 placeholder-purple-300/40 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Arcana Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none md:col-span-2 justify-end">
              <span className="text-[10px] uppercase tracking-[0.2em] text-purple-300/60 font-mono flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                Filter:
              </span>

              {['all', 'major', 'minor'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterArcana(type as any);
                    if (type === 'major') setFilterSuit('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                    filterArcana === type
                      ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                      : 'bg-black/40 text-purple-200/70 border border-purple-500/20 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All Arcana' : `${type} Arcana`}
                </button>
              ))}

              {filterArcana !== 'major' && (
                <select
                  value={filterSuit}
                  onChange={(e) => setFilterSuit(e.target.value)}
                  className="bg-black/40 border border-purple-500/30 text-purple-200 text-xs rounded-full px-3 py-1.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Suits</option>
                  <option value="wands">Wands (Fire)</option>
                  <option value="cups">Cups (Water)</option>
                  <option value="swords">Swords (Air)</option>
                  <option value="pentacles">Pentacles (Earth)</option>
                </select>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {activeTab === 'codex' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-black/50 rounded-2xl border border-white/10 hover:border-amber-400/70 p-3 shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              <div className="relative aspect-[3/5] w-full rounded-xl overflow-hidden border border-purple-500/30 mb-2">
                <img
                  src={card.image_url}
                  alt={card.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-center">
                  <span className="text-[10px] font-mono font-semibold uppercase text-purple-200/90 tracking-wider">
                    {card.element} • {card.arcana_type}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-center py-1">
                <h4 className="font-serif text-sm font-bold text-amber-200 line-clamp-1">{card.name}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Beginner Articles Section */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-2xl border border-purple-500/20 p-6 space-y-3">
            <div className="p-3 bg-amber-400/10 rounded-xl w-fit border border-amber-400/20 text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-200">How to do a 3-Card Reading</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              The 3-Card spread is the most versatile layout in Tarot. Representing Past, Present, and Future, it provides immediate snapshot clarity for daily advice or quick decision making.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-purple-500/20 p-6 space-y-3">
            <div className="p-3 bg-indigo-400/10 rounded-xl w-fit border border-indigo-400/20 text-indigo-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-indigo-200">The Celtic Cross Explained</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              With 10 positions illuminating core challenges, subconscious roots, environmental factors, and final outcome, the Celtic Cross is the gold standard for deep life questions.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-purple-500/20 p-6 space-y-3">
            <div className="p-3 bg-pink-400/10 rounded-xl w-fit border border-pink-400/20 text-pink-300">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-pink-200">Relationship Spreads & Ethics</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Learn how to examine emotional alignment, mutual expectations, and shared relationship dynamics with compassion and empowerment.
            </p>
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Card Image */}
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                <div className="w-56 h-96 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl relative">
                  <img
                    src={selectedCard.image_url}
                    alt={selectedCard.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 inset-x-2 px-2 py-1 bg-black/85 border border-amber-300/50 rounded-lg text-center backdrop-blur-sm">
                    <p className="font-serif text-sm font-bold text-amber-200">{selectedCard.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-200 font-mono font-semibold uppercase tracking-wider">
                  <span>{selectedCard.element} Element</span>
                  {selectedCard.astrology && <span>• {selectedCard.astrology}</span>}
                </div>
              </div>

              {/* Card Info */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
                    {selectedCard.arcana_type} Arcana
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-100">{selectedCard.name}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedCard.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-200 border border-purple-500/30 text-[11px]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{selectedCard.summary}</p>

                {/* Meanings */}
                <div className="space-y-3 pt-3 border-t border-purple-900/40">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-emerald-400 mb-1">✨ Upright Meaning</p>
                    <p className="text-slate-300 text-xs leading-relaxed">{selectedCard.upright_meaning}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 mb-1">🔄 Reversed Meaning</p>
                    <p className="text-slate-300 text-xs leading-relaxed">{selectedCard.reversed_meaning}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-pink-400 flex items-center gap-1 mb-1">
                        <Heart className="w-3 h-3" /> Love
                      </span>
                      <p className="text-[11px] text-slate-300">{selectedCard.love_meaning}</p>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-blue-400 flex items-center gap-1 mb-1">
                        <Briefcase className="w-3 h-3" /> Career
                      </span>
                      <p className="text-[11px] text-slate-300">{selectedCard.career_meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
