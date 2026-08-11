import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { TAROT_CARDS, getCardById } from './src/data/tarotData';
import { SPREAD_CONFIGS } from './src/data/spreadsData';
import { generateDailyHoroscope, getCardOfTheDay } from './src/data/horoscopeData';
import { SavedReading, PlacedCard, SpreadType, InterpretationResult } from './src/types';

dotenv.config();

// In-memory persistent database for saved readings
let savedReadingsDatabase: SavedReading[] = [];

// Rule-based interpretation fallback generator
function generateRuleBasedInterpretation(
  spreadType: SpreadType,
  placedCards: PlacedCard[],
  focusQuestion?: string
): InterpretationResult {
  const spread = SPREAD_CONFIGS.find((s) => s.id === spreadType) || SPREAD_CONFIGS[0];

  const cardDetails = placedCards.map((pc, idx) => {
    const card = pc.card;
    const pos = spread.positions.find((p) => p.id === pc.positionId) || spread.positions[idx] || { title: `Position ${pc.positionId}`, description: '' };
    const orientation = pc.isReversed ? 'Reversed' : 'Upright';
    const meaning = pc.isReversed ? card.reversed_meaning : card.upright_meaning;

    // Neighbor interaction summary
    const prevCard = idx > 0 ? placedCards[idx - 1] : null;
    const nextCard = idx < placedCards.length - 1 ? placedCards[idx + 1] : null;

    let neighborInteraction = `Standing in the position of "${pos.title}", ${card.name} (${orientation}) emphasizes ${card.keywords.slice(0, 2).join(' and ')}.`;
    if (prevCard) {
      neighborInteraction += ` Building upon ${prevCard.card.name}'s influence in ${spread.positions[idx - 1]?.title || 'the prior position'}, it transitions your energy toward ${card.keywords[0].toLowerCase()}.`;
    }
    if (nextCard) {
      neighborInteraction += ` This paves the pathway toward ${nextCard.card.name} in ${spread.positions[idx + 1]?.title || 'the next phase'}.`;
    }

    return {
      positionTitle: pos.title,
      cardName: card.name,
      isReversed: pc.isReversed,
      summary: `${card.name} (${orientation}) - ${card.keywords.join(', ')}`,
      meaningInPosition: `${meaning} In the context of ${pos.title} (${pos.description}), this highlights key lessons regarding your current trajectory.`,
      neighborInteraction
    };
  });

  const cardNames = placedCards.map((pc) => `${pc.card.name}${pc.isReversed ? ' (Reversed)' : ''}`).join(', ');
  const questionContext = focusQuestion ? `Regarding your focus question ("${focusQuestion}"): ` : '';

  const overallSummary = `${questionContext}Your ${spread.name} reading features ${cardNames}. This arrangement reflects an organic progression of personal growth. Notice how elemental energies interact to guide your next decision with clarity and trust.`;

  return {
    overallSummary,
    primaryThemes: ['Awareness & Clarity', 'Personal Alignment', 'Spiritual Momentum'],
    opportunities: [
      'Embrace fresh perspective offered by your intuition.',
      'Take grounded steps aligned with your core values.',
      'Trust divine timing as circumstances unfold.'
    ],
    warnings: [
      'Avoid rushing decisions out of temporary impulse.',
      'Be mindful not to let past anxieties cloud present opportunities.'
    ],
    cardDetails
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini SDK lazily
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // API Endpoints

  // GET /api/cards - full deck or filtered
  app.get('/api/cards', (req, res) => {
    const { arcana, suit, search } = req.query;
    let filtered = [...TAROT_CARDS];

    if (arcana === 'major' || arcana === 'minor') {
      filtered = filtered.filter((c) => c.arcana_type === arcana);
    }
    if (suit && typeof suit === 'string') {
      filtered = filtered.filter((c) => c.suit === suit);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q)) ||
          c.summary.toLowerCase().includes(q)
      );
    }

    res.json({ count: filtered.length, cards: filtered });
  });

  // GET /api/cards/:id
  app.get('/api/cards/:id', (req, res) => {
    const card = getCardById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: 'Tarot card not found' });
    }
    res.json(card);
  });

  // GET /api/horoscope/daily?sign=...&date=...
  app.get('/api/horoscope/daily', (req, res) => {
    const sign = (req.query.sign as string) || 'scorpio';
    const date = (req.query.date as string) || new Date().toISOString().split('T')[0];

    const horoscope = generateDailyHoroscope(sign, date);
    const cardOfTheDay = getCardOfTheDay(date);

    res.json({
      horoscope,
      cardOfTheDay,
      lastUpdated: new Date().toISOString()
    });
  });

  // POST /api/readings/interpret - AI powered or rule based interpretation
  app.post('/api/readings/interpret', async (req, res) => {
    try {
      const { spreadType, placedCards, focusQuestion } = req.body as {
        spreadType: SpreadType;
        placedCards: PlacedCard[];
        focusQuestion?: string;
      };

      if (!placedCards || !Array.isArray(placedCards) || placedCards.length === 0) {
        return res.status(400).json({ error: 'Placed cards array is required' });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // Fallback to rule-based engine
        const result = generateRuleBasedInterpretation(spreadType, placedCards, focusQuestion);
        return res.json({ source: 'rule_engine', interpretation: result });
      }

      // Format prompt for Gemini AI
      const spread = SPREAD_CONFIGS.find((s) => s.id === spreadType) || SPREAD_CONFIGS[0];
      const cardListPrompt = placedCards
        .map((pc) => {
          const pos = spread.positions.find((p) => p.id === pc.positionId) || { title: `Position ${pc.positionId}` };
          return `- Position: "${pos.title}" -> Card: ${pc.card.name} (${pc.isReversed ? 'Reversed' : 'Upright'}). Keywords: ${pc.card.keywords.join(', ')}. Meanings: ${pc.isReversed ? pc.card.reversed_meaning : pc.card.upright_meaning}`;
        })
        .join('\n');

      const systemPrompt = `You are Mystic Arcana's master Tarot Reader and intuitive guide. Provide a warm, mystical, beginner-friendly, non-fatalistic, and deeply insightful Tarot interpretation.
Return ONLY a valid JSON object matching the following structure:
{
  "overallSummary": "High-level 3-4 sentence reading summary synthesized across all cards and positions",
  "primaryThemes": ["Theme 1", "Theme 2", "Theme 3"],
  "opportunities": ["Opportunity 1", "Opportunity 2"],
  "warnings": ["Gentle Warning 1", "Gentle Warning 2"],
  "cardDetails": [
    {
      "positionTitle": "Name of position",
      "cardName": "Name of card",
      "isReversed": false,
      "summary": "2 sentence beginner overview of this card in position",
      "meaningInPosition": "Detailed explanation for love, career, and personal life in this position",
      "neighborInteraction": "Narrative explanation of how this card interacts with surrounding cards in the spread"
    }
  ]
}`;

      const userPrompt = `Reading Spread: ${spread.name}
Focus Question: "${focusQuestion || 'General life path and guidance'}"

Cards Placed in Spread:
${cardListPrompt}

Please interpret this reading using warm, supportive, beginner-accessible language.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || '';
      const parsedInterpretation = JSON.parse(text) as InterpretationResult;

      return res.json({ source: 'gemini_ai', interpretation: parsedInterpretation });
    } catch (error) {
      console.error('Error generating AI interpretation:', error);
      // Fallback on error
      const { spreadType, placedCards, focusQuestion } = req.body;
      const result = generateRuleBasedInterpretation(spreadType, placedCards, focusQuestion);
      return res.json({ source: 'rule_engine_fallback', interpretation: result });
    }
  });

  // POST /api/readings - save reading
  app.post('/api/readings', (req, res) => {
    const { focusQuestion, spreadType, placedCards, interpretation, tags, userNotes } = req.body;

    const newReading: SavedReading = {
      id: `reading_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      focusQuestion: focusQuestion || 'General Guidance',
      spreadType,
      placedCards,
      interpretation,
      tags: tags || ['General'],
      userNotes
    };

    savedReadingsDatabase.unshift(newReading);
    res.status(201).json(newReading);
  });

  // GET /api/readings - list user saved readings
  app.get('/api/readings', (req, res) => {
    res.json({ readings: savedReadingsDatabase });
  });

  // DELETE /api/readings/:id
  app.delete('/api/readings/:id', (req, res) => {
    const { id } = req.params;
    savedReadingsDatabase = savedReadingsDatabase.filter((r) => r.id !== id);
    res.json({ success: true, message: 'Reading deleted successfully' });
  });

  // Vite Middleware handling for development and production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mystic Arcana server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
