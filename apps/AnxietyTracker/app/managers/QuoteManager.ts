export type Quote = { quote: string; author: string }

export const anxietyQuotes: Quote[] = [
  { quote: "The best way out is always through.", author: "Robert Frost" },
  { quote: "If you're going through hell, keep going.", author: "Winston Churchill" },
  { quote: "Pain is inevitable. Suffering is optional.", author: "Haruki Murakami" },
  {
    quote: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.",
    author: "Rainer Maria Rilke",
  },
  { quote: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  {
    quote:
      "Out of suffering have emerged the strongest souls; the most massive characters are seared with scars.",
    author: "Khalil Gibran",
  },
  {
    quote: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
  },
  { quote: "No mud, no lotus.", author: "Thich Nhat Hanh" },
  {
    quote:
      "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    author: "Maya Angelou",
  },
  { quote: "You cannot find peace by avoiding life.", author: "Virginia Woolf" },
  {
    quote:
      "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
    author: "Joseph Campbell",
  },
  {
    quote:
      "When one door closes, another opens; but we so often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.",
    author: "Alexander Graham Bell",
  },
  {
    quote: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
  },
  {
    quote: "Worry never robs tomorrow of its sorrow, it only saps today of its joy.",
    author: "Leo Buscaglia",
  },
  {
    quote:
      "Anxiety is a thin stream of fear trickling through the mind. If encouraged, it cuts a channel into which all other thoughts are drained.",
    author: "Arthur Somers Roche",
  },
  { quote: "The only way out is through.", author: "Robert Frost" },
  { quote: "Feelings are just visitors, let them come and go.", author: "Mooji" },
  {
    quote:
      "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    quote: "The present moment is the only time over which we have dominion.",
    author: "Thich Nhat Hanh",
  },
  { quote: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson" },
  { quote: "Worry is interest paid on a debt you may not owe.", author: "Unknown" },
  { quote: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell" },
  {
    quote:
      "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
    author: "Charles Spurgeon",
  },
  {
    quote:
      "You are not your anxiety. You are not your thoughts. You are the observer of your thoughts.",
    author: "Unknown",
  },
  { quote: "The mind is everything. What you think you become.", author: "Buddha" },
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
    quote: "You have been assigned this mountain to show others it can be moved.",
    author: "Mel Robbins",
  },
  {
    quote: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
  },
  {
    quote: "It's not the load that breaks you down, it's the way you carry it.",
    author: "Lou Holtz",
  },
  { quote: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard" },
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
    quote: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
  },
  { quote: "Progress, not perfection.", author: "Unknown" },
  {
    quote:
      "One small crack does not mean that you are broken; it means that you were put to the test and you didn't fall apart.",
    author: "Linda Poindexter",
  },
  { quote: "The wound is the place where the Light enters you.", author: "Rumi" },
  { quote: "The cure for pain is in the pain.", author: "Rumi" },
  { quote: "We must embrace pain and burn it as fuel for our journey.", author: "Kenji Miyazawa" },
  {
    quote: "Some of us think holding on makes us strong; but sometimes it is letting go.",
    author: "Hermann Hesse",
  },
  { quote: "Attachment is the root of suffering.", author: "Buddha" },
  {
    quote:
      "What we call the beginning is often the end. And to make an end is to make a beginning.",
    author: "T. S. Eliot",
  },
  { quote: "Ruin is a gift. Ruin is the road to transformation.", author: "Elizabeth Gilbert" },
  { quote: "The only way out of the labyrinth of suffering is to forgive.", author: "John Green" },
]

export default class QuoteManager {
  getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * anxietyQuotes.length)
    return anxietyQuotes[randomIndex]
  }
}
