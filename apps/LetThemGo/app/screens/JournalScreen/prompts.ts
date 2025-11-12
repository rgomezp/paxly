export const JOURNAL_PROMPTS = [
  // 💔 Processing the Breakup
  "What emotions are you feeling most strongly today?",
  "What was the hardest part about saying goodbye?",
  "What do you miss most — and why do you think that is?",
  "How did the relationship shape who you are today?",
  "What was the moment you realized it was time to let go?",
  "What lessons did you learn from this relationship?",
  "How did the relationship make you feel about yourself?",
  "What would you say to your past self at the start of that relationship?",
  "What boundaries do you wish you had set earlier?",
  "What part of you still needs closure?",

  // 🌱 Healing and Self-Growth
  "What does healing look like for you right now?",
  "What's one thing you can do today that's kind to yourself?",
  "How have you already grown since the breakup?",
  "What are you proud of yourself for this week?",
  "What does your ideal future self look like?",
  "What qualities do you want to nurture in yourself moving forward?",
  "Write about a time you surprised yourself with your strength.",
  "What are you learning about love from this experience?",
  "How can you show yourself the same love you gave others?",
  'What does "moving on" really mean to you?',

  // ☀️ Finding Gratitude & Peace
  "List five small things that made you smile recently.",
  "What are three things you're grateful for today?",
  "Write about a moment of peace you've felt lately.",
  "Who in your life supports you unconditionally?",
  "What parts of your life feel most stable right now?",
  "What does inner peace feel like to you?",
  "How can you create more of it each day?",
  "Write a thank-you letter to yourself for not giving up.",
  "What are you grateful the relationship taught you — even if it hurt?",
  "What new opportunities have come into your life since the breakup?",

  // 💭 Reflection & Perspective
  "What did you want from that relationship that you can now give yourself?",
  "What would you tell a friend going through what you're feeling now?",
  "How have your priorities changed since the breakup?",
  "What patterns do you notice in your past relationships?",
  "What are three non-negotiables you'll keep for future relationships?",
  "How do you want to feel in your next relationship?",
  "What does a healthy love look like to you now?",
  "If you could write one sentence to your ex without sending it, what would it say?",
  "How would you describe this chapter of your life?",
  'What does "letting go" mean to you — emotionally, not just logically?',

  // 🌸 Rebuilding Joy & Purpose
  "What hobbies or passions have you rediscovered?",
  "What's something new you'd love to try?",
  "What does your ideal day look like when you feel free again?",
  "How can you bring more joy into your mornings?",
  "What's a goal you want to focus on for you this month?",
  "What's something beautiful you've noticed about being alone?",
  "Write about a time you felt truly alive — what were you doing?",
  "What's a small promise you can make to yourself today?",
  "How do you want to look back on this time a year from now?",
  'What does "self-love" mean to you, in action?',
]

/**
 * Gets a random journal prompt from the prompts array
 * @returns A random prompt string
 */
export function getRandomPrompt(): string {
  const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length)
  return JOURNAL_PROMPTS[randomIndex]
}
