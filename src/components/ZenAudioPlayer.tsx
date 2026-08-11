import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc, BellRing, Play, Pause, Radio, Sparkles } from 'lucide-react';
import { zenAudio } from '../utils/zenAudio';

export const ZenAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [track, setTrack] = useState<'solfeggio' | 'bowls' | 'cosmic'>('solfeggio');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // Sync initial state
    setIsPlaying(zenAudio.getIsPlaying());
  }, []);

  const handleTogglePlay = () => {
    const active = zenAudio.togglePlay();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    zenAudio.setVolume(val);
  };

  const handleTrackChange = (newTrack: 'solfeggio' | 'bowls' | 'cosmic') => {
    setTrack(newTrack);
    zenAudio.setTrack(newTrack);
  };

  const handleRingBell = () => {
    zenAudio.playSingingBowlChime();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 select-none">
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="bg-slate-950/90 border border-amber-400/40 rounded-3xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md w-72 space-y-4 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <div className="flex items-center gap-2 text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-serif font-bold text-sm">Zen Sanctuary Audio</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-purple-300/60 hover:text-white text-xs font-mono px-2 py-0.5 rounded bg-black/40"
            >
              Close
            </button>
          </div>

          {/* Soundscape Tracks */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-purple-300/60">
              Select Soundscape
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => handleTrackChange('solfeggio')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  track === 'solfeggio'
                    ? 'bg-amber-200 text-slate-950 font-bold shadow-md'
                    : 'bg-purple-950/40 text-purple-200 border border-purple-500/20 hover:border-amber-400/30'
                }`}
              >
                <span>🕉️ 432Hz Solfeggio Healing</span>
                {track === 'solfeggio' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>

              <button
                onClick={() => handleTrackChange('bowls')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  track === 'bowls'
                    ? 'bg-amber-200 text-slate-950 font-bold shadow-md'
                    : 'bg-purple-950/40 text-purple-200 border border-purple-500/20 hover:border-amber-400/30'
                }`}
              >
                <span>🔔 Tibetan Singing Bowls</span>
                {track === 'bowls' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>

              <button
                onClick={() => handleTrackChange('cosmic')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  track === 'cosmic'
                    ? 'bg-amber-200 text-slate-950 font-bold shadow-md'
                    : 'bg-purple-950/40 text-purple-200 border border-purple-500/20 hover:border-amber-400/30'
                }`}
              >
                <span>🌌 Cosmic Ether & Shimmer</span>
                {track === 'cosmic' && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </button>
            </div>
          </div>

          {/* Volume Control Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-purple-200">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>Volume</span>
              </span>
              <span className="font-mono">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-300 bg-purple-950 rounded-lg cursor-pointer h-1.5"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                isPlaying
                  ? 'bg-amber-200 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                  : 'bg-purple-900/60 text-purple-100 border border-purple-500/40 hover:bg-purple-800'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Music' : 'Start Zen Music'}</span>
            </button>

            <button
              onClick={handleRingBell}
              className="p-2 rounded-full bg-black/60 border border-amber-400/40 text-amber-200 hover:bg-amber-400 hover:text-slate-950 transition-all"
              title="Strike Singing Bowl"
            >
              <BellRing className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-2 bg-slate-950/90 border border-purple-500/30 p-1.5 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
            isPlaying
              ? 'bg-amber-200 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
              : 'bg-purple-900/40 text-purple-200 hover:text-white border border-purple-500/30'
          }`}
        >
          {isPlaying ? (
            <>
              <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Zen Audio Active</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-amber-400" />
              <span>Play Zen Music</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full bg-black/40 text-purple-200 hover:text-amber-200 transition-colors"
          title="Audio Settings"
        >
          <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
