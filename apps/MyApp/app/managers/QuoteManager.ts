export type Quote = { quote: string; author: string }

export const heartbreakQuotes: Quote[] = [
  { quote: "The wound is the place where the Light enters you.", author: "Rumi" },
  { quote: "The heart was made to be broken.", author: "Oscar Wilde" },
  {
    quote: "The emotion that can break your heart is sometimes the very one that heals it.",
    author: "Nicholas Sparks",
  },
  { quote: "The best way out is always through.", author: "Robert Frost" },
  { quote: "If you’re going through hell, keep going.", author: "Winston Churchill" },
  { quote: "Pain is inevitable. Suffering is optional.", author: "Haruki Murakami" },
  {
    quote: "Some of us think holding on makes us strong; but sometimes it is letting go.",
    author: "Hermann Hesse",
  },
  {
    quote: "’Tis better to have loved and lost than never to have loved at all.",
    author: "Alfred, Lord Tennyson",
  },
  { quote: "To love at all is to be vulnerable.", author: "C. S. Lewis" },
  {
    quote: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.",
    author: "Rainer Maria Rilke",
  },
  { quote: "Grief is the price we pay for love.", author: "Queen Elizabeth II" },
  {
    quote: "The pain of parting is nothing to the joy of meeting again.",
    author: "Charles Dickens",
  },
  {
    quote: "Have enough courage to trust love one more time and always one more time.",
    author: "Maya Angelou",
  },
  { quote: "Love is so short, forgetting is so long.", author: "Pablo Neruda" },
  { quote: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  {
    quote:
      "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
    author: "Khalil Gibran",
  },
  { quote: "Ruin is a gift. Ruin is the road to transformation.", author: "Elizabeth Gilbert" },
  {
    quote: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  { quote: "No mud, no lotus.", author: "Thich Nhat Hanh" },
]

export default class QuoteManager {
  getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * heartbreakQuotes.length)
    return heartbreakQuotes[randomIndex]
  }
}
