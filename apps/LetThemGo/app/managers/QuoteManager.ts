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
  { quote: "The heart will break, but broken live on.", author: "Lord Byron" },
  {
    quote:
      "What we have once enjoyed we can never lose; all that we love deeply becomes a part of us.",
    author: "Helen Keller",
  },
  { quote: "To weep is to make less the depth of grief.", author: "William Shakespeare" },
  { quote: "The cure for pain is in the pain.", author: "Rumi" },
  { quote: "The opposite of love is not hate, it's indifference.", author: "Elie Wiesel" },
  { quote: "We must embrace pain and burn it as fuel for our journey.", author: "Kenji Miyazawa" },
  {
    quote: "If you're brave enough to say goodbye, life will reward you with a new hello.",
    author: "Paulo Coelho",
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
  { quote: "Attachment is the root of suffering.", author: "Buddha" },
  { quote: "You cannot find peace by avoiding life.", author: "Virginia Woolf" },
  {
    quote:
      "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
    author: "Joseph Campbell",
  },
  { quote: "The hottest love has the coldest end.", author: "Socrates" },
  {
    quote: "It is better to be hated for what you are than to be loved for what you are not.",
    author: "André Gide",
  },
  {
    quote:
      "What we call the beginning is often the end. And to make an end is to make a beginning.",
    author: "T. S. Eliot",
  },
  { quote: "The heart has its reasons which reason does not know.", author: "Blaise Pascal" },
  {
    quote: "It is strange how often a heart must be broken before the years can make it wise.",
    author: "Sara Teasdale",
  },
  {
    quote:
      "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    author: "Maya Angelou",
  },
  { quote: "The only way out of the labyrinth of suffering is to forgive.", author: "John Green" },
  {
    quote:
      "Keep love in your heart. A life without it is like a sunless garden when the flowers are dead.",
    author: "Oscar Wilde",
  },
]

export default class QuoteManager {
  getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * heartbreakQuotes.length)
    return heartbreakQuotes[randomIndex]
  }
}
