import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Urge lesson definitions for handling urges to contact.
 * These are quick interventions users can access when experiencing strong urges.
 */
export const URGE_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  mini_wait_90: {
    id: "mini_wait_90",
    moduleId: "mini_interventions",
    title: "Wait 90 Seconds",
    goal: "Create space before acting",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "instruction", body: "It's normal to feel this way..." },
      { t: "instruction", body: "Urges rise, peak, and pass." },
      {
        t: "instruction",
        body: "Close your eyes and track where you feel the urge in your body. Breathe into it in the next step.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      { t: "instruction", body: "Go into another room. Changing your environment can help." },
      { t: "instruction", body: "Let's wait 90 seconds to let the urge pass." },
      { t: "timer", seconds: 90, label: "Urge peaks then falls" },
    ],
    commitment: { text: "Run timer >6/10" },
  },
  urge_grounding_54321: {
    id: "urge_grounding_54321",
    moduleId: "mini_interventions",
    title: "5-4-3-2-1 Grounding",
    goal: "Anchor yourself in the present moment",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "instruction", body: "When urges hit, grounding helps. Let's use your senses." },
      { t: "instruction", body: "Name 5 things you can see around you." },
      { t: "timer", seconds: 30, label: "Notice 5 things" },
      { t: "instruction", body: "Name 4 things you can touch or feel." },
      { t: "timer", seconds: 30, label: "Notice 4 things" },
      { t: "instruction", body: "Name 3 things you can hear." },
      { t: "timer", seconds: 30, label: "Notice 3 things" },
      { t: "instruction", body: "Name 2 things you can smell." },
      { t: "timer", seconds: 20, label: "Notice 2 things" },
      { t: "instruction", body: "Name 1 thing you can taste or one thing you're grateful for." },
      { t: "timer", seconds: 20, label: "Notice 1 thing" },
      {
        t: "instruction",
        body: "Notice how the urge feels now. It's still there, but you're present with it.",
      },
    ],
    commitment: { text: "Use when >5/10" },
  },
  urge_breath_box: {
    id: "urge_breath_box",
    moduleId: "mini_interventions",
    title: "Box Breathing for Urges",
    goal: "Calm your nervous system",
    estMinutes: 4,
    format: "practice",
    steps: [
      { t: "instruction", body: "Box breathing helps regulate your body's stress response." },
      {
        t: "instruction",
        body: "Breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat.",
      },
      { t: "breath", pattern: "box", rounds: 4 },
      { t: "instruction", body: "Notice any shift in the urge. It may feel less urgent." },
      { t: "instruction", body: "Remember: this feeling will pass. You've got this." },
    ],
    commitment: { text: "3 rounds daily" },
  },
  urge_reminder_why: {
    id: "urge_reminder_why",
    moduleId: "mini_interventions",
    title: "Why No Contact Matters",
    goal: "Reconnect with your reasons",
    estMinutes: 3,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Right now, your brain is trying to solve a problem by contacting them. But contact won't solve what you're really seeking.",
      },
      {
        type: "tip",
        body: "Every time you resist the urge, you're rewiring your brain. You're building new pathways.",
      },
      {
        type: "text",
        body: "The urge is temporary. Your commitment to yourself is permanent.",
      },
      {
        type: "tip",
        body: "What you're feeling right now is valid. And you don't need to act on it.",
      },
    ],
    commitment: { text: "Read when hits" },
  },
  urge_distraction_redirect: {
    id: "urge_distraction_redirect",
    moduleId: "mini_interventions",
    title: "Redirect Your Energy",
    goal: "Channel the urge into something else",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "instruction", body: "That energy wanting to contact them? Let's redirect it." },
      { t: "instruction", body: "Pick ONE thing to do right now:" },
      {
        t: "instruction",
        body: `• Text a friend\n• Do 10 push-ups\n• Organize one drawer\n• Write in your journal\n• Take a walk outside\n• Do some gentle yoga\n
        Do this for 3 minutes.`,
      },
      { t: "timer", seconds: 180, label: "Do something else" },
      { t: "instruction", body: "Check in: How does the urge feel now?" },
      {
        t: "textInput",
        prompt: "Name one way you feel different after redirecting.",
      },
    ],
    commitment: { text: "Redirect" },
  },
  urge_body_scan: {
    id: "urge_body_scan",
    moduleId: "mini_interventions",
    title: "Body Scan for Urges",
    goal: "Observe without acting",
    estMinutes: 4,
    format: "practice",
    steps: [
      { t: "instruction", body: "Close your eyes. Notice where you feel the urge in your body." },
      { t: "instruction", body: "Is it in your chest? Your stomach? Your hands?" },
      { t: "timer", seconds: 30, label: "Scan your body" },
      {
        t: "instruction",
        body: "Describe the sensation without judgment. Is it tight? Hot? Restless?",
      },
      { t: "timer", seconds: 30, label: "Describe it" },
      { t: "instruction", body: "Breathe into that space. Notice how it shifts, even slightly." },
      { t: "breath", pattern: "physiological", rounds: 3 },
      { t: "instruction", body: "You're observing the urge, not being controlled by it." },
    ],
    commitment: { text: "Body awareness" },
  },
  urge_cognitive_reframe: {
    id: "urge_cognitive_reframe",
    moduleId: "cognitive_aid",
    title: "Reframe the Urge",
    goal: "Shift your perspective",
    estMinutes: 3,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Your brain is trying to solve loneliness, uncertainty, or pain by contacting them. But contact won't solve those deeper needs.",
      },
      {
        type: "tip",
        body: "The urge is a signal, not a command. You can acknowledge it without following it.",
      },
      {
        type: "text",
        body: "What you're really seeking—connection, validation, answers—won't come from breaking no contact.",
      },
      {
        type: "tip",
        body: "Right now, choose yourself. Choose the person you're becoming.",
      },
    ],
    commitment: { text: "Reframe" },
  },
  urge_unsent_letter: {
    id: "urge_unsent_letter",
    moduleId: "mini_interventions",
    title: "Write an Unsent Text",
    goal: "Express without sending",
    estMinutes: 5,
    format: "journal",
    template: "unsent_letter",
    fields: [
      {
        name: "letter",
        kind: "longText",
        label: "Write everything you want to say. This won't be sent.",
        minWords: 50,
      },
    ],
    commitment: { text: "Write only" },
  },
  urge_commitment_renewal: {
    id: "urge_commitment_renewal",
    moduleId: "mini_interventions",
    title: "Renew Your Commitment",
    goal: "Reaffirm your choice",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "instruction", body: "Take a deep breath. Remember why you chose no contact." },
      { t: "breath", pattern: "physiological", rounds: 1 },
      {
        t: "instruction",
        body: "You made this choice for yourself. For your healing. For your future.",
      },
      {
        t: "check",
        prompt: `Say to yourself: "I choose me. I choose my healing."`,
      },
      {
        t: "instruction",
        body: "This urge doesn't change your commitment. It's just a wave that will pass.",
      },
      { t: "timer", seconds: 60, label: "Breathe and commit" },
    ],
    commitment: { text: "Renew" },
  },
  urge_quick_reset: {
    id: "urge_quick_reset",
    moduleId: "mini_interventions",
    title: "60-Second Reset",
    goal: "Quick intervention for strong urges",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "instruction", body: "Stop. Take a breath. You don't need to act right now." },
      { t: "breath", pattern: "4-7-8", rounds: 1 },
      { t: "instruction", body: "Change your environment. Stand up. Move to another room." },
      { t: "timer", seconds: 30, label: "Move" },
      { t: "instruction", body: "The urge is intense, but temporary. You can wait." },
      { t: "timer", seconds: 30, label: "Wait" },
    ],
    commitment: { text: "Use when urgent" },
  },
}

/**
 * Registry of lesson IDs for urge interventions
 */
export const URGE_LESSONS: string[] = [
  "mini_wait_90",
  "urge_grounding_54321",
  "urge_breath_box",
  "urge_reminder_why",
  "urge_distraction_redirect",
  "urge_body_scan",
  "urge_cognitive_reframe",
  "urge_unsent_letter",
  "urge_commitment_renewal",
  "urge_quick_reset",
]
