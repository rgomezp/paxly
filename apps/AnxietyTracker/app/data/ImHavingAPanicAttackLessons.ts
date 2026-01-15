import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * I'm Having a Panic Attack lesson definitions.
 *
 * These are short, science-backed interventions for acute panic,
 * blending:
 * - CBT (panic cycle education, realistic reappraisal)
 * - ACT (willingness/acceptance + values-based action)
 * - DBT-style distress-tolerance skills
 * - Physiology-first tools (breath, grounding, temperature, movement)
 *
 * They’re designed to be usable *in the middle* of an attack.
 */
export const IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. 90-Second Panic Anchor
   *
   * Focus: Immediate physiological downshift + normalization
   * Model: CBT psychoeducation + physiological sigh breathing
   */
  panic_anchor_90s: {
    id: "panic_anchor_90s",
    moduleId: "mini_interventions",
    title: "90-Second Panic Anchor",
    goal: "Ride out the first intense wave of panic",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "What you're feeling is a panic response: your body's alarm system firing. It's intense, but not dangerous. Panic always has a peak and then a drop.",
      },
      {
        t: "instruction",
        body:
          "For the next few breaths, we'll send your body a 'safety' signal using a physiological sigh: two inhales through the nose, then a long exhale through the mouth.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body:
          "Now just notice what's happening in your body: heart rate, chest, stomach, throat. You don't have to fix anything. You're watching a storm from the inside.",
      },
      { t: "timer", seconds: 30, label: "Stay with the sensations without fighting them" },
      {
        t: "check",
        prompt: "I can feel panic sensations without needing to make them disappear instantly.",
      },
      {
        t: "instruction",
        body:
          "Panic rises and falls like a wave. The fact that you are still here, breathing and observing, is proof that you are already riding it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Self‑Compassion in Panic
   *
   * Focus: Reduce secondary fear/shame about having panic
   * Model: Kristin Neff’s self‑compassion (kindness, common humanity, mindfulness)
   */
  panic_self_compassion: {
    id: "panic_self_compassion",
    moduleId: "mini_interventions",
    title: "Self‑Compassion in Panic",
    goal: "Soften self‑judgment during and after a panic spike",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Many people suffer not only from panic itself, but from judging themselves for having it. That second layer of shame keeps your nervous system on high alert.",
      },
      {
        t: "instruction",
        body:
          "Place one hand on your chest or another comforting place (arm, neck, cheek). This gentle pressure can activate your brain’s caregiving circuits.",
      },
      { t: "timer", seconds: 20, label: "Feel the warmth and weight of your hand" },
      {
        t: "instruction",
        body:
          "Silently name what’s happening: “This is a moment of panic. This is really hard.” You’re acknowledging reality without exaggerating or minimizing.",
      },
      { t: "timer", seconds: 20, label: "Repeat that phrase a few times" },
      {
        t: "instruction",
        body:
          "Now remind yourself: “Other people feel this too. I’m not the only one whose body does this.” Panic is a common human experience, not a personal failure.",
      },
      {
        t: "instruction",
        body:
          "Finally, offer yourself one kind sentence you would say to a good friend in the same situation.",
      },
      {
        t: "textInput",
        prompt: "What is one kind sentence you can offer yourself right now?",
        placeholder: "e.g., “I’m doing the best I can in a really hard moment.”",
      },
      {
        t: "check",
        prompt: "I can speak to myself with the same kindness I’d offer a friend.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Understand the Panic Cycle
   *
   * Focus: CBT psychoeducation (sensations → catastrophic thoughts → more panic)
   * Format: Card for quick reading during/after an episode.
   */
  panic_cycle_education: {
    id: "panic_cycle_education",
    moduleId: "mini_interventions",
    title: "Understand the Panic Cycle",
    goal: "Reduce fear of sensations by understanding what’s happening",
    format: "card",
    cards: [
      {
        type: "text",
        body:
          "Panic is your body’s alarm system going off when there is no real physical danger. It feels awful, but it is not dangerous.",
      },
      {
        type: "text",
        body:
          "The panic cycle usually looks like this: a sensation (racing heart, dizziness) → a catastrophic thought (“I’m dying”, “I’m losing control”) → more adrenaline → stronger sensations.",
      },
      {
        type: "tip",
        body:
          "Research shows it’s the interpretation (“this is dangerous”)—not the sensations themselves—that keeps panic going.",
      },
      {
        type: "text",
        body:
          "You don’t need to like the sensations. But if you can see them as your nervous system doing a false alarm, the cycle begins to weaken.",
      },
      {
        type: "tip",
        body:
          "Try this reframe: “My body is having a panic response. It’s intense and temporary, and my job is to ride it out.”",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Values Anchor in Panic
   *
   * Focus: ACT – connect to values so panic is one wave in a bigger ocean
   */
  panic_values_anchor: {
    id: "panic_values_anchor",
    moduleId: "mini_interventions",
    title: "Values Anchor",
    goal: "Remember what matters beyond this moment of panic",
    format: "journal",
    fields: [
      {
        name: "values",
        kind: "longText",
        label:
          "When panic hits, your world shrinks to one question: “How do I get rid of this?” Take a step back.\n\nWhat kind of person are you trying to become, even with anxiety in the picture? (e.g., present parent, curious learner, kind friend, brave creator)",
      },
      {
        name: "small_step",
        kind: "shortText",
        label:
          "What is one tiny action you could take today that is aligned with that value, even if anxiety shows up? (e.g., send one text, step outside for 2 minutes, do one small task)",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Body Reset for Panic
   *
   * Focus: Somatic regulation using movement, breath, and grounding
   * Model: Polyvagal / nervous-system informed practice
   */
  panic_body_reset: {
    id: "panic_body_reset",
    moduleId: "mini_interventions",
    title: "Body Reset for Panic",
    goal: "Signal safety to your nervous system through the body",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Panic lives in the body: tight chest, shaky hands, churning stomach. Before you argue with thoughts, help your body feel 5–10% safer.",
      },
      {
        t: "instruction",
        body:
          "If you’re able, stand or sit with your feet on the ground. Gently shake out your hands like you’re flicking off water.",
      },
      { t: "timer", seconds: 15, label: "Shake out your hands and arms" },
      {
        t: "instruction",
        body:
          "Roll your shoulders slowly—up toward your ears, back, and down. Let your jaw unclench if you can.",
      },
      { t: "timer", seconds: 20, label: "Roll your shoulders with slow breaths" },
      {
        t: "instruction",
        body:
          "Now place both feet firmly on the ground. Notice the pressure, temperature, and support beneath you. The floor is still there, holding you.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body:
          "You may still feel anxious—that’s okay. The goal isn’t zero panic; it’s a body that feels just safe enough for you to ride the wave.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 6. Map This Panic Episode
   *
   * Focus: CBT functional analysis of triggers and early warning signs
   */
  panic_map_episode: {
    id: "panic_map_episode",
    moduleId: "mini_interventions",
    title: "Map This Panic Episode",
    goal: "Understand what led into and out of this attack",
    format: "journal",
    fields: [
      {
        name: "before",
        kind: "longText",
        label:
          "Looking back 1–3 hours before the panic: Where were you? What were you doing? How was your sleep, food, and stress level?",
      },
      {
        name: "triggers",
        kind: "longText",
        label:
          "What might have triggered your body’s alarm? (e.g., caffeine, conflict, crowded place, worrying thoughts, physical sensations like dizziness)",
      },
      {
        name: "early_signs",
        kind: "longText",
        label:
          "What were the first early signs that anxiety was rising before it became full panic? (e.g., slight tightness, faster breathing, racing thoughts)",
      },
      {
        name: "helpful_responses",
        kind: "longText",
        label:
          "What, if anything, helped—even a little? This could be a breath, a phrase, a person, or a movement.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 7. Message From Calmer You
   *
   * Focus: Future‑self imagery to guide behavior during/after panic
   */
  panic_future_self: {
    id: "panic_future_self",
    moduleId: "mini_interventions",
    title: "Message From Calmer You",
    goal: "Borrow wisdom from a future, steadier version of you",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Imagine yourself 3 months from now. You might still get anxious sometimes, but panic doesn’t scare you the way it does today.",
      },
      {
        t: "instruction",
        body:
          "In the next step, picture where this future you is: at home, outside, at work. Notice how they move, breathe, and talk to themselves.",
      },
      { t: "timer", seconds: 45, label: "Visualize your future self in detail" },
      {
        t: "instruction",
        body:
          "Now imagine that this future you knows exactly how today felt. What would they want you to remember in the middle of panic?",
      },
      { t: "timer", seconds: 45, label: "Listen for their message" },
      {
        t: "textInput",
        prompt: "Write one sentence your future self is telling you.",
        placeholder: "e.g., “You’ve gotten through this before, and you will again.”",
      },
      {
        t: "check",
        prompt: "I can take one small action that my future self would thank me for.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 8. Count Panic Wins
   *
   * Focus: Build self‑efficacy by noticing what went right
   */
  panic_count_wins: {
    id: "panic_count_wins",
    moduleId: "mini_interventions",
    title: "Count Panic Wins",
    goal: "Notice evidence that you can handle panic",
    format: "journal",
    fields: [
      {
        name: "small_wins",
        kind: "longText",
        label:
          "Even in this episode, what are 2–3 things you did that helped, even a little? (e.g., stayed in the room, kept breathing, used grounding, asked for help)",
      },
      {
        name: "evidence",
        kind: "longText",
        label:
          "Looking back, what does this episode prove about you? Include at least one sentence that starts with “It shows that I…”",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 9. Allow the Wave
   *
   * Focus: DBT Radical Acceptance & ACT willingness
   */
  panic_allow_wave: {
    id: "panic_allow_wave",
    moduleId: "mini_interventions",
    title: "Allow the Wave",
    goal: "Stop fighting sensations so panic can pass",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Fighting panic (“this cannot be happening”) turns the volume up. Allowing it (“this is happening, and I can ride it”) gently turns the volume down.",
      },
      {
        t: "instruction",
        body:
          "For the next step, try this phrase: “This is a wave of panic. I don’t like it, and I’m willing to feel it.” You’re not approving—you’re acknowledging.",
      },
      { t: "timer", seconds: 30, label: "Repeat the phrase in your own words" },
      {
        t: "instruction",
        body:
          "Notice one place in your body where you feel the panic most. See if you can soften around it by 5%, like loosening a tight fist just a little.",
      },
      { t: "timer", seconds: 30, label: "Softening around, not pushing away" },
      {
        t: "check",
        prompt: "I can let this wave be here without liking it or agreeing with it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 10. My Panic Plan
   *
   * Focus: Simple, repeatable action plan you can remember in crisis
   * Model: Safety plan / implementation intentions
   */
  panic_personal_plan: {
    id: "panic_personal_plan",
    moduleId: "mini_interventions",
    title: "My Panic Plan",
    goal: "Create a 3-step plan you can reuse every time",
    format: "builder",
    sections: [
      {
        title: "Step 1: What I say to myself",
        items: [
          {
            label:
              "Write one short sentence you can repeat when panic hits (e.g., “This is a false alarm, I can ride it out.”)",
            kind: "shortText",
          },
        ],
      },
      {
        title: "Step 2: What I do with my body",
        items: [
          {
            label:
              "Choose one body strategy you’ll use first (e.g., 3 physiological sighs, grounding feet, shaking hands, cold water on face).",
            kind: "shortText",
          },
        ],
      },
      {
        title: "Step 3: Who/what I reach for if I need support",
        items: [
          {
            label:
              "Name one person, resource, or tool you can reach for if the panic feels too big to handle alone (e.g., friend, helpline, coping skills list).",
            kind: "shortText",
          },
        ],
      },
    ],
    commitment: { text: "Finish" },
  },
}

// Array of all panic lesson IDs for random selection
export const RELAPSE_LESSON_IDS = Object.keys(IM_HAVING_A_PANIC_ATTACK_LESSON_DEFINITIONS)


