import React from 'react';
import { Palette, X, Check, Sparkles } from 'lucide-react';
import { THEMES, ThemeConfig } from '../data/themes';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-950 border border-purple-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-200/10 border border-amber-300/30 text-amber-300">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-200 flex items-center gap-2">
                <span>Celestial Theme Sanctuary</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-purple-200/70">
                Customize the visual atmosphere and color aura of your Tarot experience.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 text-purple-200/60 hover:text-white border border-purple-500/20 hover:border-amber-400/40 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
          {THEMES.map((theme: ThemeConfig) => {
            const isSelected = theme.id === currentThemeId;
            return (
              <div
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-300 bg-amber-300/10 shadow-[0_0_20px_rgba(251,191,36,0.25)] scale-[1.02]'
                    : 'border-white/10 bg-black/40 hover:border-amber-400/50 hover:bg-black/60'
                }`}
              >
                {/* Color Swatch Preview Stripe */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{theme.icon}</span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-amber-200 group-hover:text-amber-100">
                        {theme.name}
                      </h4>
                      <p className="text-[11px] text-purple-200/60 leading-tight">
                        {theme.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-amber-300 text-slate-950">
                      <Check className="w-4 h-4 font-bold" />
                    </div>
                  )}
                </div>

                {/* Color Palette Indicators */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    {theme.previewColors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={`Color swatch ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className={`text-[10px] uppercase font-mono font-bold tracking-wider ${
                    isSelected ? 'text-amber-300' : 'text-purple-300/40 group-hover:text-purple-200'
                  }`}>
                    {isSelected ? 'Active Theme' : 'Click to Apply'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-purple-500/20 relative z-10">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-amber-200 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
