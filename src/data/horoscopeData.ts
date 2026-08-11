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
