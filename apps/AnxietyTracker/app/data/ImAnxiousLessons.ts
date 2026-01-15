import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * “I’m Anxious” lesson definitions.
 *
 * These are *short*, science-backed interventions for elevated anxiety,
 * not necessarily full panic. They blend:
 * - CBT (worry tools, realistic probability checks, thought records)
 * - ACT (willingness + values-based micro‑actions)
 * - DBT-style distress-tolerance skills
 * - Physiology-first tools (breath, grounding, movement, temperature)
 *
 * They are designed to be:
 * - usable in 1–5 minutes
 * - specific in what the user *does* in each step
 * - varied in format (practice, card, journal, builder)
 */
export const IM_ANXIOUS_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. 5‑4‑3‑2‑1 Senses Reset
   *
   * Focus: Grounding out of worry loops into the present.
   * Model: DBT/trauma grounding via multi-sensory awareness.
   */
  anxious_ground_54321: {
    id: "anxious_ground_54321",
    moduleId: "mini_interventions",
    title: "5‑4‑3‑2‑1 Senses Reset",
    goal: "Anchor in the present when anxiety spikes",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Anxiety pulls you into “what ifs.” Grounding pulls you back into “what is” by using your senses.",
      },
      {
        t: "instruction",
        body: "Start with sight. Slowly look around and name 5 things you can see.",
      },
      { t: "timer", seconds: 30, label: "Name 5 things you can see" },
      {
        t: "instruction",
        body: "Now touch. Notice 4 things you can feel (clothes, chair, floor, air on skin).",
      },
      { t: "timer", seconds: 30, label: "Notice 4 things you can feel" },
      {
        t: "instruction",
        body: "Listen for 3 different sounds, near or far.",
      },
      { t: "timer", seconds: 25, label: "Notice 3 sounds" },
      {
        t: "instruction",
        body: "Bring attention to smell. Notice 2 scents, even if they’re faint (air, soap, fabric, room).",
      },
      { t: "timer", seconds: 20, label: "Notice 2 smells" },
      {
        t: "instruction",
        body: "Finally, taste. Notice 1 taste–even if it’s just the neutral taste in your mouth.",
      },
      { t: "timer", seconds: 15, label: "Notice 1 taste" },
      {
        t: "instruction",
        body:
          "Check in: is your anxiety even 5–10% lower, or does it feel a little further away from your face? That small shift is the grounding working.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Box Breathing Reset
   *
   * Focus: Regulate physiology to support calmer thinking.
   * Model: Box breathing (4‑4‑4‑4) used in anxiety and performance contexts.
   */
  anxious_breath_box: {
    id: "anxious_breath_box",
    moduleId: "mini_interventions",
    title: "Box Breathing Reset",
    goal: "Calm your nervous system so thoughts can slow down",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "When anxiety rises, your breath gets shallow and fast. Box breathing gives your body a predictable rhythm that signals safety.",
      },
      {
        t: "instruction",
        body: "We’ll breathe in for 4, hold for 4, out for 4, hold for 4—like tracing the sides of a square.",
      },
      { t: "breath", pattern: "box", rounds: 4 },
      {
        t: "instruction",
        body:
          "Notice any small shifts: maybe your shoulders are lower, or your chest feels a bit less tight. The goal is not zero anxiety—just enough space to think.",
      },
      {
        t: "check",
        prompt: "I can use box breathing when my anxiety starts climbing.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Worry Window (Mini)
   *
   * Focus: CBT worry postponement.
   * Contain worry to a deliberate, time‑boxed window instead of all day.
   */
  anxious_worry_window: {
    id: "anxious_worry_window",
    moduleId: "cognitive_aid",
    title: "10‑Minute Worry Window",
    goal: "Contain worry instead of letting it run your whole day",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Trying not to worry at all usually backfires. Instead, we give worry a specific time and place.",
      },
      {
        t: "instruction",
        body:
          "Pick one topic that’s bothering you most right now. That’s your focus for this window.",
      },
      { t: "timer", seconds: 30, label: "Decide on your one worry topic" },
      {
        t: "instruction",
        body:
          "For the next few minutes, you’re *allowed* to worry about only this topic. No fixing, just letting the thoughts show up.",
      },
      { t: "timer", seconds: 300, label: "Worry window – let the thoughts run" },
      {
        t: "instruction",
        body:
          "Time’s up. You don’t need to solve this right now. If worry pops up later, your job is to tell it: “Not now—I’ll come back to you in my next window.”",
      },
      {
        t: "check",
        prompt: "I can experiment with giving worry a window instead of my whole day.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. 3‑Line Thought Reframe
   *
   * Focus: Tiny CBT thought record.
   */
  anxious_thought_reframe: {
    id: "anxious_thought_reframe",
    moduleId: "cognitive_aid",
    title: "3‑Line Thought Reframe",
    goal: "Shift one anxious thought toward something more balanced",
    format: "journal",
    fields: [
      {
        name: "hot",
        kind: "longText",
        label:
          "1) Hot thought – What’s the loudest anxious thought in your mind right now? (Write it exactly as it shows up.)",
      },
      {
        name: "evidence",
        kind: "longText",
        label:
          "2) Reality check – What evidence *for* and *against* this thought can you see if you’re honest?",
      },
      {
        name: "balanced",
        kind: "longText",
        label:
          "3) Balanced thought – Based on the evidence, what’s a more realistic version of this thought you could try on?",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Allow + Act (Tiny ACT)
   *
   * Focus: ACT – willingness to feel + values‑based micro‑action.
   */
  anxious_allow_and_act: {
    id: "anxious_allow_and_act",
    moduleId: "mini_interventions",
    title: "Allow + Act",
    goal: "Make a tiny values‑aligned move with anxiety on board",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Trying to get rid of anxiety before you act can keep you stuck. Instead, we practice allowing anxiety *and* moving toward what matters.",
      },
      {
        t: "instruction",
        body:
          "First, name what you’re feeling: “Right now I’m feeling anxious/nervous/uneasy.” No judgment, just naming.",
      },
      { t: "timer", seconds: 20, label: "Name the feeling in your own words" },
      {
        t: "instruction",
        body:
          "Now place this sentence after it: “…and I’m willing to feel this while I take one small step that matters to me.”",
      },
      {
        t: "textInput",
        prompt:
          "What tiny action (under 2 minutes) could you take right now that matters to you, even a little?",
        placeholder: "e.g., reply to one email, drink water, stand outside for 1 minute",
      },
      { t: "timer", seconds: 60, label: "Do your tiny action, with anxiety along for the ride" },
      {
        t: "check",
        prompt: "I can take tiny steps toward what matters, even when anxiety is present.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 6. Cold Water Interrupt
   *
   * Focus: DBT / physiology – TIPP skill (temperature shift).
   */
  anxious_cold_interrupt: {
    id: "anxious_cold_interrupt",
    moduleId: "mini_interventions",
    title: "Cold Water Interrupt",
    goal: "Use temperature to quickly interrupt anxious arousal",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Strong anxiety activates your fight‑or‑flight system. A sudden temperature change—especially cold—can help interrupt this.",
      },
      {
        t: "instruction",
        body:
          "If it’s safe to do so, go to a sink or grab something cold (water, ice, a cold pack). When you continue, use cold on your face or wrists.",
      },
      { t: "timer", seconds: 45, label: "Apply cold water or hold something cold" },
      {
        t: "instruction",
        body:
          "Notice how the intensity shifts—not necessarily gone, but different. Your body got a new, stronger signal to pay attention to.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body:
          "You can pair this with grounding or breathing whenever anxiety feels like it’s getting too big, too fast.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 7. Mini Body Scan
   *
   * Focus: Interoceptive awareness without judgment.
   */
  anxious_mini_body_scan: {
    id: "anxious_mini_body_scan",
    moduleId: "mini_interventions",
    title: "2‑Minute Body Scan",
    goal: "Notice where anxiety lives in your body without fighting it",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Anxiety often shows up as physical sensations—tightness, buzzing, heaviness. Noticing them on purpose can actually reduce their power.",
      },
      {
        t: "instruction",
        body:
          "Start at the top of your head. Slowly move your attention down: forehead, eyes, jaw, throat, chest, stomach, shoulders, arms, hands, legs, feet.",
      },
      { t: "timer", seconds: 60, label: "Scan down your body with curiosity" },
      {
        t: "textInput",
        prompt: "Where do you feel anxiety most right now?",
        placeholder: "e.g., tight chest, clenched jaw, heavy stomach",
      },
      {
        t: "instruction",
        body:
          "Imagine gently breathing *around* that area, not forcing it to relax, just giving it space.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body:
          "You don’t have to like these sensations. But each time you notice them without panicking about them, your brain learns: “This is uncomfortable, not dangerous.”",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 8. Reality Check: How Likely?
   *
   * Focus: CBT probability re‑estimation for worry.
   */
  anxious_reality_check: {
    id: "anxious_reality_check",
    moduleId: "cognitive_aid",
    title: "Reality Check: How Likely?",
    goal: "Challenge catastrophic predictions with numbers",
    format: "journal",
    fields: [
      {
        name: "fear",
        kind: "longText",
        label:
          "What is the scary thing your anxiety is predicting right now? (Write it as a single sentence.)",
      },
      {
        name: "probability",
        kind: "shortText",
        label:
          "If you had to give this outcome a percentage chance of happening (0–100%), what would you honestly say?",
      },
      {
        name: "evidence_for",
        kind: "longText",
        label: "What evidence *supports* this prediction?",
      },
      {
        name: "evidence_against",
        kind: "longText",
        label: "What evidence *goes against* it or points to other outcomes?",
      },
      {
        name: "alternative",
        kind: "longText",
        label:
          "What are 1–2 more likely, less catastrophic outcomes you could consider instead?",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 9. Tiny Exposure Step
   *
   * Focus: Facing something anxiety is pushing you to avoid, in a tiny way.
   * Model: Exposure / behavioral experiment in bite-size form.
   */
  anxious_tiny_exposure: {
    id: "anxious_tiny_exposure",
    moduleId: "mini_interventions",
    title: "Tiny Exposure Step",
    goal: "Approach, instead of avoid, in a micro‑dose",
    format: "builder",
    sections: [
      {
        title:
          "Name one thing anxiety is telling you to avoid (a task, a place, a conversation).",
        items: [{ label: "Avoided thing", kind: "shortText" }],
      },
      {
        title:
          "Shrink it: What is the tiniest version of this you could do in under 2 minutes?",
        items: [{ label: "Tiny version", kind: "shortText" }],
      },
      {
        title: "Predict: How anxious do you expect to feel (0–10) when you try this?",
        items: [{ label: "Predicted anxiety (0–10)", kind: "shortText" }],
      },
      {
        title: "Do it, then rate how it actually felt.",
        items: [{ label: "Actual anxiety (0–10)", kind: "shortText" }],
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 10. Support Ping
   *
   * Focus: Reaching out instead of isolating with anxiety.
   */
  anxious_support_ping: {
    id: "anxious_support_ping",
    moduleId: "mini_interventions",
    title: "Support Ping",
    goal: "Reach out to someone safe instead of spiralling alone",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body:
          "Anxiety loves isolation—it can get louder in your own head. Reaching out doesn’t have to be deep or perfect; it just has to break the loop.",
      },
      {
        t: "instruction",
        body:
          "Think of one person who is generally kind or steady. They don’t need to “fix” anything; they just need to exist on the other end.",
      },
      { t: "timer", seconds: 15, label: "Choose your person" },
      {
        t: "textInput",
        prompt: "Who are you choosing to ping?",
        placeholder: "e.g., my friend Sam, my sibling, a coworker",
      },
      {
        t: "instruction",
        body:
          "Now send a simple, honest message. Examples:\n\n“Hey, I’m feeling anxious and could use a quick check‑in.”\n“Can you send me a meme? Today is rough.”\n“Just saying hi, my anxiety is loud today.”",
      },
      { t: "timer", seconds: 60, label: "Send your support ping" },
      {
        t: "instruction",
        body:
          "Whether they respond quickly or not, you just took a skillful step: you didn’t let anxiety trap you alone with it.",
      },
    ],
    commitment: { text: "Finish" },
  },
}

/**
 * Registry of lesson IDs for quick “I’m anxious” interventions.
 * Used by the HelpModal to pick a random lesson.
 */
export const URGE_LESSONS: string[] = [
  "anxious_ground_54321",
  "anxious_breath_box",
  "anxious_worry_window",
  "anxious_thought_reframe",
  "anxious_allow_and_act",
  "anxious_cold_interrupt",
  "anxious_mini_body_scan",
  "anxious_reality_check",
  "anxious_tiny_exposure",
  "anxious_support_ping",
]


