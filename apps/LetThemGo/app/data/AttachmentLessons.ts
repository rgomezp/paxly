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
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Attachment styles aren't fixed—they're patterns you learned in childhood to get your needs met. Understanding your pattern helps you recognize it when it activates, so you can choose differently.",
      },
      {
        t: "instruction",
        body: "Here's a quick overview of attachment styles. Let's go through them one by one.",
      },
      {
        t: "instruction",
        body: "Anxious attachment: Fear of abandonment, strong craving for closeness and reassurance, worry they'll leave. When anxious, you might text repeatedly, need constant reassurance, or feel panic when they pull back even slightly.",
      },
      {
        t: "instruction",
        body: "Avoidant attachment: Value independence, pull away or shut down when things get too close or intense. When avoidant, you might find flaws, create distance, or minimize your needs to avoid vulnerability.",
      },
      {
        t: "instruction",
        body: "Secure attachment: Generally trust others, feel comfortable with both closeness and space, communicate needs directly. Secure people can ask for what they need without drama or withdrawal.",
      },
      {
        t: "instruction",
        body: "Mixed attachment: You see both anxious and avoidant patterns in yourself, depending on the person or situation. This is common—most people have a primary style with some flexibility.",
      },
      {
        t: "instruction",
        body: "The goal isn't to label yourself—it's to recognize patterns so you can work with them. Most people have a primary style with some flexibility.",
      },
      {
        t: "instruction",
        body: "Which attachment style feels most familiar right now? Think about your recent relationship. What patterns did you notice?",
      },
      { t: "timer", seconds: 45, label: "Reflect on your patterns" },
      {
        t: "textInput",
        prompt: "Which attachment style feels most familiar? (anxious, avoidant, secure, mixed)",
        placeholder: "e.g., anxious",
      },
      {
        t: "instruction",
        body: "Now, be specific: What do you do when you feel insecure? What's the actual behavior? Examples:\n\n• 'I text repeatedly when they don't respond'\n• 'I withdraw and shut down'\n• 'I need constant reassurance'\n• 'I find flaws and pull away'\n\nBe honest—this is about awareness, not judgment.",
      },
      {
        t: "textInput",
        prompt: "Describe one specific pattern (What do you do when you feel insecure?)",
        placeholder: "e.g., 'I text repeatedly when they don't respond'",
      },
      {
        t: "instruction",
        body: "Good. Now, what's the need underneath this pattern? What are you really trying to get? Reassurance? Safety? Control? Space?",
      },
      {
        t: "textInput",
        prompt: "What's the need underneath this pattern?",
        placeholder: "e.g., 'I need reassurance that they still care'",
      },
      {
        t: "instruction",
        body: "The insight: Your attachment pattern is an attempt to meet a need. The behavior might not be working, but the need is valid. Once you know the need, you can find healthier ways to meet it.",
      },
      {
        t: "instruction",
        body: "What's one way you could meet this need more directly? Instead of the pattern, what would secure behavior look like?",
      },
      {
        t: "textInput",
        prompt:
          "What would secure behavior look like? (How could you meet this need more directly?)",
        placeholder: "e.g., 'I could ask directly for reassurance instead of texting repeatedly'",
      },
      {
        t: "instruction",
        body: "Remember: Attachment styles aren't fixed. You can develop more secure patterns through awareness and practice. This snapshot is just the starting point.",
      },
      {
        t: "check",
        prompt: "I can recognize my attachment patterns and choose more secure behaviors",
      },
    ],
    commitment: { text: "Finish" },
  },
  d10_protest_behaviors: {
    id: "d10_protest_behaviors",
    moduleId: "attachment",
    title: "Protest Behaviors 101",
    goal: "Replace protest with needs",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Protest behaviors are indirect attempts to get connection. Instead of saying 'I need reassurance,' you might act distant to make them chase you. Instead of saying 'I'm hurt,' you might pick a fight.",
      },
      {
        t: "instruction",
        body: "These behaviors developed because directly asking for needs felt unsafe or was met with rejection. So you learned to get attention through drama, withdrawal, or manipulation. This isn't a flaw—it's an adaptation that made sense at the time.",
      },
      {
        t: "instruction",
        body: "The problem: Protest behaviors push people away. They create drama instead of intimacy. They make your partner feel confused and defensive rather than connected.",
      },
      {
        t: "instruction",
        body: "Think about a recent time you used a protest behavior. Maybe you acted distant when you wanted closeness. Maybe you picked a fight when you needed reassurance. What were you really trying to get?",
      },
      { t: "timer", seconds: 45, label: "Identify a recent protest behavior" },
      {
        t: "textInput",
        prompt: "What protest behavior did you use?",
        placeholder: "e.g., 'I acted distant when I wanted closeness'",
      },
      {
        t: "instruction",
        body: "Now, what was the need underneath? What were you really trying to get? Reassurance? Closeness? Clarity? Validation?",
      },
      {
        t: "textInput",
        prompt: "What was the need underneath?",
        placeholder: "e.g., 'I needed reassurance that they still care'",
      },
      {
        t: "instruction",
        body: "The secure alternative: Name the need directly. 'I'm feeling insecure and need reassurance.' 'I'm hurt and need to talk about it.' 'I'm anxious and need clarity.'",
      },
      {
        t: "instruction",
        body: "This feels vulnerable because it is. But vulnerability creates connection. When you can say what you need, you give others the chance to meet you there—or to be honest if they can't.",
      },
      {
        t: "instruction",
        body: "Now, practice naming that need directly. How would you express it if you were being secure?",
      },
      {
        t: "textInput",
        prompt: "How would you express this need directly? (Practice the secure way)",
        placeholder: "e.g., 'I'm feeling insecure and need reassurance'",
      },
      {
        t: "instruction",
        body: "Notice how different this feels from the protest behavior. One creates drama and distance. The other creates clarity and possibility for connection.",
      },
      {
        t: "instruction",
        body: "Practice: When you feel the urge to protest (act out, withdraw, create drama), pause and ask: 'What do I actually need right now?' Then name it directly, even if just to yourself first.",
      },
      {
        t: "check",
        prompt: "I can identify my needs and express them directly instead of protesting",
      },
    ],
    commitment: { text: "Finish" },
  },
  d11_parts_intro: {
    id: "d11_parts_intro",
    moduleId: "attachment",
    title: "Parts Check-In",
    goal: "Reduce shame via parts language",
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
    commitment: { text: "Finish" },
  },
  d12_secure_actions: {
    id: "d12_secure_actions",
    moduleId: "attachment",
    title: "Acting Secure Today",
    goal: "Practice secure micro-behaviors",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "You can't think your way into secure attachment—you have to practice it. Your nervous system learns through repetition. Every time you choose a secure behavior, you're literally rewiring your brain.",
      },
      {
        t: "instruction",
        body: "These aren't about being perfect. They're micro-experiments: 'What happens if I respond slowly instead of immediately? What happens if I ask directly instead of hinting?'",
      },
      {
        t: "instruction",
        body: "Let's identify which secure behaviors feel most doable for you today. We'll start with one or two—not all of them. Small, consistent practice beats perfect attempts.",
      },
      {
        t: "instruction",
        body: "Option 1: Slow replies (no urgency spiral)\n\nWhen you feel the urge to respond immediately, wait. Set a timer for 30 minutes. Notice the anxiety that comes up—and that you can survive it. This teaches your nervous system: 'I don't need immediate response to feel safe.'",
      },
      {
        t: "instruction",
        body: "Option 2: Direct ask instead of hinting\n\nInstead of 'I guess you're busy' (hint), try 'I'm feeling insecure. Can you reassure me?' (direct). This feels vulnerable, but it creates clarity instead of drama.",
      },
      {
        t: "instruction",
        body: "Option 3: Self-soothe before texting\n\nBefore sending any message, take 3 breaths. Ask: 'What do I actually need right now?' Sometimes the answer is self-soothing, not contact.",
      },
      {
        t: "instruction",
        body: "Which one feels most doable today? Pick one to practice. You can try others later—but start with one.",
      },
      { t: "timer", seconds: 30, label: "Choose your practice" },
      {
        t: "textInput",
        prompt: "Which secure behavior will you practice today?",
        placeholder: "e.g., slow replies, direct asks, self-soothing",
      },
      {
        t: "instruction",
        body: "Now, commit to practicing this ONE behavior today. Notice what happens. Does it feel different? Scary? Freeing? All of the above? That's normal. You're building new patterns.",
      },
      {
        t: "check",
        prompt: "I'll practice one secure behavior today and notice what happens",
      },
    ],
    commitment: { text: "Finish" },
  },
  attachment_needs_inventory: {
    id: "attachment_needs_inventory",
    moduleId: "attachment",
    title: "Core Needs Inventory",
    goal: "Identify and name your attachment needs",
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
    commitment: { text: "Finish" },
  },
  attachment_anxious_patterns: {
    id: "attachment_anxious_patterns",
    moduleId: "attachment",
    title: "Understanding Anxious Attachment",
    goal: "Recognize and interrupt anxious patterns",
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
      text: "Finish",
      duration: "today",
    },
    checkIn: { mood: true, urge: true },
  },
  attachment_avoidant_patterns: {
    id: "attachment_avoidant_patterns",
    moduleId: "attachment",
    title: "Recognize Avoidant Patterns",
    goal: "Identify and soften avoidant behaviors",
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
    commitment: { text: "Finish" },
  },
  attachment_secure_practices: {
    id: "attachment_secure_practices",
    moduleId: "attachment",
    title: "Secure Attachment Practices",
    goal: "Build secure attachment skills",
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
    commitment: { text: "Finish" },
  },
  attachment_internal_working_model: {
    id: "attachment_internal_working_model",
    moduleId: "attachment",
    title: "Update Your Internal Working Model",
    goal: "Challenge old beliefs about relationships",
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
    commitment: { text: "Finish" },
  },
  dating_attachment_awareness: {
    id: "dating_attachment_awareness",
    moduleId: "attachment",
    title: "Attachment Awareness in Dating",
    goal: "Stay aware of attachment patterns while dating",
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
    commitment: { text: "Finish" },
  },
}
