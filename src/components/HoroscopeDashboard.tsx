import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Briefcase, Activity, Calendar, Star, Compass, ArrowRight, RefreshCw, Quote, Copy, Check, Volume2, PenTool, Flame } from 'lucide-react';
import { ZodiacSignInfo, DailyHoroscope, CardOfTheDay } from '../types';
import { ZODIAC_SIGNS } from '../data/horoscopeData';
import { zenAudio } from '../utils/zenAudio';

interface HoroscopeDashboardProps {
  selectedZodiac: ZodiacSignInfo;
  onSelectZodiac: (sign: ZodiacSignInfo) => void;
  onStartReading: () => void;
}

export const HoroscopeDashboard: React.FC<HoroscopeDashboardProps> = ({
  selectedZodiac,
  onSelectZodiac,
  onStartReading
}) => {
  const [data, setData] = useState<{ horoscope: DailyHoroscope; cardOfTheDay: CardOfTheDay } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [copiedAffirmation, setCopiedAffirmation] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [userReflection, setUserReflection] = useState<string>(() => {
    return localStorage.getItem(`reflection_${selectedZodiac.id}`) || '';
  });

  useEffect(() => {
    fetchHoroscope(selectedZodiac.id);
    setUserReflection(localStorage.getItem(`reflection_${selectedZodiac.id}`) || '');
  }, [selectedZodiac.id]);

  const handleCopyAffirmation = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAffirmation(true);
    setTimeout(() => setCopiedAffirmation(false), 2000);
  };

  const handleChimeAffirmation = () => {
    zenAudio.playSingingBowlChime(528); // 528Hz Solfeggio frequency chime
  };

  const handleSaveReflection = (val: string) => {
    setUserReflection(val);
    localStorage.setItem(`reflection_${selectedZodiac.id}`, val);
  };

  const fetchHoroscope = async (signId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/horoscope/daily?sign=${signId}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load horoscope API:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4 text-amber-200">
        <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
        <p className="font-serif text-sm tracking-widest uppercase">Aligning Celestial Energies...</p>
      </div>
    );
  }

  const { horoscope, cardOfTheDay } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-purple-950/20 border border-purple-500/30 p-6 md:p-8 backdrop-blur-sm shadow-2xl">
        {/* Background Aura */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-200/70 text-xs uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Daily Celestial Guidance • {horoscope.date}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white">
              Welcome, Seeker of {selectedZodiac.name} {selectedZodiac.symbol}
            </h2>
            <p className="text-purple-100/80 text-sm md:text-base leading-relaxed italic">
              "The cosmos aligns to reveal clear pathways today. Consult your horoscope, reveal your Tarot Card of the Day, or cast a custom card spread."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartReading}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-amber-200 text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:scale-105 active:scale-95 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Cast Tarot Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Zodiac Sign Selector Bar */}
        <div className="mt-8 pt-6 border-t border-purple-900/40">
          <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300/60 font-mono mb-3">Select Zodiac Sign:</p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ZODIAC_SIGNS.map((sign) => {
              const isSelected = sign.id === selectedZodiac.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => onSelectZodiac(sign)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-200 text-slate-950 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)] scale-105'
                      : 'bg-black/40 text-purple-200/70 border border-purple-500/20 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{sign.symbol}</span>
                  <span>{sign.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Horoscope Insights & Card of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Horoscope Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Affirmation Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-purple-950/30 to-black rounded-3xl border border-amber-400/40 p-6 sm:p-8 backdrop-blur-md shadow-[0_0_25px_rgba(251,191,36,0.15)] space-y-4 group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-400/10 transition-all" />
            
            <div className="flex items-center justify-between border-b border-amber-400/20 pb-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-200/10 border border-amber-300/30 text-amber-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300/80">Daily Zodiac Affirmation</span>
                  <h3 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
                    <span>{selectedZodiac.name} {selectedZodiac.symbol}</span>
                    <span className="text-xs font-sans font-normal text-purple-200/60">• Updated Daily</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleChimeAffirmation}
                  className="p-2 rounded-full bg-black/40 border border-amber-400/30 text-amber-200 hover:bg-amber-300 hover:text-slate-950 transition-all text-xs flex items-center gap-1.5 px-3 font-mono font-semibold"
                  title="Ring 528Hz Solfeggio Chime"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Chime</span>
                </button>

                <button
                  onClick={() => handleCopyAffirmation(horoscope.daily_affirmation)}
                  className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 px-3 font-mono font-semibold ${
                    copiedAffirmation
                      ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                      : 'bg-black/40 border-purple-500/30 text-purple-200 hover:text-white hover:border-amber-400/40'
                  }`}
                  title="Copy Affirmation"
                >
                  {copiedAffirmation ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Affirmation Quote Body */}
            <div className="relative z-10 pt-1 space-y-3">
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-amber-300/40 shrink-0 rotate-180" />
                <p className="font-serif text-xl sm:text-2xl text-amber-100 leading-relaxed font-normal tracking-wide italic">
                  "{horoscope.daily_affirmation}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-200/80 hover:text-amber-200 transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showReflection ? 'Close Intention Note' : userReflection ? 'View Personal Intention' : 'Add Daily Intention / Note'}</span>
                </button>

                <span className="text-[10px] font-mono text-purple-300/50 uppercase tracking-widest">
                  Element: {selectedZodiac.element}
                </span>
              </div>

              {/* Optional Reflection / Journal Note Box */}
              {showReflection && (
                <div className="mt-3 pt-3 border-t border-purple-500/20 animate-fadeIn space-y-2">
                  <label className="text-xs font-mono text-amber-200/80 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>My Intention & Reflection for Today ({horoscope.date}):</span>
                  </label>
                  <textarea
                    value={userReflection}
                    onChange={(e) => handleSaveReflection(e.target.value)}
                    placeholder="Write down how this affirmation aligns with your goals today..."
                    rows={3}
                    className="w-full bg-black/60 border border-purple-500/30 rounded-2xl p-3 text-xs text-purple-100 placeholder-purple-300/40 focus:outline-none focus:border-amber-300 transition-colors resize-none"
                  />
                  <p className="text-[10px] font-mono text-purple-300/50 text-right">
                    Saved automatically to your device.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overview Card */}
          <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif text-lg text-amber-200">Daily Overview</h3>
              </div>
              <span className="text-[11px] font-mono text-purple-300 bg-black/40 px-3 py-1 rounded-full border border-purple-500/30">
                Ruling Planet: {selectedZodiac.rulingPlanet}
              </span>
            </div>
            <p className="text-purple-100/90 text-sm md:text-base leading-relaxed italic">"{horoscope.overview}"</p>
          </div>

          {/* 3 Columns: Love, Career, Wellbeing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Love */}
            <div className="bg-black/40 rounded-2xl border border-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-xs uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5" />
                <span>Love & Spirit</span>
              </div>
              <p className="text-purple-100/70 text-xs leading-relaxed">{horoscope.love}</p>
            </div>

            {/* Career */}
            <div className="bg-black/40 rounded-2xl border border-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-widest">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Career & Wealth</span>
              </div>
              <p className="text-purple-100/70 text-xs leading-relaxed">{horoscope.career}</p>
            </div>

            {/* Wellbeing */}
            <div className="bg-black/40 rounded-2xl border border-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs uppercase tracking-widest">
                <Activity className="w-3.5 h-3.5" />
                <span>Well-being</span>
              </div>
              <p className="text-purple-100/70 text-xs leading-relaxed">{horoscope.wellbeing}</p>
            </div>
          </div>

          {/* Lucky Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 rounded-2xl border border-purple-500/20 p-4">
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/10 text-center">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest">Lucky Number</p>
              <p className="text-lg font-bold font-serif text-amber-200">{horoscope.lucky_number}</p>
            </div>
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/10 text-center">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest">Lucky Color</p>
              <p className="text-xs font-semibold text-purple-200 truncate mt-1">{horoscope.lucky_color}</p>
            </div>
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/10 text-center">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest">Power Time</p>
              <p className="text-xs font-semibold text-indigo-300 mt-1">{horoscope.lucky_time}</p>
            </div>
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/10 text-center">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest">Compat Sign</p>
              <p className="text-xs font-semibold text-amber-200 mt-1">{horoscope.compatible_sign}</p>
            </div>
          </div>

          {/* 7-Day Trend Mini Chart */}
          <div className="bg-purple-950/20 rounded-3xl border border-purple-500/30 p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h4 className="font-serif text-base text-amber-200">7-Day Energy Forecast</h4>
              </div>
              <span className="text-[10px] text-purple-300/60 font-mono uppercase tracking-widest">Score / 100</span>
            </div>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {horoscope.seven_day_trend.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group">
                  <div className="w-full bg-black/50 h-28 rounded-xl p-1.5 flex flex-col justify-end items-center border border-white/5 group-hover:border-amber-400/40 transition-colors">
                    <div
                      className="w-full bg-gradient-to-t from-purple-800 via-indigo-600 to-amber-300 rounded-lg transition-all duration-500 group-hover:brightness-125"
                      style={{ height: `${item.energyScore}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-amber-200 font-mono">{item.day}</span>
                  <span className="text-[9px] text-purple-300/60 text-center line-clamp-1">{item.focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Card of the Day Interactive Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-black/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center space-y-5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
            
            <h3 className="text-center text-xs uppercase tracking-[0.3em] text-amber-400">Card of the Day</h3>

            {/* Flip Card Container */}
            <div
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="relative w-56 h-96 cursor-pointer perspective group select-none"
            >
              <div
                className={`w-full h-full duration-700 transform-style-3d transition-transform ${
                  isCardFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front (Card Back design before flip) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#121225] border-2 border-amber-200/50 p-2.5 shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col items-center justify-between backface-hidden">
                  <div className="w-full border border-amber-200/30 rounded-lg h-full flex flex-col items-center justify-between py-6 relative z-10 bg-black/30">
                    <span className="text-amber-200 font-serif text-lg font-bold uppercase tracking-widest">✦ ORACLE ✦</span>
                    <div className="w-28 h-28 rounded-full border border-amber-500/50 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-200 to-amber-600/30 flex items-center justify-center">
                        <div className="w-12 h-12 bg-[#121225] rounded-full flex items-center justify-center text-amber-200 text-2xl font-bold">
                          ✦
                        </div>
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <p className="font-serif text-amber-200 text-xs md:text-sm font-bold uppercase tracking-widest">Tap to Reveal Card</p>
                    </div>
                  </div>
                </div>

                {/* Back (Revealed Tarot Card) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl border-2 border-amber-300 p-2 bg-[#121225] shadow-2xl backface-hidden rotate-y-180 flex flex-col items-center justify-between overflow-hidden relative">
                  <img
                    src={cardOfTheDay.card.image_url}
                    alt={cardOfTheDay.card.name}
                    className={`w-full h-full object-cover rounded-xl ${
                      cardOfTheDay.isReversed ? 'rotate-180' : ''
                    }`}
                  />
                  {/* Card Title Banner on Card Face */}
                  <div className="absolute bottom-3 inset-x-2 px-3 py-1.5 bg-black/90 border border-amber-300/60 rounded-xl backdrop-blur-md text-center shadow-2xl z-20">
                    <p className="font-serif text-sm font-bold text-amber-200 leading-tight">
                      {cardOfTheDay.card.name}
                    </p>
                    <p className="text-[10px] font-mono font-semibold text-purple-200 uppercase tracking-widest mt-0.5">
                      {cardOfTheDay.isReversed ? '✦ Reversed' : '✦ Upright'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Reveal Guidance Message */}
            {isCardFlipped ? (
              <div className="space-y-3 bg-purple-950/40 border border-purple-500/30 p-4 rounded-2xl text-left animate-fadeIn w-full">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-amber-200 font-bold text-sm">
                    {cardOfTheDay.card.name} {cardOfTheDay.isReversed ? '(Reversed)' : ''}
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-200/20 text-amber-200">
                    {cardOfTheDay.card.arcana_type}
                  </span>
                </div>
                <p className="text-purple-100/80 text-xs leading-relaxed italic">{cardOfTheDay.message}</p>
                <div className="pt-2 border-t border-purple-900/40 text-[10px] text-amber-200/70 font-mono">
                  Keywords: {cardOfTheDay.card.keywords.join(' • ')}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCardFlipped(true)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-200 hover:text-amber-100 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reveal Celestial Guidance</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
