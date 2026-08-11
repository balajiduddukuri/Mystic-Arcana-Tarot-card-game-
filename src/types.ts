export type ArcanaType = 'major' | 'minor';
export type SuitType = 'wands' | 'cups' | 'swords' | 'pentacles';

export interface TarotCard {
  id: string;
  name: string;
  arcana_type: ArcanaType;
  suit?: SuitType;
  number: number;
  keywords: string[];
  upright_meaning: string;
  reversed_meaning: string;
  image_url: string;
  illustration_style_notes: string;
  element: 'Fire' | 'Water' | 'Air' | 'Earth' | 'Spirit';
  astrology?: string;
  summary: string;
  love_meaning: string;
  career_meaning: string;
  spirituality_meaning: string;
}

export type SpreadType = 'three_card' | 'celtic_cross' | 'relationship';

export interface SpreadPosition {
  id: number;
  title: string;
  description: string;
  x: number; // grid or relative position percentage
  y: number;
}

export interface SpreadConfig {
  id: SpreadType;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommendedFor: string;
}

export interface PlacedCard {
  positionId: number;
  card: TarotCard;
  isReversed: boolean;
}

export interface InterpretationResult {
  overallSummary: string;
  primaryThemes: string[];
  opportunities: string[];
  warnings: string[];
  cardDetails: {
    positionTitle: string;
    cardName: string;
    isReversed: boolean;
    summary: string;
    meaningInPosition: string;
    neighborInteraction: string;
  }[];
}

export interface SavedReading {
  id: string;
  createdAt: string;
  focusQuestion: string;
  spreadType: SpreadType;
  placedCards: PlacedCard[];
  interpretation: InterpretationResult;
  tags: string[];
  userNotes?: string;
}

export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  trait: string;
}

export interface DailyHoroscope {
  date: string;
  sign: string;
  overview: string;
  love: string;
  career: string;
  wellbeing: string;
  lucky_number: number;
  lucky_color: string;
  lucky_time: string;
  compatible_sign: string;
  seven_day_trend: { day: string; energyScore: number; focus: string }[];
}

export interface CardOfTheDay {
  date: string;
  card: TarotCard;
  isReversed: boolean;
  message: string;
}
