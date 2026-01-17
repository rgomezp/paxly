import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Self-Talk That Helps (and Hurts)" lesson definitions.
 *
 * Phase 4: Relationship - Module 13
 *
 * These lessons help users understand how self-talk affects anxiety.
 * They cover:
 * - Reassurance traps
 * - Fighting thoughts vs responding skillfully
 * - Compassion without coddling
 */
export const SELF_TALK_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. How Self-Talk Affects Anxiety
   *
   * Format: Card lesson
   * Focus: Understanding the power of self-talk in anxiety
   */
  self_talk_how_affects: {
    id: "self_talk_how_affects",
    moduleId: "self_talk",
    title: "How Self-Talk Affects Anxiety",
    goal: "Understand how the way you talk to yourself affects anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "The way you talk to yourself matters. Your self-talk can either amplify anxiety or help you work with it. Understanding this helps you respond more skillfully.",
      },
      {
        type: "text",
        body: "When anxiety shows up, you might think: 'I can't handle this,' 'This is terrible,' 'I'm going to panic.' These thoughts amplify anxiety because they're catastrophic and disempowering.",
      },
      {
        type: "tip",
        body: "Catastrophic self-talk = Amplifies anxiety. 'I can't handle this' makes anxiety feel more overwhelming.",
      },
      {
        type: "text",
        body: "But you can also think: 'This is anxiety. It's intense, but I can handle it.' 'This will pass.' 'I've gotten through this before.' These thoughts help you work with anxiety instead of against it.",
      },
      {
        type: "tip",
        body: "Helpful self-talk = Works with anxiety. 'I can handle this' empowers you to work with anxiety.",
      },
      {
        type: "text",
        body: "Self-talk isn't just positive thinking. It's about responding skillfully to what's happening. You're not pretending anxiety isn't there—you're acknowledging it and responding in a way that helps.",
      },
      {
        type: "text",
        body: "The key is noticing your self-talk. When anxiety shows up, what are you saying to yourself? Is it helpful or harmful? Is it amplifying anxiety or helping you work with it?",
      },
      {
        type: "text",
        body: "You don't have to believe every thought. You can notice your self-talk and choose how to respond. You can acknowledge a thought without believing it or acting on it.",
      },
      {
        type: "tip",
        body: "You can notice thoughts without believing them. Noticing self-talk gives you choice in how to respond.",
      },
      {
        type: "text",
        body: "The more you practice noticing and responding skillfully to self-talk, the easier it becomes. You learn that thoughts are just thoughts—they don't have to control you.",
      },
      {
        type: "text",
        body: "Remember: Self-talk is a tool. You can use it to amplify anxiety or to work with it. The choice is yours, and it's a skill you can practice.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Reassurance Traps
   *
   * Format: Card lesson
   * Focus: Understanding how reassurance-seeking can backfire
   */
  self_talk_reassurance_traps: {
    id: "self_talk_reassurance_traps",
    moduleId: "self_talk",
    title: "Reassurance Traps",
    goal: "Understand how reassurance-seeking can reinforce anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Reassurance feels helpful, but it can actually reinforce anxiety. Understanding reassurance traps helps you respond more skillfully to anxiety.",
      },
      {
        type: "text",
        body: "When you're anxious, you might seek reassurance: 'Am I okay?' 'Is this normal?' 'Will this pass?' The reassurance feels good temporarily, but it reinforces the belief that you need external confirmation to feel safe.",
      },
      {
        type: "tip",
        body: "Reassurance-seeking = Temporary relief, long-term reinforcement. It teaches you that you need external confirmation to feel safe.",
      },
      {
        type: "text",
        body: "The trap: Every time you seek reassurance and get it, your brain learns: 'I needed that reassurance to feel safe.' It doesn't learn: 'I can handle uncertainty on my own.'",
      },
      {
        type: "text",
        body: "Reassurance also creates dependency. The more you seek it, the more you need it. You become dependent on others (or Google, or checking) to feel okay, which makes you less confident in your own ability to handle anxiety.",
      },
      {
        type: "tip",
        body: "Reassurance creates dependency. The more you seek it, the more you need it, and the less confident you become.",
      },
      {
        type: "text",
        body: "Self-reassurance can also be a trap. Constantly telling yourself 'I'm okay, I'm okay' can be a safety behavior that prevents you from learning to tolerate uncertainty.",
      },
      {
        type: "text",
        body: "The alternative: Instead of seeking reassurance, practice tolerating uncertainty. Instead of asking 'Am I okay?', practice saying 'I can handle not knowing if I'm okay right now.'",
      },
      {
        type: "text",
        body: "This doesn't mean you can never ask for help or support. It means you're learning to build internal confidence instead of depending on external reassurance.",
      },
      {
        type: "tip",
        body: "Building internal confidence = Learning to tolerate uncertainty without needing external reassurance.",
      },
      {
        type: "text",
        body: "The more you practice tolerating uncertainty without reassurance, the more confident you become. You learn that you can handle anxiety without needing someone (or something) to tell you you're okay.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Fighting Thoughts vs Responding Skillfully
   *
   * Format: Card lesson
   * Focus: Understanding the difference between fighting thoughts and responding skillfully
   */
  self_talk_fighting_vs_responding: {
    id: "self_talk_fighting_vs_responding",
    moduleId: "self_talk",
    title: "Fighting Thoughts vs Responding Skillfully",
    goal: "Learn to respond skillfully to thoughts instead of fighting them",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When you have anxious thoughts, you might try to fight them: 'Stop thinking that!' 'That's not true!' 'Don't be anxious!' But fighting thoughts usually makes them stronger.",
      },
      {
        type: "text",
        body: "Fighting thoughts creates tension. You're trying to force them away, which your brain interprets as more threat, which creates more anxiety. Fighting amplifies what you're trying to eliminate.",
      },
      {
        type: "tip",
        body: "Fighting thoughts = Creating tension = More anxiety. Fighting amplifies what you're trying to eliminate.",
      },
      {
        type: "text",
        body: "Responding skillfully means acknowledging thoughts without fighting them. You notice the thought: 'I'm having the thought that I can't handle this.' You don't have to believe it or fight it—just notice it.",
      },
      {
        type: "text",
        body: "You can then respond skillfully: 'That's a thought, not a fact. I can have this thought and still take action.' You're not fighting the thought—you're working with it.",
      },
      {
        type: "tip",
        body: "Responding skillfully = Acknowledging thoughts without fighting them, then choosing how to respond.",
      },
      {
        type: "text",
        body: "You can also reframe thoughts skillfully. Instead of 'I can't handle this,' you might think 'This is intense, but I can handle it.' Instead of 'This is terrible,' you might think 'This is difficult, but it will pass.'",
      },
      {
        type: "text",
        body: "The key difference: Fighting tries to eliminate thoughts. Responding skillfully acknowledges them and chooses how to work with them.",
      },
      {
        type: "text",
        body: "You don't have to believe every thought. You can notice a thought, acknowledge it's there, and then choose a more helpful response. Thoughts are just thoughts—they don't have to control you.",
      },
      {
        type: "tip",
        body: "Thoughts are just thoughts. You can notice them, acknowledge them, and choose how to respond without fighting them.",
      },
      {
        type: "text",
        body: "The more you practice responding skillfully instead of fighting, the easier it becomes. You learn that thoughts don't have to control you—you can work with them instead of against them.",
      },
      {
        type: "text",
        body: "You can also practice compassion without coddling. Compassionate self-talk acknowledges difficulty while still taking action: 'This is hard, and I'm willing to do it anyway.' Coddling uses difficulty as an excuse to avoid: 'I can't do this because I'm anxious.'",
      },
      {
        type: "tip",
        body: "Compassion = Acknowledging difficulty + taking action. Coddling = Using difficulty as excuse to avoid.",
      },
      {
        type: "text",
        body: "The key is being kind to yourself while still moving forward. You can say 'This is hard' while still doing it. You can acknowledge anxiety while still taking action.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Skillful Self-Talk
   *
   * Format: Practice lesson
   * Focus: Experiential practice in skillful self-talk
   */
  self_talk_practicing: {
    id: "self_talk_practicing",
    moduleId: "self_talk",
    title: "Practicing Skillful Self-Talk",
    goal: "Practice responding skillfully to thoughts and self-talk",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice skillful self-talk. We'll start by noticing your current self-talk, then practice responding more skillfully.",
      },
      {
        t: "instruction",
        body: "First, notice what you're saying to yourself right now. Are there any anxious thoughts? Any self-critical thoughts? Just notice without judgment.",
      },
      { t: "timer", seconds: 30, label: "Notice your current self-talk" },
      {
        t: "instruction",
        body: "Now, if you notice any anxious or unhelpful thoughts, practice acknowledging them without fighting: 'I'm having the thought that...' Notice how that feels different from fighting the thought.",
      },
      { t: "timer", seconds: 30, label: "Practice acknowledging thoughts without fighting" },
      {
        t: "instruction",
        body: "Now practice responding skillfully. If you had the thought 'I can't handle this,' try: 'This is intense, but I can handle it.' Notice how that feels different.",
      },
      { t: "timer", seconds: 30, label: "Practice responding skillfully" },
      {
        t: "instruction",
        body: "Practice compassionate self-talk that still allows for action. Try: 'This is difficult, and I'm willing to do it anyway.' Notice how compassion can coexist with action.",
      },
      { t: "timer", seconds: 30, label: "Practice compassionate self-talk" },
      {
        t: "instruction",
        body: "Now practice noticing reassurance-seeking thoughts. If you notice yourself wanting reassurance, try: 'I can handle uncertainty right now without needing reassurance.'",
      },
      { t: "timer", seconds: 30, label: "Practice tolerating uncertainty" },
      {
        t: "instruction",
        body: "Remember: You don't have to believe every thought. You can notice thoughts, acknowledge them, and choose how to respond. Thoughts are just thoughts—they don't have to control you.",
      },
      {
        t: "instruction",
        body: "The more you practice skillful self-talk, the easier it becomes. You learn that you can work with thoughts instead of fighting them, and that compassion can coexist with action.",
      },
      {
        t: "check",
        prompt: "I can practice skillful self-talk that works with anxiety instead of fighting it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Skillful Self-Talk Toolkit
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for skillful self-talk
   */
  self_talk_build_toolkit: {
    id: "self_talk_build_toolkit",
    moduleId: "self_talk",
    title: "Building Your Skillful Self-Talk Toolkit",
    goal: "Create a personal reference for skillful self-talk",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Self-talk can amplify anxiety or help me work with it",
            kind: "check",
          },
          {
            label: "Fighting thoughts makes them stronger; responding skillfully works with them",
            kind: "check",
          },
          {
            label:
              "Reassurance-seeking creates dependency; tolerating uncertainty builds confidence",
            kind: "check",
          },
          {
            label: "Compassion allows for action; coddling uses difficulty as an excuse to avoid",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Unhelpful Self-Talk Patterns",
        items: [
          {
            label: "'I can't handle this'",
            kind: "check",
          },
          {
            label: "'This is terrible'",
            kind: "check",
          },
          {
            label: "'I'm going to panic'",
            kind: "check",
          },
          {
            label: "'I need reassurance to feel okay'",
            kind: "check",
          },
          {
            label: "'I can't do this because I'm anxious'",
            kind: "check",
          },
          {
            label: "Other unhelpful patterns",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Skillful Self-Talk Responses",
        items: [
          {
            label: "'This is intense, but I can handle it'",
            kind: "check",
          },
          {
            label: "'This is difficult, and it will pass'",
            kind: "check",
          },
          {
            label: "'I'm having the thought that... (acknowledging without fighting)'",
            kind: "check",
          },
          {
            label: "'I can handle uncertainty without reassurance'",
            kind: "check",
          },
          {
            label: "'This is hard, and I'm willing to do it anyway'",
            kind: "check",
          },
          {
            label: "Other skillful responses",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Self-Talk Practice",
        items: [
          {
            label: "I notice my self-talk without judgment",
            kind: "check",
          },
          {
            label: "I acknowledge thoughts without fighting them",
            kind: "check",
          },
          {
            label: "I choose skillful responses instead of fighting",
            kind: "check",
          },
          {
            label: "I practice compassion that allows for action",
            kind: "check",
          },
          {
            label: "I tolerate uncertainty without seeking reassurance",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Go-To Skillful Self-Talk",
        items: [
          {
            label: "Write your top 3 go-to skillful self-talk phrases for when anxiety shows up",
            kind: "shortText",
            inputId: "go_to_self_talk",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
