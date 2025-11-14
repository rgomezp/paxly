import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Attachment module lessons
 */
export const ATTACHMENT_LESSONS: Record<string, ILessonConfig> = {
  d10_attach_screen: {
    id: "d10_attach_screen",
    moduleId: "attachment",
    title: "Attachment Snapshot",
    goal: "Identify anxious/avoidant patterns",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "tendency",
        kind: "radio",
        label:
          "Which feels most familiar? (Attachment styles aren't fixed—they're patterns. Most people have a primary style with some flexibility. Choose what resonates most right now)",
        options: ["anxious", "avoidant", "secure", "mixed"],
      },
      {
        name: "pattern",
        kind: "longText",
        label:
          "Describe one pattern (Be specific: What do you do when you feel insecure? Examples: 'I text repeatedly when they don't respond,' 'I withdraw and shut down,' 'I need constant reassurance')",
      },
    ],
    commitment: { text: "Identify 2 behaviors" },
  },
  d10_protest_behaviors: {
    id: "d10_protest_behaviors",
    moduleId: "attachment",
    title: "Protest Behaviors 101",
    goal: "Replace protest with needs",
    estMinutes: 6,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Protest behaviors are indirect attempts to get connection. Instead of saying 'I need reassurance,' you might act distant to make them chase you. Instead of saying 'I'm hurt,' you might pick a fight.",
      },
      {
        type: "text",
        body: "These behaviors developed because directly asking for needs felt unsafe or was met with rejection. So you learned to get attention through drama, withdrawal, or manipulation.",
      },
      {
        type: "text",
        body: "The problem: Protest behaviors push people away. They create drama instead of intimacy. They make your partner feel confused and defensive rather than connected.",
      },
      {
        type: "tip",
        body: "The secure alternative: Name the need directly. 'I'm feeling insecure and need reassurance.' 'I'm hurt and need to talk about it.' 'I'm anxious and need clarity.'",
      },
      {
        type: "text",
        body: "This feels vulnerable because it is. But vulnerability creates connection. When you can say what you need, you give others the chance to meet you there—or to be honest if they can't.",
      },
      {
        type: "tip",
        body: "Practice: When you feel the urge to protest (act out, withdraw, create drama), pause and ask: 'What do I actually need right now?' Then name it directly, even if just to yourself first.",
      },
    ],
    commitment: { text: "Replace 1 protest behavior" },
  },
  d11_parts_intro: {
    id: "d11_parts_intro",
    moduleId: "attachment",
    title: "Parts Check-In",
    goal: "Reduce shame via parts language",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "part_names",
        kind: "longText",
        label:
          "Who's here? (e.g., Protector, Achiever, People-Pleaser, Inner Critic) - Parts language helps you see behaviors as protective strategies, not flaws. What parts of you are active right now?",
      },
      {
        name: "message",
        kind: "longText",
        label:
          "What each part wants you to know (Each part has a positive intention, even if its methods are problematic. What is each part trying to protect you from? What does it want for you?)",
      },
    ],
    commitment: { text: "Name 2 parts" },
  },
  d12_secure_actions: {
    id: "d12_secure_actions",
    moduleId: "attachment",
    title: "Acting Secure Today",
    goal: "Practice secure micro-behaviors",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Micro-behaviors: Practice secure attachment (You can't think your way into secure attachment—you have to practice it. These small behaviors rewire your patterns. Start with one or two)",
        items: [
          { label: "Slow replies (no urgency spiral)", kind: "check" },
          { label: "Direct ask instead of hinting", kind: "check" },
          { label: "Self-soothe before texting", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "2 secure actions" },
  },
  attachment_needs_inventory: {
    id: "attachment_needs_inventory",
    moduleId: "attachment",
    title: "Core Needs Inventory",
    goal: "Identify and name your attachment needs",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "needs",
        kind: "longText",
        label:
          "What do you need in relationships? (Be specific: Examples include reassurance, consistency, physical touch, quality time, emotional availability, respect, autonomy. What are YOUR core needs?)",
      },
      {
        name: "ways_to_meet",
        kind: "longText",
        label:
          "Ways to meet these needs yourself (Secure attachment means you can meet some needs yourself. How can you self-soothe, self-validate, or create safety for yourself? This reduces dependency on others)",
      },
    ],
    commitment: { text: "Meet 1 need" },
  },
  attachment_anxious_patterns: {
    id: "attachment_anxious_patterns",
    moduleId: "attachment",
    title: "Understanding Anxious Attachment",
    goal: "Recognize and interrupt anxious patterns",
    estMinutes: 18,
    format: "practice",
    steps: [
      // FOUNDATION: What is it?
      {
        t: "instruction",
        body: "Anxious attachment develops when early caregivers were inconsistent—sometimes available, sometimes not.",
      },
      {
        t: "instruction",
        body: "As a child, you learned: 'I need to work hard to keep people close. Love is uncertain, so I must stay vigilant.'",
      },
      {
        t: "instruction",
        body: "This isn't a flaw—it's an intelligent adaptation. Your nervous system developed a strategy to get your needs met in an unpredictable environment.",
      },

      // MANIFESTATION: How it shows up
      {
        t: "instruction",
        body: "In adult relationships, anxious attachment creates predictable patterns:\n\n• Constant phone checking\n• Overanalyzing every text\n• Needing frequent reassurance\n• Feeling panic when they pull back even slightly\n• 'Protest behaviors'—acting out to get attention",
      },
      {
        t: "instruction",
        body: "These behaviors make sense—they're attempts to create the certainty you didn't have early in life. But they often push people away, creating the very abandonment you fear.",
      },

      // REFLECTION: Personal recognition
      {
        t: "instruction",
        body: "Take a moment. Which patterns feel most familiar in your recent relationship?",
      },
      { t: "timer", seconds: 45, label: "Reflect without judgment" },

      // NEUROSCIENCE: What's happening in the brain
      {
        t: "instruction",
        body: "Here's what happens neurologically: When you sense distance, your amygdala (alarm center) signals danger.",
      },
      {
        t: "instruction",
        body: "Your body floods with cortisol and adrenaline—the same chemicals released during actual threats to survival. This feels like panic because neurologically, it IS panic.",
      },
      {
        t: "instruction",
        body: "Your brain interprets emotional separation as life-threatening, even though rationally you know it's not. This is your attachment system doing exactly what it was designed to do.",
      },
      {
        t: "instruction",
        body: "But here's the empowering part: Once you understand this is a nervous system response, not reality, you can work with it.",
      },

      // SOMATIC AWARENESS: Where you feel it
      {
        t: "instruction",
        body: "Let's build body awareness. This is crucial—anxious attachment lives in your body before your mind catches up.",
      },
      {
        t: "instruction",
        body: "Close your eyes. Think about a recent moment when you felt that anxious pull toward your ex—the urge to text, check their profile, or replay conversations.",
      },
      { t: "timer", seconds: 30, label: "Bring up the memory" },
      {
        t: "instruction",
        body: "Now scan your body. Where do you feel it?\n\n• Chest tightness or pressure?\n• Stomach churning or nausea?\n• Throat constriction?\n• Jaw clenching?\n• Restless legs or hands?",
      },
      { t: "timer", seconds: 60, label: "Notice without changing" },
      {
        t: "textInput",
        prompt: "Where did you feel it most strongly?",
        placeholder: "e.g., 'tight chest and jittery hands'",
      },

      // REGULATION: Teaching self-soothing
      {
        t: "instruction",
        body: "Now we'll practice regulating this activated state. This teaches your nervous system: 'I can feel anxiety and not be controlled by it.'",
      },
      {
        t: "instruction",
        body: "This breathing pattern activates your parasympathetic nervous system—your body's brake pedal. It signals safety to your amygdala.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "The anxiety doesn't have to disappear completely. You're learning to be WITH it without acting on it.",
      },
      {
        t: "check",
        prompt: "I notice even a small shift in intensity",
      },

      // COGNITIVE REFRAME: New understanding
      {
        t: "instruction",
        body: "Your anxious part believes: 'If I pursue hard enough, monitor closely enough, I'll finally get the secure love I need.'",
      },
      {
        t: "instruction",
        body: "But here's the paradox: This pursuit actually activates avoidance in others. The harder you chase, the more they withdraw. It becomes a self-fulfilling prophecy.",
      },
      {
        t: "instruction",
        body: "The secure alternative: 'I can feel the anxiety without acting on it. My worth isn't determined by their response. When I give space, I'm actually more attractive—and more aligned with reality.'",
      },

      // PRACTICAL PROTOCOL: What to do
      {
        t: "instruction",
        body: "Next time you feel that anxious pull, use this protocol:\n\n1. NAME IT: 'This is my anxious attachment activating'\n2. LOCATE IT: Where in your body?\n3. BREATHE: 2-3 rounds of physiological breathing\n4. WAIT: 90 seconds before any action\n5. CHOOSE: Act from regulation, not activation",
      },
      {
        t: "instruction",
        body: "Most importantly: The urge to act is information, not instruction. You can notice it without obeying it.",
      },

      // INTEGRATION: Commitment
      {
        t: "instruction",
        body: "This is a practice. You won't be perfect. The goal is progress: catching yourself earlier, pausing more often, choosing differently when you can.",
      },
      {
        t: "check",
        prompt: "I commit to using the 5-step protocol when anxiety hits",
      },
    ],
    commitment: {
      text: "Name activation 3×",
      duration: "today",
    },
    checkIn: { mood: true, urge: true },
  },
  attachment_avoidant_patterns: {
    id: "attachment_avoidant_patterns",
    moduleId: "attachment",
    title: "Recognize Avoidant Patterns",
    goal: "Identify and soften avoidant behaviors",
    estMinutes: 6,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Avoidant attachment develops when early caregivers were emotionally unavailable or rejecting. You learned: 'I can't rely on others. I must be self-sufficient. Needing people is dangerous.'",
      },
      {
        type: "text",
        body: "In adult relationships, avoidant patterns show up as: withdrawing when things get close, minimizing your needs, self-reliance to excess, deactivating strategies (finding flaws, pulling away), and difficulty asking for help.",
      },
      {
        type: "text",
        body: "These aren't flaws—they're protective strategies. Your nervous system learned that depending on others leads to disappointment or rejection. So you became hyper-independent.",
      },
      {
        type: "text",
        body: "The problem: Avoidance prevents intimacy. You can't have deep connection if you never let anyone in. You might feel safer, but you also feel lonelier.",
      },
      {
        type: "tip",
        body: "The secure alternative: Practice asking for help in small ways. Start tiny: 'Can you help me with this?' 'I'm struggling with X.' Each small ask teaches your nervous system: 'It's safe to need others.'",
      },
      {
        type: "text",
        body: "You don't have to become completely dependent. Secure attachment means you CAN rely on yourself AND you CAN rely on others. Both are available to you.",
      },
    ],
    commitment: { text: "Ask for help" },
  },
  attachment_secure_practices: {
    id: "attachment_secure_practices",
    moduleId: "attachment",
    title: "Secure Attachment Practices",
    goal: "Build secure attachment skills",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Practices: Secure attachment behaviors (Secure attachment means you can express needs AND give space, self-soothe AND ask for support. These practices build that flexibility)",
        items: [
          { label: "Express needs directly", kind: "check" },
          { label: "Give space when needed", kind: "check" },
          { label: "Self-soothe before reacting", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "2 secure behaviors" },
  },
  attachment_internal_working_model: {
    id: "attachment_internal_working_model",
    moduleId: "attachment",
    title: "Update Your Internal Working Model",
    goal: "Challenge old beliefs about relationships",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "old_beliefs",
        kind: "longText",
        label:
          "Old beliefs about relationships (What did you learn about love, connection, and safety? Examples: 'Love is unreliable,' 'I'm too much,' 'People always leave,' 'I can't trust others')",
      },
      {
        name: "new_beliefs",
        kind: "longText",
        label:
          "New, healthier beliefs (What would you like to believe instead? Make them believable, not just positive. Examples: 'Love can be consistent AND people are human,' 'I can express needs AND respect boundaries')",
      },
    ],
    commitment: { text: "1 new belief" },
  },
  dating_attachment_awareness: {
    id: "dating_attachment_awareness",
    moduleId: "attachment",
    title: "Attachment Awareness in Dating",
    goal: "Stay aware of attachment patterns while dating",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "patterns",
        kind: "longText",
        label:
          "What attachment patterns do you notice? (Be honest: Are you getting anxious and pursuing? Are you withdrawing and deactivating? Are you seeing red flags but ignoring them? Awareness is the first step)",
      },
      {
        name: "adjustments",
        kind: "longText",
        label:
          "How will you adjust? (What will you do differently? Examples: 'I'll wait 24 hours before responding to texts,' 'I'll ask directly instead of hinting,' 'I'll notice deactivation and stay present')",
      },
    ],
    commitment: { text: "Stay aware" },
  },
}
