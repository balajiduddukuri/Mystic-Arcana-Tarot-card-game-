import { SpreadConfig } from '../types';

export const SPREAD_CONFIGS: SpreadConfig[] = [
  {
    id: 'three_card',
    name: '3-Card Spread (Past / Present / Future)',
    description: 'Quick, highly intuitive snapshot of your timeline, ideal for daily queries or swift clarity.',
    cardCount: 3,
    difficulty: 'Beginner',
    recommendedFor: 'Daily advice, simple decision making, quick status checks.',
    positions: [
      {
        id: 1,
        title: 'The Past',
        description: 'Past events, subconscious roots, or lessons that led to your current situation.',
        x: 20,
        y: 50
      },
      {
        id: 2,
        title: 'The Present',
        description: 'Your current reality, immediate energy, mindset, or primary challenge.',
        x: 50,
        y: 50
      },
      {
        id: 3,
        title: 'The Future',
        description: 'The unfolding trajectory, potential outcome, or advice for moving forward.',
        x: 80,
        y: 50
      }
    ]
  },
  {
    id: 'celtic_cross',
    name: 'The Celtic Cross (10 Cards)',
    description: 'The quintessential comprehensive Tarot layout revealing deep roots, surrounding forces, and final outcome.',
    cardCount: 10,
    difficulty: 'Advanced',
    recommendedFor: 'Complex life questions, deep soul searching, major career/life pivots.',
    positions: [
      {
        id: 1,
        title: '1. Present / Core',
        description: 'Your central state of mind or heart of the matter.',
        x: 35,
        y: 50
      },
      {
        id: 2,
        title: '2. The Crossing / Challenge',
        description: 'Obstacles or immediate friction crossing your path.',
        x: 35,
        y: 50
      },
      {
        id: 3,
        title: '3. Foundation / Unconscious',
        description: 'Subconscious drives, deep past roots, or core beliefs.',
        x: 35,
        y: 80
      },
      {
        id: 4,
        title: '4. Recent Past',
        description: 'Events just behind you that are passing away.',
        x: 15,
        y: 50
      },
      {
        id: 5,
        title: '5. Crown / Potential',
        description: 'Your best possible outcome or conscious goal.',
        x: 35,
        y: 20
      },
      {
        id: 6,
        title: '6. Near Future',
        description: 'Immediate upcoming events or shifting energy in near weeks.',
        x: 55,
        y: 50
      },
      {
        id: 7,
        title: '7. Self / Attitude',
        description: 'Your internal stance, confidence, or self-perception.',
        x: 80,
        y: 85
      },
      {
        id: 8,
        title: '8. Environment / External',
        description: 'External influences, friends, family, or work climate.',
        x: 80,
        y: 63
      },
      {
        id: 9,
        title: '9. Hopes & Fears',
        description: 'Your innermost desires or anxieties regarding the situation.',
        x: 80,
        y: 41
      },
      {
        id: 10,
        title: '10. Final Outcome',
        description: 'The ultimate culmination if current path continues.',
        x: 80,
        y: 18
      }
    ]
  },
  {
    id: 'relationship',
    name: 'Relationship Spread (5 Cards)',
    description: 'Illuminates emotional alignment, interpersonal dynamics, and shared future trajectory between two souls.',
    cardCount: 5,
    difficulty: 'Intermediate',
    recommendedFor: 'Romance, close friendships, business co-founders, or family bonds.',
    positions: [
      {
        id: 1,
        title: 'You (Your Perspective)',
        description: 'Your feelings, expectations, and role in this relationship.',
        x: 20,
        y: 40
      },
      {
        id: 2,
        title: 'The Partner / Other',
        description: 'Their perspective, emotional state, and current energy toward you.',
        x: 80,
        y: 40
      },
      {
        id: 3,
        title: 'Current Dynamics',
        description: 'The energetic bridge connecting you both right now.',
        x: 50,
        y: 40
      },
      {
        id: 4,
        title: 'Shared Goal / Potential',
        description: 'Higher purpose or common ground you are building together.',
        x: 50,
        y: 15
      },
      {
        id: 5,
        title: 'Relationship Outcome',
        description: 'Future direction if communication and trust are nurtured.',
        x: 50,
        y: 75
      }
    ]
  }
];
