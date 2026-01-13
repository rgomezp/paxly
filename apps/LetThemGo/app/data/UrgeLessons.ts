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
    commitment: { text: "Finish" },
  },
  urge_grounding_54321: {
    id: "urge_grounding_54321",
    moduleId: "mini_interventions",
    title: "5-4-3-2-1 Grounding",
    goal: "Anchor yourself in the present moment",
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
    commitment: { text: "Finish" },
  },
  urge_breath_box: {
    id: "urge_breath_box",
    moduleId: "mini_interventions",
    title: "Box Breathing for Urges",
    goal: "Calm your nervous system",
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
    commitment: { text: "Finish" },
  },
  urge_reminder_why: {
    id: "urge_reminder_why",
    moduleId: "mini_interventions",
    title: "Why No Contact Matters",
    goal: "Reconnect with your reasons",
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
    commitment: { text: "Finish" },
  },
  urge_distraction_redirect: {
    id: "urge_distraction_redirect",
    moduleId: "mini_interventions",
    title: "Redirect Your Energy",
    goal: "Channel the urge into something else",
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
    ],
    commitment: { text: "Finish" },
  },
  urge_body_scan: {
    id: "urge_body_scan",
    moduleId: "mini_interventions",
    title: "Body Scan for Urges",
    goal: "Observe without acting",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Urges don't just exist in your mind—they live in your body. When you want to contact them, you feel it physically: tightness, restlessness, a pull. Learning to observe these sensations without acting on them is a crucial skill.",
      },
      {
        t: "instruction",
        body: "This practice is called 'urge surfing'—you're riding the wave of the urge without being swept away by it. Urges are temporary. They peak and then subside, usually within 20-30 minutes if you don't act on them.",
      },
      {
        t: "instruction",
        body: "Let's start by bringing awareness to your body. Close your eyes or soften your gaze. Take a breath. Now, scan your body from head to toe.",
      },
      { t: "timer", seconds: 20, label: "Scan from head to toe" },
      {
        t: "instruction",
        body: "Where do you feel the urge most strongly? Common places:\n\n• Chest (tightness, pressure)\n• Stomach (churning, butterflies)\n• Throat (constriction, lump)\n• Hands (restlessness, urge to reach for phone)\n• Jaw (clenching)\n\nJust notice without trying to change it.",
      },
      { t: "timer", seconds: 30, label: "Locate where you feel it" },
      {
        t: "textInput",
        prompt: "Where do you feel the urge? (Be specific)",
        placeholder: "e.g., 'tight chest and restless hands'",
      },
      {
        t: "instruction",
        body: "Now, describe the sensation without judgment. Is it tight? Hot? Cold? Restless? Pulsing? Dull? Sharp? Just observe it like a scientist studying a phenomenon.",
      },
      { t: "timer", seconds: 30, label: "Describe the sensation" },
      {
        t: "textInput",
        prompt: "What does it feel like? (Describe the physical sensation)",
        placeholder: "e.g., 'tight and hot'",
      },
      {
        t: "instruction",
        body: "Now, breathe into that space. Imagine your breath traveling to that area. You're not trying to make it go away—you're just bringing awareness and maybe a little space.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Notice: Did the sensation shift at all? Even slightly? Sometimes it intensifies before it subsides. That's normal. You're observing it, not being controlled by it.",
      },
      { t: "timer", seconds: 30, label: "Notice any shifts" },
      {
        t: "instruction",
        body: "The key insight: The urge is a sensation in your body. It's not a command. You can feel it without acting on it. You're bigger than the urge.",
      },
      {
        t: "instruction",
        body: "If the urge is still strong, that's okay. Urges are temporary. They peak and then subside. Your job is to ride it out, not eliminate it.",
      },
      {
        t: "check",
        prompt: "I can observe urges in my body without being controlled by them",
      },
    ],
    commitment: { text: "Finish" },
  },
  urge_cognitive_reframe: {
    id: "urge_cognitive_reframe",
    moduleId: "cognitive_aid",
    title: "Reframe the Urge",
    goal: "Shift your perspective",
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
    commitment: { text: "Finish" },
  },
  urge_unsent_letter: {
    id: "urge_unsent_letter",
    moduleId: "mini_interventions",
    title: "Express Without Sending",
    goal: "Process your feelings",
    format: "card",
    cards: [
      {
        type: "text",
        body: "You have things you want to say. That's valid. But you don't need to send them.",
      },
      {
        type: "tip",
        body: "The act of expressing—even if only to yourself—can help release the pressure of the urge.",
      },
      {
        type: "text",
        body: "Consider writing it down privately, or just saying it out loud to yourself. You don't need their response to process your feelings.",
      },
      {
        type: "tip",
        body: "Consider using the 'Send to the Void' feature to process your feelings.",
      },
      {
        type: "text",
        body: "Your feelings are real, and you can honor them without breaking no contact.",
      },
    ],
    commitment: { text: "Finish" },
  },
  urge_commitment_renewal: {
    id: "urge_commitment_renewal",
    moduleId: "mini_interventions",
    title: "Renew Your Commitment",
    goal: "Reaffirm your choice",
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
    commitment: { text: "Finish" },
  },
  urge_quick_reset: {
    id: "urge_quick_reset",
    moduleId: "mini_interventions",
    title: "60-Second Reset",
    goal: "Quick intervention for strong urges",
    format: "practice",
    steps: [
      { t: "instruction", body: "Stop. Take a breath. You don't need to act right now." },
      { t: "breath", pattern: "4-7-8", rounds: 1 },
      { t: "instruction", body: "Change your environment. Stand up. Move to another room." },
      { t: "timer", seconds: 30, label: "Move" },
      { t: "instruction", body: "The urge is intense, but temporary. You can wait." },
      { t: "timer", seconds: 30, label: "Wait" },
    ],
    commitment: { text: "Finish" },
  },
  urge_future_self: {
    id: "urge_future_self",
    moduleId: "mini_interventions",
    title: "Talk to Future You",
    goal: "Gain perspective from your future self",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Imagine yourself 3 months from now, looking back at this moment.",
      },
      {
        t: "instruction",
        body: "What would that version of you—who has stayed strong—want to tell you right now?",
      },
      { t: "timer", seconds: 45, label: "Listen to future you" },
      {
        t: "instruction",
        body: "Now imagine if you contact them. How does future you feel about that choice?",
      },
      { t: "timer", seconds: 45, label: "Consider the outcome" },
      {
        t: "check",
        prompt: "I choose the path my future self will thank me for",
      },
      {
        t: "instruction",
        body: "Every time you resist, you're becoming that stronger future version of yourself.",
      },
    ],
    commitment: { text: "Finish" },
  },

  urge_worst_best_case: {
    id: "urge_worst_best_case",
    moduleId: "cognitive_aid",
    title: "Reality Check",
    goal: "Examine what contact actually means",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Your brain is creating a fantasy about what will happen if you reach out. Let's reality-check that.",
      },
      {
        type: "tip",
        body: "Best case scenario: They respond positively. Then what? Does it change why you broke up? Does it heal the hurt? Or does it just restart the cycle?",
      },
      {
        type: "text",
        body: "Worst case scenario: They don't respond, or they respond in a way that hurts. You've just set your healing back weeks.",
      },
      {
        type: "tip",
        body: "Most likely scenario: Brief relief followed by confusion, mixed signals, or reopened wounds.",
      },
      {
        type: "text",
        body: "The only guaranteed outcome is breaking your streak and disrupting your healing. Is that worth it?",
      },
    ],
    commitment: { text: "Finish" },
  },

  urge_ice_water: {
    id: "urge_ice_water",
    moduleId: "mini_interventions",
    title: "Cold Water Reset",
    goal: "Use temperature to interrupt the urge",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Strong urges activate your fight-or-flight response. Cold water can interrupt this.",
      },
      {
        t: "instruction",
        body: "Go splash cold water on your face, hold ice cubes, or run cold water on your wrists.",
      },
      { t: "timer", seconds: 60, label: "Use cold water" },
      {
        t: "instruction",
        body: "Notice how the intense physical sensation shifts your focus. The urge loses its grip.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Your nervous system is resetting. The urge is just a signal from your body—not a command you must obey.",
      },
    ],
    commitment: { text: "Finish" },
  },

  urge_evidence_against: {
    id: "urge_evidence_against",
    moduleId: "cognitive_aid",
    title: "Remember Why You're Here",
    goal: "Recall the evidence for no contact",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Your brain is romanticizing them right now. Let's remember reality.",
      },
      {
        t: "instruction",
        body: "Think of three specific moments that showed you why this relationship needed to end.",
      },
      { t: "timer", seconds: 60, label: "Remember the truth" },
      {
        t: "instruction",
        body: "Think of three ways your life has improved—even slightly—since starting no contact.",
      },
      { t: "timer", seconds: 60, label: "Notice your progress" },
      {
        t: "check",
        prompt: "The relationship ended for real reasons. No contact protects me.",
      },
      {
        t: "instruction",
        body: "Contact won't erase those reasons. It will only confuse them.",
      },
    ],
    commitment: { text: "Finish" },
  },

  urge_compassionate_boundary: {
    id: "urge_compassionate_boundary",
    moduleId: "mini_interventions",
    title: "Boundary with Self-Compassion",
    goal: "Hold the boundary while being kind to yourself",
    format: "card",
    cards: [
      {
        type: "text",
        body: "It's okay to want to reach out. That desire doesn't make you weak. It makes you human.",
      },
      {
        type: "tip",
        body: "But wanting to do something and actually doing it are two different choices. You can feel the pull without following it.",
      },
      {
        type: "text",
        body: "Say to yourself: 'I see this urge. I understand it. And I'm choosing not to act on it because I care about my future.'",
      },
      {
        type: "tip",
        body: "No contact isn't about punishing yourself or them. It's about creating space for real healing.",
      },
      {
        type: "text",
        body: "You can hold this boundary firmly AND hold yourself with compassion. Both are acts of love.",
      },
    ],
    commitment: { text: "Finish" },
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
  "urge_future_self",
  "urge_worst_best_case",
  "urge_ice_water",
  "urge_evidence_against",
  "urge_compassionate_boundary",
]
