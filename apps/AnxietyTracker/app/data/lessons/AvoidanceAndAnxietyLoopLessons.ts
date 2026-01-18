import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Avoidance & the Anxiety Loop" lesson definitions.
 *
 * Phase 5: Action - Module 14
 *
 * These lessons help users understand how avoidance reinforces anxiety.
 * They cover:
 * - Short-term relief vs long-term cost
 * - How lives shrink gradually
 * - Why courage grows in inches
 */
export const AVOIDANCE_AND_ANXIETY_LOOP_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. The Avoidance-Anxiety Loop
   *
   * Format: Card lesson
   * Focus: Understanding how avoidance creates a self-reinforcing cycle
   */
  avoidance_anxiety_loop_understanding: {
    id: "avoidance_anxiety_loop_understanding",
    moduleId: "avoidance_and_anxiety_loop",
    title: "The Avoidance-Anxiety Loop",
    goal: "Understand how avoidance creates a self-reinforcing cycle with anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Avoidance and anxiety create a loop that keeps both going. Understanding this loop helps you break free from it.",
      },
      {
        type: "text",
        body: "Here's how it works: You feel anxious about something (a situation, place, or activity). You avoid it. The anxiety goes down temporarily. Your brain learns: 'Avoidance worked. I needed to avoid to feel safe.'",
      },
      {
        type: "tip",
        body: "Avoidance loop: Anxiety → Avoid → Relief → Brain learns avoidance is necessary → More anxiety about the thing → More avoidance...",
      },
      {
        type: "text",
        body: "The problem: Every time you avoid, you reinforce the belief that the thing is dangerous and that you can't handle it. The more you avoid, the stronger the belief becomes, and the more anxious you feel about the thing.",
      },
      {
        type: "text",
        body: "Avoidance works in the short term—it reduces anxiety immediately. But in the long term, it makes anxiety worse because it reinforces the belief that you need to avoid to be safe.",
      },
      {
        type: "tip",
        body: "Avoidance = Short-term relief, long-term reinforcement. It works now but makes anxiety worse over time.",
      },
      {
        type: "text",
        body: "The loop becomes self-reinforcing. You avoid because you're anxious. Avoiding reduces anxiety temporarily. Your brain learns avoidance is necessary. You become more anxious about the thing. You avoid more. The cycle continues.",
      },
      {
        type: "text",
        body: "Breaking the loop requires doing the opposite: Facing what you're avoiding, even when you're anxious. This is hard, but it's the only way to break the cycle.",
      },
      {
        type: "text",
        body: "When you face what you're avoiding, you may learn that you can handle it, even with anxiety. Many people discover that things aren't as dangerous as feared, and that they're more capable than they believed.",
      },
      {
        type: "tip",
        body: "Breaking the loop = Facing what you're avoiding, learning you can handle it, building confidence.",
      },
      {
        type: "text",
        body: "Understanding the avoidance-anxiety loop is the first step to breaking it. Once you see how it works, you can start making different choices.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Short-Term Relief vs Long-Term Cost
   *
   * Format: Card lesson
   * Focus: Understanding the trade-off of avoidance
   */
  avoidance_short_term_vs_long_term: {
    id: "avoidance_short_term_vs_long_term",
    moduleId: "avoidance_and_anxiety_loop",
    title: "Short-Term Relief vs Long-Term Cost",
    goal: "Understand the trade-off between avoidance's immediate relief and long-term costs",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Avoidance feels good in the moment. When you avoid something that makes you anxious, you get immediate relief. The anxiety goes down, and you feel better. That's why avoidance is so tempting.",
      },
      {
        type: "text",
        body: "But here's the cost: Every time you avoid, you pay a price. You reinforce the belief that you can't handle the thing. You make the thing seem more dangerous. You shrink your life a little bit.",
      },
      {
        type: "tip",
        body: "Avoidance = Immediate relief, but you pay with: reinforced fear, lost confidence, and a smaller life.",
      },
      {
        type: "text",
        body: "The short-term relief is real. You do feel better when you avoid. But the long-term cost is also real: Your life gets smaller. Your confidence shrinks. Your anxiety grows.",
      },
      {
        type: "text",
        body: "Think about it: Every time you avoid, you're trading immediate comfort for long-term freedom. You're choosing short-term relief over long-term growth.",
      },
      {
        type: "text",
        body: "The more you avoid, the more you have to avoid. Avoidance creates more avoidance. What started as avoiding one thing can grow into avoiding many things, until your life becomes very small.",
      },
      {
        type: "tip",
        body: "Avoidance breeds avoidance. One avoided thing becomes many avoided things, and your life shrinks.",
      },
      {
        type: "text",
        body: "The alternative: Choose long-term freedom over short-term comfort. Face what you're avoiding, even when it's hard. Pay the price of temporary anxiety for the reward of long-term confidence and freedom.",
      },
      {
        type: "text",
        body: "This doesn't mean you have to face everything at once. You can start small. But every time you choose to face something instead of avoid it, you're investing in your long-term freedom.",
      },
      {
        type: "text",
        body: "The choice is yours: Short-term relief with long-term cost, or short-term discomfort with long-term freedom. Understanding this trade-off helps you make choices that serve your long-term goals.",
      },
      {
        type: "tip",
        body: "Every avoidance = Short-term relief, long-term cost. Every facing = Short-term discomfort, long-term freedom.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. How Lives Shrink Gradually
   *
   * Format: Card lesson
   * Focus: Understanding how avoidance gradually limits life
   */
  avoidance_lives_shrink: {
    id: "avoidance_lives_shrink",
    moduleId: "avoidance_and_anxiety_loop",
    title: "How Lives Shrink Gradually",
    goal: "Understand how avoidance gradually limits your life",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Avoidance doesn't shrink your life all at once. It happens gradually, one avoided thing at a time. You might not even notice it's happening until your life has become much smaller.",
      },
      {
        type: "text",
        body: "It starts small: You avoid one social event because you're anxious. Then you avoid another. Then you start avoiding social situations in general. Your social life shrinks.",
      },
      {
        type: "tip",
        body: "Avoidance starts small and grows. One avoided thing becomes a pattern, and patterns become a smaller life.",
      },
      {
        type: "text",
        body: "You might avoid driving on highways. Then you avoid certain routes. Then you avoid driving in general. Your ability to get around shrinks.",
      },
      {
        type: "text",
        body: "You might avoid crowded places. Then you avoid stores. Then you avoid leaving the house. Your world shrinks to your home.",
      },
      {
        type: "text",
        body: "Each avoidance seems reasonable in the moment. 'I'm just not going to this one thing.' But over time, all those 'one things' add up to a much smaller life.",
      },
      {
        type: "tip",
        body: "Each avoidance seems small, but they add up. One 'just this once' becomes a pattern, and patterns become a smaller life.",
      },
      {
        type: "text",
        body: "The scary part: You might not notice it's happening. It happens so gradually that you adapt to the shrinking. You might think 'I just don't like going out' or 'I'm just a homebody,' not realizing that avoidance created that preference.",
      },
      {
        type: "text",
        body: "But here's the good news: Just as lives shrink gradually, they can expand gradually. Every time you face something instead of avoid it, you're expanding your life a little bit.",
      },
      {
        type: "text",
        body: "You don't have to face everything at once. You can start small. But every small step toward facing what you're avoiding is a step toward a bigger, freer life.",
      },
      {
        type: "tip",
        body: "Lives shrink gradually through avoidance, and they expand gradually through facing. Every small step counts.",
      },
      {
        type: "text",
        body: "Just as lives shrink gradually, they can expand gradually. Courage grows in inches, not miles. You don't have to face your biggest fear first—you can start small and build from there.",
      },
      {
        type: "text",
        body: "Every time you face something instead of avoid it, you're building courage and confidence. Each facing teaches you: 'I can handle this, even with anxiety.' That learning builds on itself.",
      },
      {
        type: "tip",
        body: "Courage = Action despite fear, not absence of fear. Every small step toward facing expands your life.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Mapping Your Avoidance Patterns
   *
   * Format: Practice lesson
   * Focus: Experiential practice in identifying avoidance patterns
   */
  avoidance_mapping_patterns: {
    id: "avoidance_mapping_patterns",
    moduleId: "avoidance_and_anxiety_loop",
    title: "Mapping Your Avoidance Patterns",
    goal: "Identify your personal avoidance patterns and their costs",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's map your avoidance patterns. Understanding what you're avoiding and why helps you start breaking the cycle.",
      },
      {
        t: "instruction",
        body: "Think about what you avoid because of anxiety. It might be situations, places, activities, people, or thoughts. What comes to mind?",
      },
      { t: "timer", seconds: 45, label: "Identify what you avoid" },
      {
        t: "instruction",
        body: "Now think about how this avoidance started. Was there a specific event? Or did it build gradually? Notice the pattern.",
      },
      { t: "timer", seconds: 30, label: "Notice how avoidance started" },
      {
        t: "instruction",
        body: "What has avoidance cost you? How has your life shrunk? What have you missed out on? Be honest with yourself about the cost.",
      },
      { t: "timer", seconds: 45, label: "Reflect on the cost of avoidance" },
      {
        t: "instruction",
        body: "Notice the avoidance-anxiety loop. How does avoiding make you more anxious about the thing? How does it reinforce the belief that you can't handle it?",
      },
      { t: "timer", seconds: 30, label: "Notice the loop" },
      {
        t: "instruction",
        body: "Now think about one small thing you could face instead of avoid. It doesn't have to be big—just something that's challenging but manageable. What could you start with?",
      },
      { t: "timer", seconds: 45, label: "Identify one small thing to face" },
      {
        t: "instruction",
        body: "Remember: Courage grows in inches. You don't have to face everything at once. Start small, and build from there. Every step counts.",
      },
      {
        t: "instruction",
        body: "The goal isn't to eliminate anxiety—it's to live your life even when anxiety is present. That's courage: action despite fear.",
      },
      {
        t: "check",
        prompt:
          "I can identify my avoidance patterns and start taking small steps to face what I'm avoiding.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Avoidance Awareness
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for avoidance patterns
   */
  avoidance_build_awareness: {
    id: "avoidance_build_awareness",
    moduleId: "avoidance_and_anxiety_loop",
    title: "Building Your Avoidance Awareness",
    goal: "Create a personal reference for your avoidance patterns",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Avoidance creates a self-reinforcing loop with anxiety",
            kind: "check",
          },
          {
            label: "Avoidance gives short-term relief but has long-term costs",
            kind: "check",
          },
          {
            label: "Lives shrink gradually through avoidance, one thing at a time",
            kind: "check",
          },
          {
            label: "Courage grows in inches—every small step counts",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "What I Avoid",
        items: [
          {
            label: "Social situations or events",
            kind: "check",
          },
          {
            label: "Certain places or locations",
            kind: "check",
          },
          {
            label: "Driving or transportation",
            kind: "check",
          },
          {
            label: "Crowded or public places",
            kind: "check",
          },
          {
            label: "Specific activities or experiences",
            kind: "check",
          },
          {
            label: "Certain people or types of people",
            kind: "check",
          },
          {
            label: "Other things I avoid",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "The Cost of My Avoidance",
        items: [
          {
            label: "My social life has shrunk",
            kind: "check",
          },
          {
            label: "My ability to get around has shrunk",
            kind: "check",
          },
          {
            label: "My confidence has decreased",
            kind: "check",
          },
          {
            label: "I've missed out on experiences",
            kind: "check",
          },
          {
            label: "My world has become smaller",
            kind: "check",
          },
          {
            label: "Other costs",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Small Steps Forward",
        items: [
          {
            label: "Write one small thing you can start facing instead of avoiding",
            kind: "shortText",
            inputId: "small_step",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
