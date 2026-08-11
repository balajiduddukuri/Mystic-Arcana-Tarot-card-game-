import React, { useState, useEffect } from 'react';
import { SavedReading } from '../types';
import { History, Search, Trash2, Eye, Calendar, Sparkles, BookOpen } from 'lucide-react';

interface ReadingHistoryProps {
  onOpenSavedReading: (reading: SavedReading) => void;
}

export const ReadingHistory: React.FC<ReadingHistoryProps> = ({ onOpenSavedReading }) => {
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/readings');
      if (res.ok) {
        const json = await res.json();
        setReadings(json.readings || []);
      }
    } catch (err) {
      console.error('Failed to load readings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReading = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/readings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReadings((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete reading:', err);
    }
  };

  const filteredReadings = readings.filter((r) => {
    const matchesSearch =
      r.focusQuestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.interpretation?.overallSummary?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'all' || r.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-3xl border border-purple-500/30 p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
              <History className="w-4 h-4" />
              <span>Saved Journal</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-200">
              Your Tarot Reading History
            </h2>
            <p className="text-slate-300 text-xs md:text-sm">
              Revisit past celestial readings, personal notes, and track your spiritual growth over time.
            </p>
          </div>
        </div>

        {/* Search & Tag Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by focus question or keywords..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-full scrollbar-none">
            {['all', 'General', 'Love & Relationships', 'Career & Finances', 'Spiritual Growth'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {tag === 'all' ? 'All Tags' : tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Readings Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading readings history...</div>
      ) : filteredReadings.length === 0 ? (
        <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-amber-400/60 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-slate-300">No Saved Readings Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Cast a custom Tarot reading on the Reading Canvas and tap "Save Reading to History" to populate your journal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReadings.map((reading) => {
            const dateFormatted = new Date(reading.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={reading.id}
                onClick={() => onOpenSavedReading(reading)}
                className="bg-slate-900 rounded-2xl border border-purple-500/20 hover:border-amber-400/50 p-6 shadow-xl hover:scale-[1.02] cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                      {reading.spreadType.replace('_', ' ').toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{dateFormatted}</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-base font-bold text-amber-200 line-clamp-2 group-hover:text-amber-300">
                    "{reading.focusQuestion}"
                  </h4>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {reading.interpretation?.overallSummary}
                  </p>
                </div>

                {/* Cards Thumbnails Row */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-t border-purple-900/30">
                  {reading.placedCards?.slice(0, 5).map((pc, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-16 shrink-0 rounded border border-amber-400/30 overflow-hidden"
                      title={pc.card.name}
                    >
                      <img
                        src={pc.card.image_url}
                        alt={pc.card.name}
                        className={`w-full h-full object-cover ${pc.isReversed ? 'rotate-180' : ''}`}
                      />
                    </div>
                  ))}
                  {reading.placedCards?.length > 5 && (
                    <span className="text-[10px] text-slate-500 font-mono">+more</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-200">
                    {reading.tags?.[0] || 'General'}
                  </span>

                  <button
                    onClick={(e) => handleDeleteReading(reading.id, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                    title="Delete Reading"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
