import { ZodiacSignInfo, DailyHoroscope, CardOfTheDay } from '../types';
import { TAROT_CARDS } from './tarotData';

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { id: 'aries', name: 'Aries', symbol: '♈', dates: 'Mar 21 - Apr 19', element: 'Fire', rulingPlanet: 'Mars', trait: 'Bold, Ambitious, Pioneer' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', dates: 'Apr 20 - May 20', element: 'Earth', rulingPlanet: 'Venus', trait: 'Grounded, Patient, Sensual' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', dates: 'May 21 - Jun 20', element: 'Air', rulingPlanet: 'Mercury', trait: 'Curious, Adaptable, Expressive' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', dates: 'Jun 21 - Jul 22', element: 'Water', rulingPlanet: 'Moon', trait: 'Nurturing, Intuitive, Protective' },
  { id: 'leo', name: 'Leo', symbol: '♌', dates: 'Jul 23 - Aug 22', element: 'Fire', rulingPlanet: 'Sun', trait: 'Radiant, Generous, Leader' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', dates: 'Aug 23 - Sep 22', element: 'Earth', rulingPlanet: 'Mercury', trait: 'Analytical, Meticulous, Helpful' },
  { id: 'libra', name: 'Libra', symbol: '♎', dates: 'Sep 23 - Oct 22', element: 'Air', rulingPlanet: 'Venus', trait: 'Harmonious, Diplomatic, Aesthetic' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21', element: 'Water', rulingPlanet: 'Pluto', trait: 'Passionate, Transformative, Intuitive' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21', element: 'Fire', rulingPlanet: 'Jupiter', trait: 'Adventurous, Philosophical, Free' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19', element: 'Earth', rulingPlanet: 'Saturn', trait: 'Disciplined, Strategic, Resilient' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18', element: 'Air', rulingPlanet: 'Uranus', trait: 'Visionary, Humanitarian, Independent' },
  { id: 'pisces', name: 'Pisces', symbol: '♓', dates: 'Feb 19 - Mar 20', element: 'Water', rulingPlanet: 'Neptune', trait: 'Mystical, Empathetic, Creative' },
];

export const ZODIAC_AFFIRMATIONS: Record<string, string[]> = {
  aries: [
    "I channel my fiery passion into bold, purposeful action today. I am fearlessly unstoppable.",
    "My pioneering spirit opens doors where others see walls. I trust my inner fire and momentum.",
    "I lead with courage, integrity, and boundless enthusiasm as my life path aligns with victory.",
    "I am the master of my own courage. Every challenge I encounter transforms into inspired action."
  ],
  taurus: [
    "I am grounded in peace, surrounded by abundance, and worthy of enduring beauty.",
    "My patience is my superpower. I cultivate prosperity step by deliberate, joyful step.",
    "I trust the steady rhythm of life and honor my sacred sanctuary for rest and comfort.",
    "I stand unshakable in my self-worth. Peace and financial stability flow naturally to me."
  ],
  gemini: [
    "My mind is an endless source of inspiration, joy, and brilliant connected wisdom.",
    "I express my authentic truth with clarity, playfulness, and vibrant intellectual grace.",
    "I welcome fresh perspectives and allow life's synchronicities to surprise and delight me.",
    "I easily bridge ideas with hearts, radiating sparkling curiosity and versatile brilliance."
  ],
  cancer: [
    "My intuition is my infallible inner compass. I honor and nurture my compassionate soul.",
    "I am safe to feel deeply and share my gentle, protective warmth with those I love.",
    "I create a sanctuary of emotional harmony and lasting security wherever I walk.",
    "Like the lunar tides, I embrace my natural emotional flow and trust my inner knowing."
  ],
  leo: [
    "I shine my radiant, warm light brightly without apology. I am born to inspire and uplift.",
    "My heart is generous, my spirit is noble, and my creative expression knows no bounds.",
    "I step confidently into the spotlight of my own destiny with royal grace and joy.",
    "I lead with love, warmth, and authentic magnetism in every interaction today."
  ],
  virgo: [
    "I release perfectionism and celebrate the quiet excellence of my daily progress.",
    "My mind is organized, my vision is crystal clear, and my service deeply enriches others.",
    "I cultivate inner order and serene focus, trusting that life unfolds in divine harmony.",
    "I honor my physical body as a sacred vessel and bestow practical wisdom on my world."
  ],
  libra: [
    "I cultivate perfect balance, aesthetic harmony, and deep tranquility within my soul.",
    "My relationships are mirrors of mutual respect, unconditional love, and spiritual alignment.",
    "I make decisions with gracious ease, trusting in the fairness and balance of the cosmos.",
    "I am a beacon of diplomacy, artistic beauty, and serene grace in all circumstances."
  ],
  scorpio: [
    "I embrace my transformative power. From every shift, I rise stronger, wiser, and reborn.",
    "My intuition sees beyond illusions. I trust my profound emotional resilience and depth.",
    "I align with authentic truth and allow my magnetic focus to manifest my highest intentions.",
    "I honor my sacred depth and channel my intensity into creation and soul healing."
  ],
  sagittarius: [
    "The universe expands before me in infinite abundance, adventure, and higher truth.",
    "I walk my path with optimism, warmth, and an open, truth-seeking heart.",
    "I am a lifelong explorer, trusting that every journey enriches my mind and spirit.",
    "My vision is vast, my faith is unshakable, and my joyful spirit remains forever free."
  ],
  capricorn: [
    "I am building an enduring legacy through discipline, wisdom, and steady resolve.",
    "I honor my ambitious goals and celebrate every milestone peak I conquer.",
    "My authority is rooted in integrity, emotional maturity, and deep self-respect.",
    "I trust my inner stamina; time and perseverance work continuously in my favor."
  ],
  aquarius: [
    "My unique vision and innovative mind pave the way for a brighter collective future.",
    "I embrace my individuality with pride, inspiring freedom, truth, and hope in others.",
    "I am tuned into the higher frequency of humanity, generating breakthrough insights.",
    "I honor my independent path while showering unconditional goodwill on all beings."
  ],
  pisces: [
    "I am intimately connected to the boundless ocean of divine love, art, and empathy.",
    "My dreams are sacred seeds of reality. I trust the intuitive whispers of my soul.",
    "I establish gentle boundaries while letting my empathy heal and uplift those around me.",
    "I release resistance and float gracefully upon the cosmic stream of peace and magic."
  ]
};

export const generateDailyHoroscope = (signId: string, dateStr?: string): DailyHoroscope => {
  const sign = ZODIAC_SIGNS.find((s) => s.id === signId) || ZODIAC_SIGNS[7]; // default Scorpio
  const date = dateStr || new Date().toISOString().split('T')[0];

  const luckyColors = ['Amethyst Purple', 'Celestial Gold', 'Deep Indigo', 'Emerald Green', 'Rose Quartz', 'Midnight Blue'];
  const times = ['09:15 AM', '02:30 PM', '07:45 PM', '11:11 AM', '04:20 PM'];

  // Hash seed from date + sign
  let hash = 0;
  const seed = `${signId}-${date}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);

  const luckyNum = (posHash % 88) + 1;
  const colorIndex = posHash % luckyColors.length;
  const timeIndex = posHash % times.length;
  const compatibleSign = ZODIAC_SIGNS[(posHash + 3) % ZODIAC_SIGNS.length].name;

  // Personalized Daily Affirmation
  const signAffirmations = ZODIAC_AFFIRMATIONS[sign.id] || ZODIAC_AFFIRMATIONS['scorpio'];
  const dailyAffirmation = signAffirmations[posHash % signAffirmations.length];

  // 7-day trend history
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sevenDayTrend = days.map((day, idx) => {
    const score = 65 + ((posHash + idx * 13) % 35);
    const focuses = ['Intuition', 'Creative Spark', 'Financial Harmony', 'Heart Opening', 'Clear Vision', 'Deep Rest', 'Social Connection'];
    return {
      day,
      energyScore: score,
      focus: focuses[(posHash + idx) % focuses.length]
    };
  });

  return {
    date,
    sign: sign.name,
    overview: `Celestial energies today highlight your ${sign.trait.toLowerCase()} nature, ${sign.name}. With ruling planet ${sign.rulingPlanet} forming a harmonious trine, cosmic clarity brings renewed motivation. Focus on alignment before rushing into major commitments.`,
    love: `Venus brings soft warmth into your emotional sphere. If partnered, an open conversation opens fresh tenderness. If single, your natural magnetic charm shines brightly during quiet afternoon hours.`,
    career: `Mercury grants sharp focus for strategic planning. An unexpected insight during collaborative discussions resolves a lingering bottleneck. Stay steady and trust your instincts.`,
    wellbeing: `Ground your physical energy through nature walks, mindful breathing, or gentle stretches. Hydrate well and avoid absorbing external anxieties.`,
    daily_affirmation: dailyAffirmation,
    lucky_number: luckyNum,
    lucky_color: luckyColors[colorIndex],
    lucky_time: times[timeIndex],
    compatible_sign: compatibleSign,
    seven_day_trend: sevenDayTrend
  };
};

export const getCardOfTheDay = (dateStr?: string): CardOfTheDay => {
  const date = dateStr || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash << 5) - hash + date.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);
  const cardIndex = posHash % TAROT_CARDS.length;
  const isReversed = posHash % 3 === 0;
  const card = TAROT_CARDS[cardIndex];

  const message = isReversed
    ? `Today's guidance with ${card.name} (Reversed) asks you to gently pause, release rigid expectations, and listen to your inner quiet wisdom.`
    : `Today's energy with ${card.name} invites you to embrace ${card.keywords.slice(0, 3).join(', ')}. Step forward with trust and clarity!`;

  return {
    date,
    card,
    isReversed,
    message
  };
};
