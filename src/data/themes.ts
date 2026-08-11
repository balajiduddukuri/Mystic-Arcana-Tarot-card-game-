export interface ThemeConfig {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  bgGradient: string;
  containerBg: string;
  cardBg: string;
  borderAccent: string;
  textAccent: string;
  buttonBg: string;
  glowColor: string;
  previewColors: string[];
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'mystic',
    name: 'Mystic Midnight',
    subtitle: 'Classic Deep Violet & Celestial Gold',
    icon: '🔮',
    bgGradient: 'from-slate-950 via-purple-950/40 to-slate-950',
    containerBg: 'bg-[#0a0a16]',
    cardBg: 'bg-[#121225]',
    borderAccent: 'border-purple-500/30',
    textAccent: 'text-amber-200',
    buttonBg: 'bg-amber-200 text-slate-950',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    previewColors: ['#0a0a16', '#3b0764', '#fde047']
  },
  {
    id: 'emerald',
    name: 'Emerald Sanctuary',
    subtitle: 'Deep Forest Jade & Warm Brass',
    icon: '🌿',
    bgGradient: 'from-slate-950 via-emerald-950/40 to-slate-950',
    containerBg: 'bg-[#06140e]',
    cardBg: 'bg-[#0d2218]',
    borderAccent: 'border-emerald-500/30',
    textAccent: 'text-emerald-200',
    buttonBg: 'bg-emerald-300 text-slate-950',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    previewColors: ['#06140e', '#064e3b', '#6ee7b7']
  },
  {
    id: 'obsidian',
    name: 'Obsidian Eclipse',
    subtitle: 'Monochrome Dark Slate & Moonlight Silver',
    icon: '🌒',
    bgGradient: 'from-neutral-950 via-stone-900/50 to-neutral-950',
    containerBg: 'bg-[#0c0c0e]',
    cardBg: 'bg-[#17171c]',
    borderAccent: 'border-stone-500/30',
    textAccent: 'text-stone-200',
    buttonBg: 'bg-stone-200 text-slate-950',
    glowColor: 'rgba(214, 211, 209, 0.25)',
    previewColors: ['#0c0c0e', '#262626', '#e7e5e4']
  },
  {
    id: 'solstice',
    name: 'Solar Solstice',
    subtitle: 'Rich Crimson & Sunbeam Gold',
    icon: '🌞',
    bgGradient: 'from-slate-950 via-rose-950/40 to-slate-950',
    containerBg: 'bg-[#140608]',
    cardBg: 'bg-[#220d10]',
    borderAccent: 'border-rose-500/30',
    textAccent: 'text-amber-200',
    buttonBg: 'bg-amber-300 text-slate-950',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    previewColors: ['#140608', '#881337', '#fde047']
  },
  {
    id: 'ethereal',
    name: 'Ethereal Nebula',
    subtitle: 'Deep Oceanic Navy & Starlight Cyan',
    icon: '🌌',
    bgGradient: 'from-slate-950 via-sky-950/40 to-slate-950',
    containerBg: 'bg-[#060f1e]',
    cardBg: 'bg-[#0d1b30]',
    borderAccent: 'border-cyan-500/30',
    textAccent: 'text-cyan-200',
    buttonBg: 'bg-cyan-300 text-slate-950',
    glowColor: 'rgba(34, 211, 238, 0.25)',
    previewColors: ['#060f1e', '#0c4a6e', '#67e8f9']
  },
  {
    id: 'velvet',
    name: 'Velvet Rose',
    subtitle: 'Royal Plum & Rose Gold',
    icon: '🌹',
    bgGradient: 'from-slate-950 via-pink-950/40 to-slate-950',
    containerBg: 'bg-[#120610]',
    cardBg: 'bg-[#200d1c]',
    borderAccent: 'border-pink-500/30',
    textAccent: 'text-pink-200',
    buttonBg: 'bg-pink-300 text-slate-950',
    glowColor: 'rgba(244, 114, 182, 0.25)',
    previewColors: ['#120610', '#831843', '#f472b6']
  }
];
