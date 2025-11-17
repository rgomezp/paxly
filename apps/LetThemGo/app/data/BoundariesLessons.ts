import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Boundaries module lessons
 */
export const BOUNDARIES_LESSONS: Record<string, ILessonConfig> = {
  w4_standards_inv: {
    id: "w4_standards_inv",
    moduleId: "boundaries",
    title: "Standards Inventory",
    goal: "Define personal standards",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "musts",
        kind: "longText",
        label:
          "Non-negotiables (What are your deal-breakers? What will you absolutely not tolerate? Examples: disrespect, dishonesty, abuse, addiction, infidelity. These are your hard boundaries—they're not up for negotiation)",
      },
      {
        name: "nice",
        kind: "longText",
        label:
          "Nice-to-haves (What would you prefer but can live without? Examples: shared hobbies, similar values, good communication. These are preferences, not requirements. Knowing the difference protects you from settling)",
      },
    ],
    commitment: { text: "Finish" },
  },
  w4_red_green_flags: {
    id: "w4_red_green_flags",
    moduleId: "boundaries",
    title: "Red/Green Flags",
    goal: "Operationalize patterns",
    estMinutes: 6,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Green flags indicate healthy relationship potential: consistent behavior, curiosity about you, accountability for mistakes, respect for boundaries, emotional availability, and conflict resolution skills.",
      },
      {
        type: "text",
        body: "Red flags indicate potential problems: hot-cold behavior, secrecy, contempt or disrespect, boundary violations, emotional unavailability, blame-shifting, and patterns of manipulation.",
      },
      {
        type: "text",
        body: "The key is to look at patterns, not isolated incidents. One bad day isn't a red flag. A pattern of behavior is. Trust your observations—if you notice a pattern, it's data.",
      },
      {
        type: "tip",
        body: "Treat patterns as data, not destiny. You're not predicting the future—you're observing what's actually happening. Use this information to make informed decisions about boundaries and engagement.",
      },
      {
        type: "text",
        body: "Create your own flag list based on your values and experiences. What behaviors feel safe to you? What behaviors feel unsafe? This becomes your early warning system.",
      },
    ],
    commitment: { text: "Finish" },
  },
  w5_boundary_scripts: {
    id: "w5_boundary_scripts",
    moduleId: "boundaries",
    title: "Boundary Scripts",
    goal: "Practice scripts for calls/text/IRL",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "script",
        kind: "longText",
        label:
          "Write a script you'll rehearse (Keep it brief, clear, and firm. Example: 'I need you to stop contacting me. I'll reach out if I want to talk.' No explanations needed. Practice makes it easier to say when you're activated)",
      },
      {
        name: "channel",
        kind: "radio",
        label:
          "Channel (Which method will you use? Text is safest for first attempts—it gives you time to think and prevents emotional escalation)",
        options: ["text", "call", "in person"],
      },
    ],
    commitment: { text: "Finish" },
  },
  w5_items_exchange: {
    id: "w5_items_exchange",
    moduleId: "boundaries",
    title: "Item Exchange Plan",
    goal: "Low-drama logistics",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Plan: Minimize emotional activation (Item exchanges can trigger attachment activation. Having a clear plan reduces decision-making in the moment. Keep it brief, neutral, and structured)",
        items: [
          { label: "Neutral location", kind: "shortText" },
          { label: "Date/time", kind: "datetime" },
          { label: "No small talk rule", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  w5_coparent_mode: {
    id: "w5_coparent_mode",
    moduleId: "boundaries",
    title: "Co-Parenting Mode",
    goal: "Low-conflict communication",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "topic",
        kind: "shortText",
        label:
          "Topic (What do you need to communicate? Keep it to logistics only—no emotional topics)",
      },
      {
        name: "biff",
        kind: "longText",
        label:
          "BIFF message (Brief, Informative, Friendly, Firm) - Brief: Keep it short. Informative: Just the facts. Friendly: Neutral, not hostile. Firm: Clear about what you need. Example: 'I can drop off the items Tuesday at 3pm at the coffee shop. Let me know if that works.'",
      },
    ],
    commitment: { text: "Finish" },
  },
  boundaries_assertiveness_practice: {
    id: "boundaries_assertiveness_practice",
    moduleId: "boundaries",
    title: "Assertiveness Practice",
    goal: "Practice saying no and setting limits",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "situation",
        kind: "longText",
        label:
          "A situation where you need to set a boundary (Be specific: What's happening? What do you need to say no to? What limit do you need to set?)",
      },
      {
        name: "response",
        kind: "longText",
        label:
          "How you'll assert your boundary (Write exactly what you'll say. Keep it brief and clear. Example: 'I can't do that.' 'I need you to stop.' 'That doesn't work for me.' No need to explain or justify)",
      },
    ],
    commitment: { text: "Finish" },
  },
  boundaries_emotional_boundaries: {
    id: "boundaries_emotional_boundaries",
    moduleId: "boundaries",
    title: "Emotional Boundaries",
    goal: "Protect your emotional energy",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Emotional boundaries protect your feelings and energy. They define what emotional labor you're willing to do and what you're not responsible for.",
      },
      {
        type: "text",
        body: "You don't have to absorb others' emotions, fix their problems, or manage their feelings. You can be compassionate without taking on their emotional burden.",
      },
      {
        type: "text",
        body: "Examples of emotional boundaries: 'I can listen, but I can't solve this for you.' 'I need to step back from this conversation.' 'I can't be your only support system.'",
      },
      {
        type: "tip",
        body: "Setting emotional boundaries isn't selfish—it's necessary. You can't pour from an empty cup. Protecting your energy allows you to show up better for yourself and others.",
      },
      {
        type: "text",
        body: "After a breakup, you might feel responsible for their feelings. You're not. Their emotions are their responsibility, just as yours are yours.",
      },
    ],
    commitment: { text: "Finish" },
  },
  boundaries_time_boundaries: {
    id: "boundaries_time_boundaries",
    moduleId: "boundaries",
    title: "Time Boundaries",
    goal: "Protect your time and energy",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Time limits: Protect your schedule (Time boundaries prevent others from monopolizing your time or expecting immediate responses. They signal: 'My time is valuable, and I decide how to use it')",
        items: [
          { label: "Set response time limits", kind: "check" },
          { label: "Schedule protected time", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  boundaries_physical_boundaries: {
    id: "boundaries_physical_boundaries",
    moduleId: "boundaries",
    title: "Physical Boundaries",
    goal: "Define your physical space needs",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "needs",
        kind: "longText",
        label:
          "What physical boundaries do you need? (Examples: no physical contact, no unannounced visits, maintaining distance, not sharing space. What feels safe and comfortable for you?)",
      },
      {
        name: "communicate",
        kind: "longText",
        label:
          "How will you communicate them? (Be clear and direct. Example: 'I need space. Please don't come to my home unannounced.' You don't need to explain why—just state what you need)",
      },
    ],
    commitment: { text: "Finish" },
  },
  boundaries_self_respect: {
    id: "boundaries_self_respect",
    moduleId: "boundaries",
    title: "Boundaries as Self-Respect",
    goal: "See boundaries as self-care",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Setting boundaries is an act of self-respect, not rejection. When you set a boundary, you're saying: 'I matter. My needs matter. I'm worth protecting.'",
      },
      {
        type: "text",
        body: "Many people fear boundaries will push others away. But healthy boundaries actually create healthier relationships. They create clarity, respect, and safety. People who respect your boundaries are people worth keeping around.",
      },
      {
        type: "text",
        body: "If someone reacts poorly to your boundaries, that's information. It tells you they don't respect your needs. That's not a reason to remove the boundary—it's a reason to enforce it more firmly.",
      },
      {
        type: "tip",
        body: "Boundaries aren't walls—they're gates. You decide who gets access and under what conditions. This is self-care, not selfishness.",
      },
      {
        type: "text",
        body: "After a breakup, boundaries protect your healing. They create space for you to recover without being pulled back into old patterns. This is one of the most important acts of self-respect you can practice.",
      },
    ],
    commitment: { text: "Finish" },
  },
}
