import { TarotCard } from '../types';

// Helper SVG illustration generator for crisp, stylized card artwork
const createCardSvg = (title: string, symbol: string, color1: string, color2: string, accentColor: string, isMajor: boolean) => {
  const encodedSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="${color1}" stop-opacity="0" />
        </radialGradient>
        <pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#FDE047" opacity="0.4"/>
          <circle cx="15" cy="12" r="0.6" fill="#FFFFFF" opacity="0.3"/>
        </pattern>
      </defs>
      
      <!-- Card Frame -->
      <rect x="0" y="0" width="300" height="500" rx="16" fill="url(#bg)" />
      <rect x="0" y="0" width="300" height="500" rx="16" fill="url(#stars)" />
      
      <!-- Outer Ornamental Border -->
      <rect x="12" y="12" width="276" height="476" rx="12" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.8" />
      <rect x="18" y="18" width="264" height="464" rx="8" fill="none" stroke="${accentColor}" stroke-width="1" stroke-dasharray="4,4" opacity="0.6" />
      
      <!-- Corner Accents -->
      <polygon points="12,30 30,12 12,12" fill="${accentColor}" opacity="0.8" />
      <polygon points="288,30 270,12 288,12" fill="${accentColor}" opacity="0.8" />
      <polygon points="12,470 30,488 12,488" fill="${accentColor}" opacity="0.8" />
      <polygon points="288,470 270,488 288,488" fill="${accentColor}" opacity="0.8" />

      <!-- Center Aura Glow -->
      <circle cx="150" cy="220" r="110" fill="url(#glow)" />
      
      <!-- Celestial Ring -->
      <circle cx="150" cy="220" r="85" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.7" />
      <circle cx="150" cy="220" r="95" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="2,6" opacity="0.5" />
      
      <!-- Center Symbol / Icon -->
      <g transform="translate(150, 220)">
        <text x="0" y="18" font-family="Georgia, serif" font-size="72" fill="#FFFFFF" text-anchor="middle" dominant-baseline="central" filter="drop-shadow(0px 4px 12px ${accentColor})">${symbol}</text>
      </g>
      
      <!-- Card Header / Banner -->
      <rect x="35" y="32" width="230" height="32" rx="6" fill="#090D16" fill-opacity="0.6" stroke="${accentColor}" stroke-width="1" />
      <text x="150" y="52" font-family="Cinzel, Times, serif" font-size="12" font-weight="bold" letter-spacing="2" fill="${accentColor}" text-anchor="middle">${isMajor ? 'MAJOR ARCANA' : 'MINOR ARCANA'}</text>

      <!-- Card Title & Footer -->
      <rect x="25" y="420" width="250" height="45" rx="8" fill="#090D16" fill-opacity="0.8" stroke="${accentColor}" stroke-width="1" />
      <text x="150" y="447" font-family="Cinzel, Georgia, serif" font-size="16" font-weight="bold" letter-spacing="1" fill="#FFFFFF" text-anchor="middle">${title.toUpperCase()}</text>
    </svg>
  `);
  return `data:image/svg+xml;utf8,${encodedSvg}`;
};

export const TAROT_CARDS: TarotCard[] = [
  // MAJOR ARCANA (22 Cards)
  {
    id: 'm0',
    name: 'The Fool',
    arcana_type: 'major',
    number: 0,
    keywords: ['New Beginnings', 'Innocence', 'Spontaneity', 'Free Spirit', 'Faith'],
    upright_meaning: 'Embrace new journeys with an open heart. The Fool signals infinite potential, taking leaps of faith, and trusting the universe.',
    reversed_meaning: 'Recklessness, risk-taking without foresight, hesitation, or fear of stepping into the unknown.',
    image_url: createCardSvg('0 - The Fool', '☀️', '#1e1b4b', '#312e81', '#fde047', true),
    illustration_style_notes: 'Luminous sun rising over mountain peaks as a youth stands at the edge with a white rose and loyal canine companion.',
    element: 'Air',
    astrology: 'Uranus',
    summary: 'A symbol of pure potential and bold new beginnings.',
    love_meaning: 'New romance on the horizon, playful energy, or taking a leap in relationships.',
    career_meaning: 'Fresh career ventures, creative projects, or changing career paths.',
    spirituality_meaning: 'Trusting your intuitive compass and stepping onto a new spiritual quest.'
  },
  {
    id: 'm1',
    name: 'The Magician',
    arcana_type: 'major',
    number: 1,
    keywords: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired Action', 'Skill'],
    upright_meaning: 'You hold all the tools required to manifest your goals. Channel your willpower, focus your energy, and turn vision into reality.',
    reversed_meaning: 'Unrealized potential, manipulation, wasted talents, or lack of mental clarity.',
    image_url: createCardSvg('I - The Magician', '🪄', '#2e1065', '#581c87', '#e879f9', true),
    illustration_style_notes: 'Figure under an infinity symbol surrounded by the four suit elemental icons, channeling celestial energy.',
    element: 'Air',
    astrology: 'Mercury',
    summary: 'The master of transformation and conscious manifestation.',
    love_meaning: 'Strong magnetic attraction, clear communication, and creating deep connections.',
    career_meaning: 'Using your skills to achieve goals, leading initiatives, and realizing ambitions.',
    spirituality_meaning: 'Aligning personal intent with universal spiritual laws.'
  },
  {
    id: 'm2',
    name: 'The High Priestess',
    arcana_type: 'major',
    number: 2,
    keywords: ['Intuition', 'Sacred Knowledge', 'Divine Feminine', 'Subconscious', 'Mystery'],
    upright_meaning: 'Listen closely to your inner voice. Secrets and unseen truths are coming to light through quiet reflection and dreams.',
    reversed_meaning: 'Ignoring your gut instincts, hidden motives, superficiality, or emotional distance.',
    image_url: createCardSvg('II - The High Priestess', '🌙', '#0284c7', '#0f172a', '#38bdf8', true),
    illustration_style_notes: 'Seated between twin pillars of dark and light, veiled in pomegranate tapestry under a crescent moon.',
    element: 'Water',
    astrology: 'Moon',
    summary: 'Guardian of the subconscious veil and sacred inner wisdom.',
    love_meaning: 'Unspoken emotional depth, deep soulful connection, or holding back feelings.',
    career_meaning: 'Trust your instincts in business decisions rather than rushing into action.',
    spirituality_meaning: 'Heightened psychic intuition, meditation, and spiritual awakenings.'
  },
  {
    id: 'm3',
    name: 'The Empress',
    arcana_type: 'major',
    number: 3,
    keywords: ['Abundance', 'Nurturing', 'Creativity', 'Fertility', 'Sensuality'],
    upright_meaning: 'A time of blossoming growth, rich creativity, and comfort. Connect with nature and nourish your creative projects.',
    reversed_meaning: 'Creative blocks, smothering behavior, neglect of self-care, or dependence.',
    image_url: createCardSvg('III - The Empress', '👑', '#065f46', '#022c22', '#34d399', true),
    illustration_style_notes: 'Crown of twelve stars, lush wheat field, velvet cushions, and Venus symbol reflecting earthly abundance.',
    element: 'Earth',
    astrology: 'Venus',
    summary: 'The archetype of maternal love, abundance, and creative creation.',
    love_meaning: 'Warmth, fertility, unconditional affection, and harmonious relationships.',
    career_meaning: 'Projects bearing fruitful rewards, thriving workplace climate, and organic growth.',
    spirituality_meaning: 'Grounding yourself in natural harmony and honoring physical well-being.'
  },
  {
    id: 'm4',
    name: 'The Emperor',
    arcana_type: 'major',
    number: 4,
    keywords: ['Authority', 'Structure', 'Stability', 'Leadership', 'Protection'],
    upright_meaning: 'Establish order, set boundaries, and lead with wisdom. Success comes through organization, discipline, and strategic planning.',
    reversed_meaning: 'Rigidity, abuse of power, lack of discipline, or micromanagement.',
    image_url: createCardSvg('IV - The Emperor', '🏛️', '#831843', '#500724', '#f43f5e', true),
    illustration_style_notes: 'Throne carved with ram heads atop a majestic mountain peak, holding an orb and sceptre.',
    element: 'Fire',
    astrology: 'Aries',
    summary: 'Symbol of structured stability, leadership, and grounded authority.',
    love_meaning: 'Stability, commitment, clear boundaries, and reliable partnership.',
    career_meaning: 'Taking charge, establishing systems, and achieving leadership milestones.',
    spirituality_meaning: 'Disciplined spiritual practice and structured personal growth.'
  },
  {
    id: 'm5',
    name: 'The Hierophant',
    arcana_type: 'major',
    number: 5,
    keywords: ['Tradition', 'Spiritual Guidance', 'Conformity', 'Institutions', 'Wisdom'],
    upright_meaning: 'Seek guidance from trusted mentors, tradition, or structured learning. Honor sacred customs and shared wisdom.',
    reversed_meaning: 'Rebellion against outdated norms, personal spiritual path, or rigidity.',
    image_url: createCardSvg('V - The Hierophant', '📜', '#78350f', '#451a03', '#f59e0b', true),
    illustration_style_notes: 'Sacred robes, triple crown, crossed keys at the feet with two acolytes receiving sacred lessons.',
    element: 'Earth',
    astrology: 'Taurus',
    summary: 'Bridge between traditional wisdom, spiritual mentorship, and sacred rites.',
    love_meaning: 'Traditional commitment, marriage, or shared belief systems in relationships.',
    career_meaning: 'Mentorship, professional associations, or learning within established institutions.',
    spirituality_meaning: 'Deepening spiritual knowledge through structured study or lineage teachings.'
  },
  {
    id: 'm6',
    name: 'The Lovers',
    arcana_type: 'major',
    number: 6,
    keywords: ['Harmonious Choice', 'Alignment', 'Love', 'Values', 'Union'],
    upright_meaning: 'Deep emotional alignment, meaningful choices, and union. Align your choices with your highest personal values.',
    reversed_meaning: 'Disharmony, misaligned values, hesitation in decision-making, or conflict.',
    image_url: createCardSvg('VI - The Lovers', '💖', '#9d174d', '#4c0519', '#f472b6', true),
    illustration_style_notes: 'Two soulmates beneath the blessing wings of Archangel Raphael and the Tree of Life.',
    element: 'Air',
    astrology: 'Gemini',
    summary: 'Sacred union, alignment of heart and values, and pivotal choices.',
    love_meaning: 'Soulmate connection, mutual respect, and powerful romantic harmony.',
    career_meaning: 'Partnerships based on trust and choices reflecting core principles.',
    spirituality_meaning: 'Integrating dualities within yourself and choosing love over fear.'
  },
  {
    id: 'm7',
    name: 'The Chariot',
    arcana_type: 'major',
    number: 7,
    keywords: ['Willpower', 'Victory', 'Determination', 'Focus', 'Control'],
    upright_meaning: 'Overcome obstacles through willpower, focus, and drive. Maintain momentum even when opposing forces pull in different directions.',
    reversed_meaning: 'Loss of direction, aggression, feeling derailed, or lack of self-control.',
    image_url: createCardSvg('VII - The Chariot', '🛞', '#1e3a8a', '#172554', '#60a5fa', true),
    illustration_style_notes: 'Warriors armor under a starry canopy, steering two sphinxes of black and white.',
    element: 'Water',
    astrology: 'Cancer',
    summary: 'Triumphant victory achieved through focused willpower and emotional control.',
    love_meaning: 'Overcoming relationship hurdles together with shared goals.',
    career_meaning: 'Pushing past competition and driving key initiatives to success.',
    spirituality_meaning: 'Mastering personal impulses and steering your spiritual path forward.'
  },
  {
    id: 'm8',
    name: 'Strength',
    arcana_type: 'major',
    number: 8,
    keywords: ['Inner Strength', 'Compassion', 'Patience', 'Courage', 'Gentle Power'],
    upright_meaning: 'True power comes from compassion, patience, and composure. Tame inner anxieties with gentle courage.',
    reversed_meaning: 'Self-doubt, raw emotion, feeling overwhelmed, or weakness.',
    image_url: createCardSvg('VIII - Strength', '🦁', '#854d0e', '#3f2305', '#facc15', true),
    illustration_style_notes: 'Serene maiden gently closing the jaws of a fierce lion, crowned with a floral infinity ring.',
    element: 'Fire',
    astrology: 'Leo',
    summary: 'The quiet majesty of compassion triumphing over raw instinct.',
    love_meaning: 'Patient understanding, healing emotional wounds, and gentle support.',
    career_meaning: 'Handling difficult workplace pressure with calm grace and resilience.',
    spirituality_meaning: 'Mastering ego-driven desires through love and self-acceptance.'
  },
  {
    id: 'm9',
    name: 'The Hermit',
    arcana_type: 'major',
    number: 9,
    keywords: ['Soul Searching', 'Introspection', 'Inner Guidance', 'Solitude', 'Wisdom'],
    upright_meaning: 'Step back from outer noise to shine your own light inward. Answers lie in quiet reflection and self-reliance.',
    reversed_meaning: 'Isolation, loneliness, feeling lost, or refusing inner guidance.',
    image_url: createCardSvg('IX - The Hermit', '🕯️', '#1f2937', '#111827', '#9ca3af', true),
    illustration_style_notes: 'Cloaked figure atop a snowy peak holding a glowing six-pointed star lantern and staff.',
    element: 'Earth',
    astrology: 'Virgo',
    summary: 'Illuminating the inner path through quiet contemplation and solitude.',
    love_meaning: 'Taking time to understand your personal needs before seeking partnership.',
    career_meaning: 'Stepping back to re-evaluate goals and clarify long-term career purpose.',
    spirituality_meaning: 'Solitary spiritual retreats, meditation, and finding truth within.'
  },
  {
    id: 'm10',
    name: 'Wheel of Fortune',
    arcana_type: 'major',
    number: 10,
    keywords: ['Cycles of Life', 'Destiny', 'Change', 'Karma', 'Turning Point'],
    upright_meaning: 'Life is in constant motion. Good fortune, unexpected shifts, and karmic cycles are turning in your favor.',
    reversed_meaning: 'Resistance to change, bad luck cycles, or feeling out of control.',
    image_url: createCardSvg('X - Wheel of Fortune', '☸️', '#4c1d95', '#2e1065', '#a855f7', true),
    illustration_style_notes: 'Grand golden wheel with Hebrew lettering, guarded by four winged elemental creatures.',
    element: 'Fire',
    astrology: 'Jupiter',
    summary: 'The cosmic wheel of fate and destiny continuously spinning.',
    love_meaning: 'Fated encounters, unexpected relationship breakthroughs, and evolving dynamics.',
    career_meaning: 'Surge of lucky opportunities, sudden promotions, or shifting market tides.',
    spirituality_meaning: 'Understanding life seasons and surrendering to cosmic flow.'
  },
  {
    id: 'm11',
    name: 'Justice',
    arcana_type: 'major',
    number: 11,
    keywords: ['Fairness', 'Truth', 'Cause and Effect', 'Clarity', 'Integrity'],
    upright_meaning: 'Fairness and truth prevail. Decisions made now carry long-term weight—act with honesty and balanced judgment.',
    reversed_meaning: 'Unfairness, lack of accountability, dishonesty, or legal complications.',
    image_url: createCardSvg('XI - Justice', '⚖️', '#0369a1', '#082f49', '#38bdf8', true),
    illustration_style_notes: 'Seated judge holding an upright double-edged sword and perfectly balanced scales of truth.',
    element: 'Air',
    astrology: 'Libra',
    summary: 'Unwavering balance, truth, and karmic cause-and-effect.',
    love_meaning: 'Fairness, equality, mutual accountability, and honest communication.',
    career_meaning: 'Favorable legal or contract resolutions, fair treatment, and ethics.',
    spirituality_meaning: 'Living in truth with your spiritual compass and accepting karma.'
  },
  {
    id: 'm12',
    name: 'The Hanged Man',
    arcana_type: 'major',
    number: 12,
    keywords: ['Surrender', 'New Perspective', 'Pause', 'Letting Go', 'Enlightenment'],
    upright_meaning: 'Pause and view things from a fresh angle. Surrendering control brings unexpected clarity and breakthrough.',
    reversed_meaning: 'Stagnation, useless martyrdom, resistance to waiting, or stalling.',
    image_url: createCardSvg('XII - The Hanged Man', '🙃', '#166534', '#052e16', '#4ade80', true),
    illustration_style_notes: 'Figure suspended by one ankle from a living wooden cross, glowing with a golden halo of enlightenment.',
    element: 'Water',
    astrology: 'Neptune',
    summary: 'Illumination born from pause, surrender, and upside-down perspective.',
    love_meaning: 'Pausing relationship expectations to view your partner with fresh empathy.',
    career_meaning: 'Temporary waiting period; use it to rethink strategy before acting.',
    spirituality_meaning: 'Releasing ego attachments to welcome spiritual revelations.'
  },
  {
    id: 'm13',
    name: 'Death',
    arcana_type: 'major',
    number: 13,
    keywords: ['Transformation', 'Endings', 'Rebirth', 'Transition', 'New Chapter'],
    upright_meaning: 'An old chapter comes to a natural end, clearing space for vibrant rebirth and transformation. Do not fear letting go.',
    reversed_meaning: 'Resistance to necessary change, holding on to past hurts, or stagnation.',
    image_url: createCardSvg('XIII - Death', '🦋', '#18181b', '#09090b', '#e4e4e7', true),
    illustration_style_notes: 'Skeletal knight riding a white steed, holding a banner with a white rose as the golden sun rises on the horizon.',
    element: 'Water',
    astrology: 'Scorpio',
    summary: 'The profound gateway of metamorphosis, ending old cycles to spark new life.',
    love_meaning: 'Ending toxic patterns, closing outdated chapters, and renewing emotional bonds.',
    career_meaning: 'Transitioning out of stagnant roles to pursue a meaningful calling.',
    spirituality_meaning: 'Profound spiritual rebirth and shedding old ego identities.'
  },
  {
    id: 'm14',
    name: 'Temperance',
    arcana_type: 'major',
    number: 14,
    keywords: ['Balance', 'Patience', 'Moderation', 'Harmony', 'Alchemy'],
    upright_meaning: 'Find harmony through moderation, patience, and blending opposites. Calm inner equilibrium guides your steps.',
    reversed_meaning: 'Imbalance, excess, haste, or conflicting priorities.',
    image_url: createCardSvg('XIV - Temperance', '🏺', '#0284c7', '#0c4a6e', '#7dd3fc', true),
    illustration_style_notes: 'Angel with one foot in water and one on land, pouring liquid seamlessly between two golden chalices.',
    element: 'Fire',
    astrology: 'Sagittarius',
    summary: 'The art of spiritual alchemy, balance, and quiet moderation.',
    love_meaning: 'Peaceful relationship flow, mutual compromise, and emotional stability.',
    career_meaning: 'Balanced approach to workload, collaborating peacefully across teams.',
    spirituality_meaning: 'Integrating mind, body, and spirit into calm alignment.'
  },
  {
    id: 'm15',
    name: 'The Devil',
    arcana_type: 'major',
    number: 15,
    keywords: ['Shadow Self', 'Attachment', 'Illusion', 'Materialism', 'Breaking Chains'],
    upright_meaning: 'Recognize unhealthy dependencies, illusions, or self-imposed traps. You hold the key to unchaining yourself.',
    reversed_meaning: 'Breaking free from addiction or unhealthy bonds, regaining personal freedom.',
    image_url: createCardSvg('XV - The Devil', '🔥', '#450a0a', '#180202', '#ef4444', true),
    illustration_style_notes: 'Horned satyr figure above two figures wearing loose golden chains around their necks.',
    element: 'Earth',
    astrology: 'Capricorn',
    summary: 'Confronting shadow attachments and realizing chains are illusory.',
    love_meaning: 'Obsessive attachment or codependency; time to establish healthy autonomy.',
    career_meaning: 'Feeling trapped in a toxic job; remember you have options to break free.',
    spirituality_meaning: 'Facing shadow aspects with honesty and reclaiming spiritual agency.'
  },
  {
    id: 'm16',
    name: 'The Tower',
    arcana_type: 'major',
    number: 16,
    keywords: ['Sudden Shift', 'Revelation', 'Awakening', 'Breaking False Beliefs', 'Renewal'],
    upright_meaning: 'False foundations crumble to make way for absolute truth. While sudden changes can feel jarring, they liberate you.',
    reversed_meaning: 'Avoiding necessary crises, delaying inevitable shifts, or fear of breakdown.',
    image_url: createCardSvg('XVI - The Tower', '⚡', '#7f1d1d', '#450a0a', '#f87171', true),
    illustration_style_notes: 'Lightning striking a stone tower, crown falling, freeing figures into divine light.',
    element: 'Fire',
    astrology: 'Mars',
    summary: 'The lightning bolt of truth dismantling false illusions for genuine freedom.',
    love_meaning: 'Sudden truth revealed that clears the air for genuine authenticity.',
    career_meaning: 'Unexpected structural changes that ultimately lead to better opportunities.',
    spirituality_meaning: 'Shattering rigid dogma to embrace living, organic truth.'
  },
  {
    id: 'm17',
    name: 'The Star',
    arcana_type: 'major',
    number: 17,
    keywords: ['Hope', 'Faith', 'Renewal', 'Inspiration', 'Serenity'],
    upright_meaning: 'Hope shines bright after the storm. Trust in divine timing, feel peaceful renewal, and follow your guiding star.',
    reversed_meaning: 'Despair, lack of faith, pessimism, or feeling disconnected from hope.',
    image_url: createCardSvg('XVII - The Star', '⭐', '#1e1b4b', '#020617', '#818cf8', true),
    illustration_style_notes: 'Maiden pouring water into earth and pool under a glowing seven-pointed star sky.',
    element: 'Air',
    astrology: 'Aquarius',
    summary: 'A beacon of serene hope, spiritual healing, and cosmic blessing.',
    love_meaning: 'Healing past heartbreak, deep trust, and optimistic love.',
    career_meaning: 'Inspired creative vision, long-term success, and glowing confidence.',
    spirituality_meaning: 'Pure spiritual renewal and profound connection to universal beauty.'
  },
  {
    id: 'm18',
    name: 'The Moon',
    arcana_type: 'major',
    number: 18,
    keywords: ['Illusion', 'Subconscious', 'Dreams', 'Intuition', 'Uncertainty'],
    upright_meaning: 'Navigate murky shadows with intuition. Things are not entirely as they appear on the surface; trust your inner light.',
    reversed_meaning: 'Unveiling deceptions, clarity emerging from confusion, overcoming fears.',
    image_url: createCardSvg('XVIII - The Moon', '🌕', '#030712', '#1e1b4b', '#a5f3fc', true),
    illustration_style_notes: 'Full moon casting light over twin towers, wolf and dog howling beside a quiet stream.',
    element: 'Water',
    astrology: 'Pisces',
    summary: 'Navigating the mystical landscape of dreams, instincts, and shadows.',
    love_meaning: 'Hidden emotions or misunderstandings; give space for truth to emerge.',
    career_meaning: 'Uncertainty in business plans; double check details before signing.',
    spirituality_meaning: 'Deep dreamwork, psychic exploration, and inner emotional shadow integration.'
  },
  {
    id: 'm19',
    name: 'The Sun',
    arcana_type: 'major',
    number: 19,
    keywords: ['Joy', 'Success', 'Vitality', 'Warmth', 'Clarity'],
    upright_meaning: 'Radiant success, vitality, and joy fill your world! Everything is illuminated with warmth and vibrant clarity.',
    reversed_meaning: 'Temporary cloudiness, delayed success, or difficulty seeing optimism.',
    image_url: createCardSvg('XIX - The Sun', '☀️', '#a16207', '#451a03', '#fef08a', true),
    illustration_style_notes: 'Child riding a white pony under a smiling sun with blooming sunflowers behind a stone wall.',
    element: 'Fire',
    astrology: 'Sun',
    summary: 'Unconditional warmth, celebratory success, and childlike joy.',
    love_meaning: 'Pure happiness, passionate affection, and joyful shared energy.',
    career_meaning: 'Triumphant achievement, recognition, and thriving growth.',
    spirituality_meaning: 'Living in total radiant alignment with your highest self.'
  },
  {
    id: 'm20',
    name: 'Judgement',
    arcana_type: 'major',
    number: 20,
    keywords: ['Rebirth', 'Inner Calling', 'Absolution', 'Evaluation', 'Awakening'],
    upright_meaning: 'A divine calling invites you to step into higher purpose. Reflect on past lessons, forgive, and embrace your rebirth.',
    reversed_meaning: 'Self-doubt, harsh self-criticism, refusing a higher calling, or regret.',
    image_url: createCardSvg('XX - Judgement', '🎺', '#312e81', '#1e1b4b', '#c084fc', true),
    illustration_style_notes: 'Archangel Gabriel blowing a golden trumpet as souls rise joyfully from open tombs.',
    element: 'Fire',
    astrology: 'Pluto',
    summary: 'The awakening call to step into your soul destiny and forgive the past.',
    love_meaning: 'Profound relationship evaluation leading to deeper commitment or peaceful closure.',
    career_meaning: 'Recognizing your true vocation and making decisive life leaps.',
    spirituality_meaning: 'Spiritual awakening and release of old karma.'
  },
  {
    id: 'm21',
    name: 'The World',
    arcana_type: 'major',
    number: 21,
    keywords: ['Completion', 'Wholeness', 'Accomplishment', 'Travel', 'Fulfillment'],
    upright_meaning: 'A major life cycle closes in triumphant completion. Celebrate your journey—you have achieved wholeness and mastery.',
    reversed_meaning: 'Incomplete tasks, seeking external closure, or lingering loose ends.',
    image_url: createCardSvg('XXI - The World', '🌍', '#15803d', '#052e16', '#86efac', true),
    illustration_style_notes: 'Dancing dancer wrapped in purple scarf inside a green laurel wreath guarded by four elemental figures.',
    element: 'Earth',
    astrology: 'Saturn',
    summary: 'The harmonious culmination of a heroic spiritual quest.',
    love_meaning: 'Complete emotional fulfillment, shared long-term dreams, and wholeness.',
    career_meaning: 'Mastering major projects, international success, and ultimate goals achieved.',
    spirituality_meaning: 'Total integration of physical and spiritual wisdom.'
  },

  // MINOR ARCANA - SUIT OF WANDS (Fire, Passion, Action)
  {
    id: 'w1',
    name: 'Ace of Wands',
    arcana_type: 'minor',
    suit: 'wands',
    number: 1,
    keywords: ['Inspiration', 'Spark', 'Creative Energy', 'Potential', 'Passion'],
    upright_meaning: 'A surge of creative spark and passionate energy. Take the initiative on exciting ideas!',
    reversed_meaning: 'Delays in projects, lack of motivation, or creative block.',
    image_url: createCardSvg('Ace of Wands', '🔥', '#991b1b', '#450a0a', '#fca5a5', false),
    illustration_style_notes: 'Hand emerging from a cloud holding a sprouting wooden wand flaming with spiritual fire.',
    element: 'Fire',
    summary: 'The primal spark of passion and creative initiative.',
    love_meaning: 'Passionate new attraction or sudden romantic spark.',
    career_meaning: 'Breakthrough business ideas or enthusiastic project kickoffs.',
    spirituality_meaning: 'Igniting your spiritual drive and creative passion.'
  },
  {
    id: 'w2',
    name: 'Two of Wands',
    arcana_type: 'minor',
    suit: 'wands',
    number: 2,
    keywords: ['Future Planning', 'Progress', 'Decisions', 'Discovery', 'Vision'],
    upright_meaning: 'You hold the world in your hand. Plan your future steps and prepare to step beyond your comfort zone.',
    reversed_meaning: 'Fear of the unknown, hesitation to leave safety, or poor planning.',
    image_url: createCardSvg('Two of Wands', '🌐', '#854d0e', '#3f2305', '#fef08a', false),
    illustration_style_notes: 'Figure atop castle ramparts holding a mini globe and staff, gazing out over distant oceans.',
    element: 'Fire',
    summary: 'Expanding horizons through deliberate long-term planning.',
    love_meaning: 'Discussing long-term goals and future travel together.',
    career_meaning: 'Exploring overseas expansion, partnerships, or advanced career paths.',
    spirituality_meaning: 'Charting a broader spiritual vision for your life.'
  },
  {
    id: 'w3',
    name: 'Three of Wands',
    arcana_type: 'minor',
    suit: 'wands',
    number: 3,
    keywords: ['Expansion', 'Foresight', 'Opportunity', 'Progress', 'Enterprise'],
    upright_meaning: 'Your ships are coming in! Long-term efforts are beginning to pay off, opening broader horizons.',
    reversed_meaning: 'Delays in shipments/results, frustration with slow growth.',
    image_url: createCardSvg('Three of Wands', '⛵', '#78350f', '#451a03', '#fbbf24', false),
    illustration_style_notes: 'Figure standing on a cliff edge watching merchant ships navigate golden waters.',
    element: 'Fire',
    summary: 'Watching the fruits of your early planning manifest across distant shores.',
    love_meaning: 'Growing together, shared adventures, and expanding horizons.',
    career_meaning: 'International business, trade, and successful project rollouts.',
    spirituality_meaning: 'Expanding consciousness and trusting the journey.'
  },
  {
    id: 'w4',
    name: 'Four of Wands',
    arcana_type: 'minor',
    suit: 'wands',
    number: 4,
    keywords: ['Celebration', 'Home', 'Harmony', 'Community', 'Milestone'],
    upright_meaning: 'Celebrate key milestones, home harmony, and joyous gatherings with loved ones.',
    reversed_meaning: 'Family tension, cancelled events, or feeling unwelcome.',
    image_url: createCardSvg('Four of Wands', '🏰', '#065f46', '#022c22', '#6ee7b7', false),
    illustration_style_notes: 'Floral arbor framed by four upright wands, figures celebrating outside a welcoming manor.',
    element: 'Fire',
    summary: 'Joyous celebration of stability, home, and community.',
    love_meaning: 'Weddings, anniversaries, moving in together, and homecoming joy.',
    career_meaning: 'Team celebration upon completing key project phases.',
    spirituality_meaning: 'Gratitude rituals and finding sanctuary in community.'
  },
  {
    id: 'w5',
    name: 'Five of Wands',
    arcana_type: 'minor',
    suit: 'wands',
    number: 5,
    keywords: ['Competition', 'Rivalry', 'Conflict', 'Brainstorming', 'Challenge'],
    upright_meaning: 'Friendly competition or differing opinions. Use this friction to sharpen your ideas.',
    reversed_meaning: 'Avoiding conflict, compromise, or lingering pettiness.',
    image_url: createCardSvg('Five of Wands', '⚔️', '#9a3412', '#431407', '#fdba74', false),
    illustration_style_notes: 'Five youths brandishing wands in energetic sparring match without malice.',
    element: 'Fire',
    summary: 'Constructive friction, competitive drive, and spirited debate.',
    love_meaning: 'Playful banter or minor arguments that require open communication.',
    career_meaning: 'Competitive market environment or lively group brainstorming.',
    spirituality_meaning: 'Overcoming internal conflicts between desires and beliefs.'
  },

  // MINOR ARCANA - SUIT OF CUPS (Water, Emotions, Intuition)
  {
    id: 'c1',
    name: 'Ace of Cups',
    arcana_type: 'minor',
    suit: 'cups',
    number: 1,
    keywords: ['Overflowing Love', 'Compassion', 'Emotional Awakening', 'Intimacy'],
    upright_meaning: 'Your heart overflows with love, empathy, and intuitive gifts. Open yourself to deep connections.',
    reversed_meaning: 'Blocked emotions, vulnerability fear, or emotional exhaustion.',
    image_url: createCardSvg('Ace of Cups', '🍷', '#0284c7', '#0c4a6e', '#a5f3fc', false),
    illustration_style_notes: 'Golden chalice overflowing with five streams of water into a lily pad pond, dove bearing a host.',
    element: 'Water',
    summary: 'The pristine source of unconditional love and spiritual empathy.',
    love_meaning: 'Falling in love, deep forgiveness, and emotional renewal.',
    career_meaning: 'Heart-centered work and creative artistic fulfillment.',
    spirituality_meaning: 'Spiritual grace and opening the heart chakra.'
  },
  {
    id: 'c2',
    name: 'Two of Cups',
    arcana_type: 'minor',
    suit: 'cups',
    number: 2,
    keywords: ['Unified Love', 'Partnership', 'Mutual Respect', 'Harmony', 'Connection'],
    upright_meaning: 'A beautiful union of hearts and minds. Mutual trust, respect, and deep understanding flourishing.',
    reversed_meaning: 'Miscommunication, unbalanced relationship, or parting ways.',
    image_url: createCardSvg('Two of Cups', '🥂', '#0369a1', '#082f49', '#7dd3fc', false),
    illustration_style_notes: 'Youth and maiden exchanging cups under Caduceus staff of Hermes crowned with a winged lion.',
    element: 'Water',
    summary: 'Harmonious soul connection and mutual emotional reverence.',
    love_meaning: 'Deep soulmate connection, mutual attraction, and engagement.',
    career_meaning: 'Fruitful business partnerships built on equality and trust.',
    spirituality_meaning: 'Balancing feminine and masculine emotional energies within.'
  },
  {
    id: 'c3',
    name: 'Three of Cups',
    arcana_type: 'minor',
    suit: 'cups',
    number: 3,
    keywords: ['Friendship', 'Sisterhood', 'Joy', 'Gathering', 'Shared Success'],
    upright_meaning: 'Raise a glass with true friends! Celebrate community, shared laughter, and supportive bonds.',
    reversed_meaning: 'Overindulgence, feeling left out, or gossip in social circles.',
    image_url: createCardSvg('Three of Cups', '🍇', '#0284c7', '#0369a1', '#f0fdf4', false),
    illustration_style_notes: 'Three maidens dancing in a circle holding raised chalices surrounded by flowers and grapes.',
    element: 'Water',
    summary: 'Joyous gathering of heart-connected friends and soul family.',
    love_meaning: 'Joyful social life, introducing partner to friends, and mutual celebration.',
    career_meaning: 'Collaborative team wins and supportive workplace atmosphere.',
    spirituality_meaning: 'Shared spiritual circles, ritual, and group healing.'
  },
  {
    id: 'c4',
    name: 'Four of Cups',
    arcana_type: 'minor',
    suit: 'cups',
    number: 4,
    keywords: ['Contemplation', 'Apathy', 'Re-evaluation', 'Introspection', 'Missed Gifts'],
    upright_meaning: 'Pause to re-evaluate your emotional landscape. Be careful not to overlook divine offers right in front of you.',
    reversed_meaning: 'Renewed enthusiasm, breaking out of apathy, accepting opportunities.',
    image_url: createCardSvg('Four of Cups', '🍵', '#334155', '#0f172a', '#94a3b8', false),
    illustration_style_notes: 'Figure sitting under a tree gazing at three cups on the ground, unaware of a fourth cup offered by a cloud hand.',
    element: 'Water',
    summary: 'Introspective pause, cautioning against blind apathy toward present blessings.',
    love_meaning: 'Feeling uninspired in love; check if idealization is blinding you to real connection.',
    career_meaning: 'Boredom at work; look around for subtle new projects or paths.',
    spirituality_meaning: 'Meditation on contentment and recognizing quiet gifts.'
  },
  {
    id: 'c5',
    name: 'Five of Cups',
    arcana_type: 'minor',
    suit: 'cups',
    number: 5,
    keywords: ['Grief', 'Regret', 'Focus on Loss', 'Moving On', 'Hope Remains'],
    upright_meaning: 'Mourn past disappointments, but turn around—two full cups remain behind you to build upon.',
    reversed_meaning: 'Healing from grief, accepting the past, and embracing fresh hope.',
    image_url: createCardSvg('Five of Cups', '🌧️', '#1f2937', '#111827', '#6b7280', false),
    illustration_style_notes: 'Cloaked dark figure looking down at three spilled cups, while two upright cups sit behind near a castle bridge.',
    element: 'Water',
    summary: 'Processing grief while honoring the lingering blessings that remain intact.',
    love_meaning: 'Letting go of past heartbreak to allow new love in.',
    career_meaning: 'Learning from failed investments or projects without giving up.',
    spirituality_meaning: 'Forgiveness practices and transforming sorrow into wisdom.'
  },

  // MINOR ARCANA - SUIT OF SWORDS (Air, Mind, Truth)
  {
    id: 's1',
    name: 'Ace of Swords',
    arcana_type: 'minor',
    suit: 'swords',
    number: 1,
    keywords: ['Mental Clarity', 'Breakthrough', 'Truth', 'New Ideas', 'Sharp Focus'],
    upright_meaning: 'A sword of truth cuts through confusion! A sudden moment of mental clarity illuminates your path.',
    reversed_meaning: 'Mental fog, harsh words, miscommunication, or flawed logic.',
    image_url: createCardSvg('Ace of Swords', '🗡️', '#1e293b', '#0f172a', '#e2e8f0', false),
    illustration_style_notes: 'Hand emerging from cloud wielding an upright sword crowned with olive branch and palm frond.',
    element: 'Air',
    summary: 'The razor-sharp sword of absolute truth and intellectual breakthrough.',
    love_meaning: 'Honest conversation clearing long-standing misunderstandings.',
    career_meaning: 'Intellectual breakthrough, successful strategy, and decisive leadership.',
    spirituality_meaning: 'Cutting away illusions to embrace clear spiritual truth.'
  },
  {
    id: 's2',
    name: 'Two of Swords',
    arcana_type: 'minor',
    suit: 'swords',
    number: 2,
    keywords: ['Difficult Choice', 'Stalemate', 'Truce', 'Blocked Emotions', 'Crossroads'],
    upright_meaning: 'You are at an intellectual crossroads. Remove the blindfold, listen to reason, and make a balanced decision.',
    reversed_meaning: 'Indecision overload, truth exposed, or forced resolution.',
    image_url: createCardSvg('Two of Swords', '🌙', '#334155', '#1e293b', '#94a3b8', false),
    illustration_style_notes: 'Blindfolded figure sitting by a moonlit sea, holding two crossed heavy swords over the chest.',
    element: 'Air',
    summary: 'Poised at an emotional crossroads requiring balanced objective logic.',
    love_meaning: 'Avoid ignoring relationship issues; face hard choices together.',
    career_meaning: 'Weighing two job options or mediating between competing factions.',
    spirituality_meaning: 'Balancing mind and intuition before taking a leap.'
  },
  {
    id: 's3',
    name: 'Three of Swords',
    arcana_type: 'minor',
    suit: 'swords',
    number: 3,
    keywords: ['Heartbreak', 'Emotional Pain', 'Release', 'Sorrow', 'Healing Process'],
    upright_meaning: 'Painful realization or heartbreak. Allow yourself to feel the grief so the healing light can enter.',
    reversed_meaning: 'Recovery from pain, releasing resentment, and emotional healing.',
    image_url: createCardSvg('Three of Swords', '💔', '#881337', '#4c0519', '#fda4af', false),
    illustration_style_notes: 'Pierced heart surrounded by rain clouds, with three swords passing clean through.',
    element: 'Air',
    summary: 'Sacred emotional purging through facing painful truths directly.',
    love_meaning: 'Heartbreak or painful truth; necessary catharsis for true healing.',
    career_meaning: 'Disappointment in business negotiations; learn and rebuild.',
    spirituality_meaning: 'Using emotional pain as a portal for profound compassion.'
  },
  {
    id: 's4',
    name: 'Four of Swords',
    arcana_type: 'minor',
    suit: 'swords',
    number: 4,
    keywords: ['Rest', 'Recuperation', 'Meditation', 'Mental Sanctuary', 'Contemplation'],
    upright_meaning: 'Rest your mind. Retreat to your sanctuary to recharge your mental energy before taking the next step.',
    reversed_meaning: 'Burnout, returning to action too quickly, or mental restlessness.',
    image_url: createCardSvg('Four of Swords', '🛌', '#1e1b4b', '#020617', '#a5b4fc', false),
    illustration_style_notes: 'Knight lying atop a stone tomb with hands folded in prayer beneath stained glass window, three swords mounted on wall and one underneath.',
    element: 'Air',
    summary: 'Sacred mental rest and sanctuary for mind and body.',
    love_meaning: 'Taking a calm breather from relationship drama to regain balance.',
    career_meaning: 'Taking time off to prevent burnout and recharge creativity.',
    spirituality_meaning: 'Meditation retreats and quiet silent reflection.'
  },
  {
    id: 's5',
    name: 'Five of Swords',
    arcana_type: 'minor',
    suit: 'swords',
    number: 5,
    keywords: ['Pyrrhic Victory', 'Unnecessary Conflict', 'Pride', 'Pick Your Battles'],
    upright_meaning: 'Winning an argument at the cost of harmony is no true victory. Choose your battles wisely.',
    reversed_meaning: 'Desire to reconcile, ending pettiness, or moving past conflict.',
    image_url: createCardSvg('Five of Swords', '🌪️', '#374151', '#111827', '#d1d5db', false),
    illustration_style_notes: 'Smirking figure holding three swords while two defeated opponents walk away toward stormy seas.',
    element: 'Air',
    summary: 'Cautionary note on empty victories driven by pride rather than peace.',
    love_meaning: 'Dropping arguments aimed at "winning" rather than understanding.',
    career_meaning: 'Workplace politics; avoid toxic battles that burn bridges.',
    spirituality_meaning: 'Releasing ego need to be right in favor of spiritual harmony.'
  },

  // MINOR ARCANA - SUIT OF PENTACLES (Earth, Body, Material World)
  {
    id: 'p1',
    name: 'Ace of Pentacles',
    arcana_type: 'minor',
    suit: 'pentacles',
    number: 1,
    keywords: ['New Opportunity', 'Financial Growth', 'Manifestation', 'Stability', 'Abundance'],
    upright_meaning: 'A tangible golden opportunity for material prosperity, health, and grounded security.',
    reversed_meaning: 'Missed investment, poor financial planning, or delayed contracts.',
    image_url: createCardSvg('Ace of Pentacles', '🪙', '#15803d', '#052e16', '#fef08a', false),
    illustration_style_notes: 'Hand from cloud presenting a large golden coin above a lush garden archway leading to mountains.',
    element: 'Earth',
    summary: 'Grounded seed of prosperity, health, and physical abundance.',
    love_meaning: 'Stable relationship foundations, building a secure home together.',
    career_meaning: 'Lucrative new job offer, pay raise, or seed funding for a business.',
    spirituality_meaning: 'Honoring the body as a temple and grounding spirit into daily life.'
  },
  {
    id: 'p2',
    name: 'Two of Pentacles',
    arcana_type: 'minor',
    suit: 'pentacles',
    number: 2,
    keywords: ['Balance', 'Adaptability', 'Resource Management', 'Multitasking', 'Flexibility'],
    upright_meaning: 'Juggling multiple priorities with graceful adaptability. Stay flexible as life keeps moving.',
    reversed_meaning: 'Overwhelmed by responsibilities, financial strain, or disorganization.',
    image_url: createCardSvg('Two of Pentacles', '♾️', '#047857', '#022c22', '#a7f3d0', false),
    illustration_style_notes: 'Youth dancing while juggling two pentacles connected by a green infinity loop, ships cresting waves behind.',
    element: 'Earth',
    summary: 'Graceful fluidity in managing daily time, money, and energy.',
    love_meaning: 'Balancing relationship time with career and personal hobbies.',
    career_meaning: 'Multitasking several active clients or projects efficiently.',
    spirituality_meaning: 'Finding equilibrium amid life changes.'
  },
  {
    id: 'p3',
    name: 'Three of Pentacles',
    arcana_type: 'minor',
    suit: 'pentacles',
    number: 3,
    keywords: ['Mastery', 'Teamwork', 'Collaboration', 'Craftsmanship', 'Building Together'],
    upright_meaning: 'Mastery through collaboration! Combine your skill with experts to build lasting works of art.',
    reversed_meaning: 'Lack of teamwork, poor communication, or undervalued work.',
    image_url: createCardSvg('Three of Pentacles', '🏛️', '#854d0e', '#3f2305', '#fde047', false),
    illustration_style_notes: 'Master craftsman consulting with an architect and monk inside a grand cathedral stone archway.',
    element: 'Earth',
    summary: 'Harmonious collaboration and pride in excellent craftsmanship.',
    love_meaning: 'Working together to build a shared future and home environment.',
    career_meaning: 'Successful teamwork, expert recognition, and high-quality output.',
    spirituality_meaning: 'Learning spiritual arts through practice and community co-creation.'
  },
  {
    id: 'p4',
    name: 'Four of Pentacles',
    arcana_type: 'minor',
    suit: 'pentacles',
    number: 4,
    keywords: ['Security', 'Conservation', 'Frugality', 'Holding On', 'Control'],
    upright_meaning: 'Focusing on financial stability and boundaries. Be mindful not to let fear of scarcity lock your heart.',
    reversed_meaning: 'Greed, fear of loss, or conversely, learning to let go and share.',
    image_url: createCardSvg('Four of Pentacles', '🔐', '#713f12', '#361e04', '#fef08a', false),
    illustration_style_notes: 'Seated figure clutching a golden coin to chest, wearing one on crown and standing on two.',
    element: 'Earth',
    summary: 'Grounded financial security cautioning against fear-driven hoarding.',
    love_meaning: 'Protecting your heart; balance emotional security with open vulnerability.',
    career_meaning: 'Saving capital, securing patents, and holding solid assets.',
    spirituality_meaning: 'Releasing scarcity mindset to welcome cosmic generosity.'
  },
  {
    id: 'p5',
    name: 'Five of Pentacles',
    arcana_type: 'minor',
    suit: 'pentacles',
    number: 5,
    keywords: ['Hardship', 'Isolation', 'Financial Strain', 'Seeking Sanctuary', 'Hope Ahead'],
    upright_meaning: 'Temporary physical or financial hardship. Look up—warmth and assistance are close by if you ask.',
    reversed_meaning: 'Recovery from financial loss, ending isolation, or finding shelter.',
    image_url: createCardSvg('Five of Pentacles', '❄️', '#1e293b', '#0f172a', '#cbd5e1', false),
    illustration_style_notes: 'Two figures walking through snow past a glowing stained-glass church window.',
    element: 'Earth',
    summary: 'Navigating cold weather and remembering help is always accessible.',
    love_meaning: 'Weathering tough times together or feeling left out in the cold.',
    career_meaning: 'Temporary budget cuts or job transition; seek community support.',
    spirituality_meaning: 'Faith tested by adversity; discovering spiritual resilience.'
  }
];

export const getCardById = (id: string): TarotCard | undefined => {
  return TAROT_CARDS.find((c) => c.id === id);
};
