export const JOURNAL_PROMPTS = [
  // 🧠 Understanding Your Anxiety
  "What emotions are you feeling most strongly today?",
  "What situations or thoughts tend to trigger your anxiety?",
  "How does anxiety show up in your body? What physical sensations do you notice?",
  "What thoughts race through your mind when you feel anxious?",
  "What was the moment today when you felt most anxious?",
  "What patterns do you notice in your anxious thoughts?",
  "How does anxiety make you feel about yourself?",
  "What would you tell your past self about managing anxiety?",
  "What boundaries do you need to set to protect your mental health?",
  "What part of your anxiety feels most overwhelming right now?",

  // 🌱 Coping & Self-Growth
  "What does managing anxiety look like for you right now?",
  "What's one thing you can do today that's kind to yourself?",
  "How have you already grown in managing your anxiety?",
  "What are you proud of yourself for this week?",
  "What does your ideal future self look like — free from anxiety's grip?",
  "What coping strategies do you want to nurture and strengthen?",
  "Write about a time you surprised yourself with your resilience.",
  "What are you learning about yourself through managing anxiety?",
  "How can you show yourself compassion when anxiety feels overwhelming?",
  'What does "progress" really mean to you in your anxiety journey?',

  // ☀️ Finding Gratitude & Peace
  "List five small things that made you smile recently.",
  "What are three things you're grateful for today?",
  "Write about a moment of peace you've felt lately.",
  "Who in your life supports you unconditionally?",
  "What parts of your life feel most stable right now?",
  "What does inner peace feel like to you?",
  "How can you create more moments of calm each day?",
  "Write a thank-you letter to yourself for not giving up.",
  "What are you grateful anxiety has taught you — even if it's been difficult?",
  "What new strengths have you discovered in yourself while managing anxiety?",

  // 💭 Reflection & Perspective
  "What do you need most right now that you can give yourself?",
  "What would you tell a friend going through similar anxiety?",
  "How have your priorities changed as you've learned to manage anxiety?",
  "What patterns do you notice in your anxious thoughts or behaviors?",
  "What are three non-negotiables you'll keep for your mental health?",
  "How do you want to feel on your best days?",
  "What does a healthy relationship with anxiety look like to you now?",
  "If you could write one sentence to your anxious self, what would it say?",
  "How would you describe this chapter of your life?",
  'What does "letting go" of anxious thoughts mean to you?',

  // 🌸 Rebuilding Joy & Purpose
  "What hobbies or activities help you feel calm and present?",
  "What's something new you'd love to try that feels safe and exciting?",
  "What does your ideal day look like when anxiety feels manageable?",
  "How can you bring more joy and calm into your mornings?",
  "What's a goal you want to focus on for yourself this month?",
  "What's something beautiful you've noticed about yourself while managing anxiety?",
  "Write about a time you felt truly calm and present — what were you doing?",
  "What's a small promise you can make to yourself today?",
  "How do you want to look back on this time a year from now?",
  'What does "self-care" mean to you, in action?',
]

/**
 * Gets a random journal prompt from the prompts array
 * @returns A random prompt string
 */
export function getRandomPrompt(): string {
  const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length)
  return JOURNAL_PROMPTS[randomIndex]
}
