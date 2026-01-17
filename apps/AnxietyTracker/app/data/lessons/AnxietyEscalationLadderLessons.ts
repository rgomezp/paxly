import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "The Anxiety Escalation Ladder" lesson definitions.
 *
 * Phase 2: Awareness - Module 5
 *
 * These lessons help users identify their early warning signals and understand
 * how anxiety escalates. They cover:
 * - Early signs → mid → peak
 * - Personal patterns (tight chest, rumination, irritability)
 *
 * Skill: Identifying **your** early warning signals
 */
export const ANXIETY_ESCALATION_LADDER_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. The Anxiety Escalation Ladder
   *
   * Format: Card lesson
   * Focus: Understanding how anxiety escalates from early signs to peak
   */
  anxiety_escalation_ladder_understanding: {
    id: "anxiety_escalation_ladder_understanding",
    moduleId: "anxiety_escalation_ladder",
    title: "The Anxiety Escalation Ladder",
    goal: "Understand how anxiety escalates from early signs to peak",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety doesn't go from zero to panic instantly. It escalates in stages, like climbing a ladder. Understanding these stages helps you catch it earlier.",
      },
      {
        type: "text",
        body: "Early signs are the first rungs of the ladder. You might notice slight tightness in your chest, faster breathing, or a subtle sense of unease. These are easy to miss, but they're your first warning signals.",
      },
      {
        type: "tip",
        body: "Early signs = Subtle physical sensations, slight changes in breathing, initial worry thoughts. These are your first clues that anxiety is starting.",
      },
      {
        type: "text",
        body: "Mid-level anxiety is the middle rungs. The sensations get stronger—your heart might race, your chest might feel tighter, your thoughts might start racing. You're definitely feeling anxious now.",
      },
      {
        type: "tip",
        body: "Mid-level = Noticeable physical symptoms, racing thoughts, feeling 'on edge.' You know you're anxious, but it's still manageable.",
      },
      {
        type: "text",
        body: "Peak anxiety is the top rungs. Your body's alarm system is at full volume—intense physical symptoms, overwhelming thoughts, maybe even panic. This is when it feels hardest to manage.",
      },
      {
        type: "tip",
        body: "Peak = Maximum intensity. Your survival system is fully activated. This is when it's hardest to intervene, but still possible.",
      },
      {
        type: "text",
        body: "The key insight: It's much easier to intervene at the early signs than at the peak. Once you're at the top of the ladder, it takes more effort to come down.",
      },
      {
        type: "text",
        body: "Think of it like a fire. Early signs are like a small spark—easy to put out. Mid-level is like a growing flame—still manageable. Peak is like a full blaze—much harder to control.",
      },
      {
        type: "text",
        body: "The goal isn't to never feel anxious. The goal is to catch it early, when it's easier to work with. The earlier you notice, the more options you have.",
      },
      {
        type: "tip",
        body: "Early intervention = More options, less intensity, easier to manage. Late intervention = Fewer options, more intensity, harder to manage.",
      },
      {
        type: "text",
        body: "Everyone's ladder looks different. Your early signs might be different from someone else's. The important thing is learning to recognize your own pattern.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Identifying Your Early Warning Signals
   *
   * Format: Card lesson
   * Focus: Learning to recognize personal early warning signs
   */
  anxiety_escalation_ladder_early_signals: {
    id: "anxiety_escalation_ladder_early_signals",
    moduleId: "anxiety_escalation_ladder",
    title: "Identifying Your Early Warning Signals",
    goal: "Learn to recognize your personal early warning signs",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Your early warning signals are unique to you. They're the subtle signs that anxiety is starting to build, before it gets intense. Learning to recognize them is a crucial skill.",
      },
      {
        type: "text",
        body: "Physical early signs might include: slight tightness in chest or shoulders, faster breathing (even if subtle), restlessness, tension in jaw or hands, butterflies in stomach, or feeling 'on edge.'",
      },
      {
        type: "tip",
        body: "Physical early signs are often subtle—easy to miss if you're not paying attention, but clear once you know what to look for.",
      },
      {
        type: "text",
        body: "Mental early signs might include: initial worry thoughts, difficulty focusing, feeling scattered, irritability, or a sense that something's 'off.'",
      },
      {
        type: "tip",
        body: "Mental early signs are often the first thoughts that something might go wrong, before the full worry spiral begins.",
      },
      {
        type: "text",
        body: "Behavioral early signs might include: checking things repeatedly, seeking reassurance, avoiding certain situations, or feeling the urge to escape.",
      },
      {
        type: "tip",
        body: "Behavioral early signs are often safety behaviors—things you do to try to feel safer, which can actually reinforce anxiety.",
      },
      {
        type: "text",
        body: "To identify your early signs, think back to times when anxiety escalated. What did you notice first? What were the very first clues that anxiety was starting?",
      },
      {
        type: "text",
        body: "Common patterns: Some people notice physical signs first (tight chest, faster breathing). Others notice mental signs first (worry thoughts, difficulty focusing). Some notice behavioral signs first (urge to check, avoid, or escape).",
      },
      {
        type: "text",
        body: "The more you practice noticing your early signs, the better you get at catching anxiety early. It's like learning a new language—at first it's hard, but with practice it becomes automatic.",
      },
      {
        type: "tip",
        body: "Practice makes perfect. The more you notice your early signs, the easier it becomes to catch them in the moment.",
      },
      {
        type: "text",
        body: "Remember: Early signs aren't bad—they're information. They're your body's way of saying 'Hey, anxiety is starting to build.' Once you notice them, you can choose how to respond.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Mapping Your Personal Escalation Pattern
   *
   * Format: Practice lesson
   * Focus: Experiential practice in identifying personal escalation patterns
   */
  anxiety_escalation_ladder_mapping_pattern: {
    id: "anxiety_escalation_ladder_mapping_pattern",
    moduleId: "anxiety_escalation_ladder",
    title: "Mapping Your Personal Escalation Pattern",
    goal: "Identify your personal pattern of anxiety escalation",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Think of a recent time when anxiety escalated for you. It doesn't have to be a panic attack—just a time when anxiety built from low to high.",
      },
      {
        t: "instruction",
        body: "Now, let's map it out. What were the very first signs? The earliest things you noticed—maybe subtle physical sensations, initial thoughts, or behavioral urges.",
      },
      { t: "timer", seconds: 45, label: "Identify your earliest signs" },
      {
        t: "instruction",
        body: "What came next? As anxiety built, what signs appeared? Did physical sensations get stronger? Did thoughts get more intense? Did behaviors change?",
      },
      { t: "timer", seconds: 45, label: "Identify mid-level signs" },
      {
        t: "instruction",
        body: "What did it look like at the peak? What were the most intense symptoms? Physical, mental, behavioral—what was happening when anxiety was at its highest?",
      },
      { t: "timer", seconds: 45, label: "Identify peak signs" },
      {
        t: "instruction",
        body: "Now look at your pattern. Do you notice physical signs first? Mental signs? Behavioral signs? Or a combination?",
      },
      { t: "timer", seconds: 30, label: "Notice your pattern" },
      {
        t: "instruction",
        body: "Think about what your early signs are. These are your personal early warning signals—the things to watch for so you can catch anxiety early next time.",
      },
      { t: "timer", seconds: 30, label: "Identify your early warning signals" },
      {
        t: "instruction",
        body: "The more you understand your pattern, the better you can catch anxiety early. Practice noticing these early signs in your daily life, even when anxiety is low.",
      },
      {
        t: "instruction",
        body: "Remember: Early signs aren't bad news—they're information. They're your body's way of communicating. Once you notice them, you have more options for how to respond.",
      },
      {
        t: "check",
        prompt: "I can identify my early warning signals and use them to catch anxiety early.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Anxiety Escalation Pattern
   *
   * Format: Journal lesson
   * Focus: Personal reflection on escalation patterns and early warning signs
   */
  anxiety_escalation_ladder_my_pattern: {
    id: "anxiety_escalation_ladder_my_pattern",
    moduleId: "anxiety_escalation_ladder",
    title: "My Anxiety Escalation Pattern",
    goal: "Document your personal anxiety escalation pattern",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "early_signs",
        kind: "longText",
        label:
          "What are your early warning signals? (Physical: tight chest, faster breathing, etc. Mental: initial worry thoughts, etc. Behavioral: urge to check, avoid, etc.)",
        minWords: 25,
      },
      {
        name: "mid_level_signs",
        kind: "longText",
        label:
          "What happens at mid-level anxiety? (What physical, mental, and behavioral signs appear as anxiety builds?)",
        minWords: 25,
      },
      {
        name: "peak_signs",
        kind: "longText",
        label:
          "What happens at peak anxiety? (What are the most intense symptoms when anxiety is at its highest?)",
        minWords: 25,
      },
      {
        name: "pattern_noticed",
        kind: "longText",
        label:
          "What pattern do you notice? (Do physical, mental, or behavioral signs come first? How do they build on each other?)",
        minWords: 20,
      },
      {
        name: "early_intervention",
        kind: "longText",
        label:
          "How might catching your early signs help you intervene earlier? What could you do differently if you noticed anxiety starting to build?",
        minWords: 20,
      },
    ],
    autosaveTag: "anxiety_escalation_pattern",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Early Warning System
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for early warning signals
   */
  anxiety_escalation_ladder_build_system: {
    id: "anxiety_escalation_ladder_build_system",
    moduleId: "anxiety_escalation_ladder",
    title: "Building Your Early Warning System",
    goal: "Create a personal reference for your early warning signals",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Anxiety escalates in stages: early signs → mid-level → peak",
            kind: "check",
          },
          {
            label: "It's easier to intervene at early signs than at peak",
            kind: "check",
          },
          {
            label: "Everyone's early warning signals are unique",
            kind: "check",
          },
          {
            label: "Early signs are information, not bad news",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Early Warning Signals (Physical)",
        items: [
          {
            label: "Slight tightness in chest or shoulders",
            kind: "check",
          },
          {
            label: "Faster or shallower breathing",
            kind: "check",
          },
          {
            label: "Restlessness or feeling 'on edge'",
            kind: "check",
          },
          {
            label: "Tension in jaw, hands, or other muscles",
            kind: "check",
          },
          {
            label: "Butterflies in stomach or stomach tightness",
            kind: "check",
          },
          {
            label: "Feeling hot or sweaty",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Early Warning Signals (Mental)",
        items: [
          {
            label: "Initial worry thoughts or 'what if' thinking",
            kind: "check",
          },
          {
            label: "Difficulty focusing or feeling scattered",
            kind: "check",
          },
          {
            label: "Irritability or feeling easily annoyed",
            kind: "check",
          },
          {
            label: "Sense that something's 'off' or wrong",
            kind: "check",
          },
          {
            label: "Racing thoughts starting to build",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Early Warning Signals (Behavioral)",
        items: [
          {
            label: "Urge to check things repeatedly",
            kind: "check",
          },
          {
            label: "Seeking reassurance from others",
            kind: "check",
          },
          {
            label: "Avoiding certain situations or places",
            kind: "check",
          },
          {
            label: "Feeling the urge to escape or leave",
            kind: "check",
          },
          {
            label: "Restless movement or fidgeting",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Action Plan",
        items: [
          {
            label: "When I notice my early signs, I will: (write what you'll do)",
            kind: "shortText",
            inputId: "action_plan",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
