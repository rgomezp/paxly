import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Your Personal Playbook" lesson definitions.
 *
 * Phase 6: Integration - Module 19
 *
 * These lessons help users create their personal playbook for managing anxiety.
 * They cover:
 * - Early warning signs
 * - Go-to tools
 * - Personal language that works
 */
export const PERSONAL_PLAYBOOK_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. What Is a Personal Playbook?
   *
   * Format: Card lesson
   * Focus: Understanding what a personal playbook is and why it matters
   */
  personal_playbook_what_is_it: {
    id: "personal_playbook_what_is_it",
    moduleId: "personal_playbook",
    title: "What Is a Personal Playbook?",
    goal: "Understand what a personal playbook is and why it's valuable",
    format: "card",
    cards: [
      {
        type: "text",
        body: "A personal playbook is your customized guide for managing anxiety. It's your collection of early warning signs, go-to tools, and personal language that works for you.",
      },
      {
        type: "text",
        body: "Think of it like a coach's playbook: When anxiety shows up, you don't have to figure everything out from scratch. You have a plan. You know your early warning signs. You know which tools work for you. You know what to say to yourself.",
      },
      {
        type: "tip",
        body: "Personal playbook = Your customized guide for managing anxiety. Early warning signs + go-to tools + personal language.",
      },
      {
        type: "text",
        body: "Your playbook is unique to you. What works for someone else might not work for you. Your early warning signs are different. Your tools are different. Your language is different. That's why it's personal.",
      },
      {
        type: "text",
        body: "The playbook helps you respond quickly and skillfully. When you notice an early warning sign, you don't have to think—you can go straight to your tools. When anxiety shows up, you know what to do.",
      },
      {
        type: "tip",
        body: "Playbook = Quick, skillful response. Notice early warning sign → Use go-to tool → Use personal language.",
      },
      {
        type: "text",
        body: "Your playbook evolves over time. As you learn what works, you add it. As you discover new tools, you try them. As you find language that helps, you use it. It's a living document.",
      },
      {
        type: "text",
        body: "The playbook has three main parts: 1. Early warning signs—how you know anxiety is starting. 2. Go-to tools—what helps you regulate. 3. Personal language—what you say to yourself that helps.",
      },
      {
        type: "tip",
        body: "Playbook parts = Early warning signs + Go-to tools + Personal language that works for you.",
      },
      {
        type: "text",
        body: "Having a playbook builds confidence. You know you have a plan. You know what to do. You're not caught off guard. You're prepared.",
      },
      {
        type: "text",
        body: "Remember: Your playbook is yours. It's based on your experience, your patterns, your tools, your language. It's what works for you.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Identifying Your Early Warning Signs
   *
   * Format: Card lesson
   * Focus: Learning to identify personal early warning signs of anxiety
   */
  personal_playbook_early_warning: {
    id: "personal_playbook_early_warning",
    moduleId: "personal_playbook",
    title: "Identifying Your Early Warning Signs",
    goal: "Learn to identify your personal early warning signs of anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Early warning signs are the subtle signals that anxiety is starting. They're the first hints, before anxiety gets intense. Catching them early makes everything easier.",
      },
      {
        type: "text",
        body: "Early warning signs can be physical: Tightness in your chest. Shallow breathing. Muscle tension. Restlessness. Stomach discomfort. Headache. Fatigue.",
      },
      {
        type: "tip",
        body: "Physical early warning signs = Tight chest, shallow breath, tension, restlessness, stomach discomfort, headache, fatigue.",
      },
      {
        type: "text",
        body: "Early warning signs can be mental: Racing thoughts. Difficulty concentrating. Catastrophic thinking. Irritability. Feeling overwhelmed. Mental fog.",
      },
      {
        type: "text",
        body: "Early warning signs can be behavioral: Wanting to avoid things. Checking behaviors. Seeking reassurance. Procrastination. Restlessness. Difficulty sleeping.",
      },
      {
        type: "tip",
        body: "Mental/behavioral early warning signs = Racing thoughts, irritability, avoidance urges, checking, reassurance seeking.",
      },
      {
        type: "text",
        body: "Your early warning signs are unique to you. Maybe you always get a tight chest first. Maybe you notice irritability. Maybe you start avoiding things. Pay attention to your patterns.",
      },
      {
        type: "text",
        body: "To identify your early warning signs, look back at times when anxiety escalated. What did you notice first? What was the earliest signal? That's your early warning sign.",
      },
      {
        type: "tip",
        body: "Identify early warning signs = Look back at anxiety episodes. What did you notice first? That's your early warning sign.",
      },
      {
        type: "text",
        body: "The earlier you catch anxiety, the easier it is to manage. If you catch it at the early warning stage, you can use simple tools. If you wait until it's intense, it's much harder.",
      },
      {
        type: "text",
        body: "Practice noticing your early warning signs. Check in with yourself throughout the day. What do you notice? What's your body telling you? What's your mind doing?",
      },
      {
        type: "tip",
        body: "Practice noticing = Check in throughout the day. Notice physical, mental, behavioral signals. Catch anxiety early.",
      },
      {
        type: "text",
        body: "Remember: Early warning signs are your friends. They're giving you information. When you notice them, you can respond skillfully before anxiety escalates.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Building Your Go-To Tools
   *
   * Format: Practice lesson
   * Focus: Identifying and practicing your personal go-to tools
   */
  personal_playbook_go_to_tools: {
    id: "personal_playbook_go_to_tools",
    moduleId: "personal_playbook",
    title: "Building Your Go-To Tools",
    goal: "Identify and practice your personal go-to tools for managing anxiety",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's build your go-to tools. These are the tools that work best for you—the ones you can rely on when anxiety shows up.",
      },
      {
        t: "instruction",
        body: "First, think about body-first regulation tools. What helps you regulate physically? Deep breathing? Movement? Temperature change? Grounding? What works for you?",
      },
      { t: "timer", seconds: 45, label: "Identify body-first tools" },
      {
        t: "instruction",
        body: "Now, let's practice one of your body-first tools. Choose one and practice it right now, even if you're not anxious. This builds the habit.",
      },
      { t: "timer", seconds: 60, label: "Practice a body-first tool" },
      {
        t: "instruction",
        body: "Next, think about attention skills. What helps you shift attention skillfully? Grounding techniques? Mindfulness? Focused activities? What works for you?",
      },
      { t: "timer", seconds: 45, label: "Identify attention skills" },
      {
        t: "instruction",
        body: "Now, think about emotion surfing. How do you ride out intense emotions? What helps you remember that feelings peak and fall? What works for you?",
      },
      { t: "timer", seconds: 45, label: "Identify emotion surfing tools" },
      {
        t: "instruction",
        body: "Think about your personal language. What do you say to yourself that helps? What reminders work? What phrases calm you? What works for you?",
      },
      { t: "timer", seconds: 45, label: "Identify helpful personal language" },
      {
        t: "instruction",
        body: "Now, let's create your go-to tool sequence. When you notice an early warning sign, what's your first tool? Your second? Your third? Build a sequence that works for you.",
      },
      { t: "timer", seconds: 60, label: "Build your tool sequence" },
      {
        t: "instruction",
        body: "Remember: Your go-to tools are the ones that work for you. They don't have to be fancy. They just have to help. Keep practicing them so they're ready when you need them.",
      },
      {
        t: "instruction",
        body: "The more you practice your go-to tools, the easier they become. They become automatic. When anxiety shows up, you don't have to think—you just use your tools.",
      },
      {
        t: "check",
        prompt: "I have identified my go-to tools and can use them when anxiety shows up.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Finding Your Personal Language
   *
   * Format: Card lesson
   * Focus: Learning to develop personal language that helps
   */
  personal_playbook_personal_language: {
    id: "personal_playbook_personal_language",
    moduleId: "personal_playbook",
    title: "Finding Your Personal Language",
    goal: "Learn to develop personal language that helps you manage anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Personal language is what you say to yourself that helps. It's your inner dialogue—the words, phrases, and reminders that calm you, ground you, and help you respond skillfully.",
      },
      {
        type: "text",
        body: "Personal language is different for everyone. What works for someone else might not work for you. You need to find language that resonates with you, that feels true, that helps.",
      },
      {
        type: "tip",
        body: "Personal language = What you say to yourself that helps. It's unique to you—find what resonates.",
      },
      {
        type: "text",
        body: "Helpful personal language is: Compassionate but not coddling. Realistic but not catastrophic. Grounding but not dismissive. It acknowledges difficulty without amplifying it.",
      },
      {
        type: "text",
        body: "Examples of helpful language: 'This is temporary. I can handle it.' 'I've handled this before. I can handle it again.' 'This is anxiety, not danger.' 'I can feel this and still take action.'",
      },
      {
        type: "tip",
        body: "Helpful language = Compassionate, realistic, grounding. Acknowledges difficulty without amplifying it.",
      },
      {
        type: "text",
        body: "Some language patterns may amplify anxiety: 'This is terrible.' 'I can't handle this.' 'This will never end.' 'I'm broken.' For many people, this type of language can make anxiety feel worse.",
      },
      {
        type: "text",
        body: "To find your personal language, notice what helps. When you're anxious, what do you say to yourself that calms you? What phrases feel true? What reminders work?",
      },
      {
        type: "tip",
        body: "Find your language = Notice what helps. What phrases calm you? What feels true? What works?",
      },
      {
        type: "text",
        body: "You can also borrow language from lessons that resonated with you. If a phrase from a lesson helped, use it. Make it yours. Adapt it to your voice.",
      },
      {
        type: "text",
        body: "Practice your personal language regularly. Say it to yourself when you're not anxious, so it's ready when you are. The more you practice, the more automatic it becomes.",
      },
      {
        type: "tip",
        body: "Practice your language = Say it regularly, even when not anxious. Make it automatic so it's ready when you need it.",
      },
      {
        type: "text",
        body: "Remember: Your personal language is yours. It doesn't have to be perfect. It just has to help. Find what works for you and use it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Creating Your Personal Playbook
   *
   * Format: Builder lesson
   * Focus: Create your personal playbook with early warning signs, tools, and language
   */
  personal_playbook_create: {
    id: "personal_playbook_create",
    moduleId: "personal_playbook",
    title: "Creating Your Personal Playbook",
    goal: "Create your personal playbook with early warning signs, tools, and language",
    format: "builder",
    sections: [
      {
        title: "My Early Warning Signs",
        items: [
          {
            label:
              "Physical early warning signs (e.g., tight chest, shallow breathing, muscle tension)",
            kind: "check",
          },
          {
            label: "Mental early warning signs (e.g., racing thoughts, irritability, mental fog)",
            kind: "check",
          },
          {
            label:
              "Behavioral early warning signs (e.g., avoidance urges, checking, reassurance seeking)",
            kind: "check",
          },
          {
            label: "My most common early warning sign",
            kind: "shortText",
            inputId: "most_common_warning",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Go-To Tools",
        items: [
          {
            label:
              "Body-first regulation tools (e.g., deep breathing, movement, temperature, grounding)",
            kind: "check",
          },
          {
            label: "Attention skills (e.g., grounding techniques, mindfulness, focused activities)",
            kind: "check",
          },
          {
            label:
              "Emotion surfing tools (e.g., riding it out, remembering feelings peak and fall)",
            kind: "check",
          },
          {
            label: "My first go-to tool (when I notice an early warning sign)",
            kind: "shortText",
            inputId: "first_tool",
          },
          {
            label: "My second go-to tool (if the first doesn't help enough)",
            kind: "shortText",
            inputId: "second_tool",
          },
          {
            label: "My third go-to tool (if I need more support)",
            kind: "shortText",
            inputId: "third_tool",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Personal Language",
        items: [
          {
            label: "Reminder phrases that help (e.g., 'This is temporary, I can handle it')",
            kind: "check",
          },
          {
            label: "Compassionate self-talk that works",
            kind: "check",
          },
          {
            label: "Grounding phrases that calm me",
            kind: "check",
          },
          {
            label: "My most helpful personal phrase or reminder",
            kind: "shortText",
            inputId: "most_helpful_phrase",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Playbook Sequence",
        items: [
          {
            label: "When I notice an early warning sign, I will:",
            kind: "shortText",
            inputId: "warning_response",
          },
          {
            label: "If anxiety escalates, I will:",
            kind: "shortText",
            inputId: "escalation_response",
          },
          {
            label: "My reminder to use my playbook:",
            kind: "shortText",
            inputId: "playbook_reminder",
          },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
}
