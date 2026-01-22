export type Quote = { quote: string; author: string }

export const anxietyQuotes: Quote[] = [
  {
    quote: "Worry never robs tomorrow of its sorrow, it only saps today of its joy.",
    author: "Leo Buscaglia",
  },
  { quote: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
  { quote: "Worry is interest paid on a debt you may not owe.", author: "Unknown" },
  {
    quote:
      "You are not your anxiety. You are not your thoughts. You are the observer of your thoughts.",
    author: "Unknown",
  },
  {
    quote:
      "Breathe. Let go. And remind yourself that this very moment is the only one you know you have for sure.",
    author: "Oprah Winfrey",
  },
  {
    quote:
      "Calm mind brings inner strength and self-confidence, so that's very important for good health.",
    author: "Dalai Lama",
  },
  {
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
  },
  {
    quote:
      "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    quote: "The present moment is the only time over which we have dominion.",
    author: "Thich Nhat Hanh",
  },
  { quote: "Feelings are just visitors, let them come and go.", author: "Mooji" },
  {
    quote:
      "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    author: "Maya Angelou",
  },
  {
    quote: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  {
    quote: "It's not the load that breaks you down, it's the way you carry it.",
    author: "Lou Holtz",
  },
  {
    quote: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
  },
  { quote: "Progress, not perfection.", author: "Unknown" },
  {
    quote:
      "One small crack does not mean that you are broken; it means that you were put to the test and you didn't fall apart.",
    author: "Linda Poindexter",
  },
  {
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote:
      "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
    author: "Charles Spurgeon",
  },
  {
    quote: "If you want to conquer the anxiety of life, live in the moment, live in the breath.",
    author: "Amit Ray",
  },
  {
    quote:
      "The way to get started is to quit talking and begin doing. The way to reduce anxiety is to take action.",
    author: "Walt Disney",
  },
  {
    quote:
      "Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained.",
    author: "Arthur Somers Roche",
  },
  {
    quote:
      "You can't stop the waves, but you can learn to surf. You can't stop anxiety, but you can learn to manage it.",
    author: "Jon Kabat-Zinn",
  },
  {
    quote:
      "The only way to deal with anxiety is to face it head-on. Running away only makes it stronger.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety is like a rocking chair. It gives you something to do, but it doesn't get you anywhere.",
    author: "Unknown",
  },
  {
    quote:
      "The best way to take care of the future is to take care of the present moment. Right now.",
    author: "Thich Nhat Hanh",
  },
  {
    quote:
      "Your anxiety is lying to you. You are stronger than you think, and you've survived every difficult moment so far.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety is the dizziness of freedom. But freedom is worth the discomfort that comes with it.",
    author: "Søren Kierkegaard",
  },
  {
    quote:
      "The cave you fear to enter holds the treasure you seek. Face your anxiety, and you'll find your strength.",
    author: "Joseph Campbell",
  },
  {
    quote:
      "Remember: your anxiety is not a sign of weakness. It's a sign that you're human, and you care deeply.",
    author: "Unknown",
  },
  {
    quote:
      "When anxiety shows up, don't fight it. Acknowledge it, breathe through it, and let it pass like a cloud.",
    author: "Unknown",
  },
  {
    quote:
      "The mind is everything. What you think you become. Choose thoughts that serve you, not ones that create anxiety.",
    author: "Buddha",
  },
  {
    quote:
      "Anxiety is often a sign that you're growing. Discomfort means you're pushing beyond your comfort zone.",
    author: "Unknown",
  },
  {
    quote:
      "You have survived 100% of your worst days. This moment will pass, just like all the others did.",
    author: "Unknown",
  },
  {
    quote:
      "The antidote to anxiety is not certainty, but presence. Be here now, fully and completely.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety is temporary. Your strength is permanent. Trust in your ability to handle whatever comes.",
    author: "Unknown",
  },
  {
    quote:
      "Every moment of anxiety is an opportunity to practice self-compassion and gentle self-care.",
    author: "Unknown",
  },
  {
    quote:
      "The future is uncertain, but that's okay. Uncertainty is where possibility lives. Embrace it.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety is your body's way of saying it's ready. Channel that energy into action, not worry.",
    author: "Unknown",
  },
  {
    quote: "You are not alone in this. Millions of people manage anxiety every day. You can too.",
    author: "Unknown",
  },
  {
    quote:
      "Small steps forward are still progress. Every moment you choose courage over fear is a victory.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety is a messenger, not a master. Listen to what it's telling you, then choose your response.",
    author: "Unknown",
  },
  {
    quote:
      "The only way out is through. Face your anxiety with kindness, and it will lose its power over you.",
    author: "Unknown",
  },
  {
    quote:
      "Your breath is always with you. When anxiety rises, return to your breath. It's your anchor.",
    author: "Unknown",
  },
  {
    quote:
      "Anxiety doesn't define you. It's just one part of your experience. You are so much more.",
    author: "Unknown",
  },
]

export default class QuoteManager {
  getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * anxietyQuotes.length)
    return anxietyQuotes[randomIndex]
  }
}
