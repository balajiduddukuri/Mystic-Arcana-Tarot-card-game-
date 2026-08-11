import React from 'react';
import { ZODIAC_SIGNS } from '../data/horoscopeData';
import { ZodiacSignInfo } from '../types';
import { X, Check, Settings } from 'lucide-react';

interface ZodiacSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedZodiac: ZodiacSignInfo;
  onSelectZodiac: (sign: ZodiacSignInfo) => void;
}

export const ZodiacSettingsModal: React.FC<ZodiacSettingsModalProps> = ({
  isOpen,
  onClose,
  selectedZodiac,
  onSelectZodiac
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/10 rounded-xl border border-amber-400/20 text-amber-300">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-200">Personal Astrology Settings</h3>
              <p className="text-xs text-slate-400">Choose your primary Sun Sign for daily horoscopes.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = sign.id === selectedZodiac.id;
            return (
              <button
                key={sign.id}
                onClick={() => {
                  onSelectZodiac(sign);
                  onClose();
                }}
                className={`flex flex-col items-start gap-1 p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg font-bold scale-[1.02]'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-2xl">{sign.symbol}</span>
                  {isSelected && <Check className="w-4 h-4 text-slate-950" />}
                </div>
                <span className="font-serif text-xs font-bold mt-1">{sign.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                  {sign.dates}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
