import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "The Nervous System 101" lesson definitions.
 *
 * Phase 1: Foundations - Module 2
 *
 * These lessons help users understand their nervous system and why anxiety
 * creates physical symptoms. They cover:
 * - Fight / flight / freeze explained simply
 * - Why your heart, breath, stomach react
 * - Why "calm down" doesn't work
 *
 * Key learning: Symptoms are signals, not failures.
 */
export const NERVOUS_SYSTEM_101_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Fight, Flight, Freeze Explained
   *
   * Format: Card lesson
   * Focus: Understanding the three basic survival responses
   */
  nervous_system_101_fight_flight_freeze: {
    id: "nervous_system_101_fight_flight_freeze",
    moduleId: "nervous_system_101",
    title: "Fight, Flight, Freeze Explained",
    goal: "Understand your body's three basic survival responses",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When your brain detects a threat (real or imagined), it activates your survival system. This system has three basic responses: fight, flight, or freeze.",
      },
      {
        type: "text",
        body: "Fight: Your body prepares to confront the threat. Muscles tense, heart races, adrenaline surges. You feel ready to take action, maybe even aggressive.",
      },
      {
        type: "tip",
        body: "Fight response = 'I need to stand my ground or push back.'",
      },
      {
        type: "text",
        body: "Flight: Your body prepares to escape. Same physical activation, but the urge is to run, leave, or get away. Your legs might feel restless, you might want to bolt.",
      },
      {
        type: "tip",
        body: "Flight response = 'I need to get out of here, now.'",
      },
      {
        type: "text",
        body: "Freeze: Your body goes still, like a deer in headlights. Sometimes the threat feels too big to fight or flee, so your system shuts down movement. You might feel numb, disconnected, or stuck.",
      },
      {
        type: "tip",
        body: "Freeze response = 'I can't move, I'm paralyzed.' This is also a survival strategy—predators often lose interest in prey that doesn't move.",
      },
      {
        type: "text",
        body: "All three responses are normal and automatic. Your body doesn't choose—it reacts based on what it thinks will keep you safest. There's no 'wrong' response.",
      },
      {
        type: "text",
        body: "Understanding which response you tend toward helps you recognize what's happening and respond with compassion instead of judgment.",
      },
      {
        type: "text",
        body: "You might also notice that you experience different responses in different situations. That's normal too. Your body is choosing what it thinks will work best in each moment.",
      },
      {
        type: "tip",
        body: "There's no 'right' or 'wrong' survival response. All three are valid strategies your body uses to keep you safe.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Your Body Reacts
   *
   * Format: Card lesson
   * Focus: Understanding why physical symptoms happen during anxiety
   */
  nervous_system_101_why_body_reacts: {
    id: "nervous_system_101_why_body_reacts",
    moduleId: "nervous_system_101",
    title: "Why Your Body Reacts",
    goal: "Understand why anxiety creates physical symptoms",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety isn't just in your head—it's in your whole body. When your survival system activates, it redirects resources to help you respond to danger.",
      },
      {
        type: "text",
        body: "Your heart races because your body needs more oxygen and blood flow to muscles. It's preparing you to fight or run, even if you're just sitting at your desk.",
      },
      {
        type: "tip",
        body: "Racing heart = Your body trying to deliver fuel to your muscles, not a sign of danger.",
      },
      {
        type: "text",
        body: "Your breath gets shallow and fast because your body wants more oxygen. But this can backfire—too-fast breathing can make you dizzy or lightheaded.",
      },
      {
        type: "tip",
        body: "Fast breathing = Your body trying to oxygenate, but it can overshoot and create more symptoms.",
      },
      {
        type: "text",
        body: "Your stomach might feel tight, nauseous, or 'butterflies' because blood flow shifts away from digestion toward your muscles. Your body is saying 'digestion can wait, survival comes first.'",
      },
      {
        type: "tip",
        body: "Stomach issues = Your body prioritizing survival over digestion, not a sign of illness.",
      },
      {
        type: "text",
        body: "Muscles tense because your body is preparing to move quickly. Sweating happens to cool you down during exertion. Shaking is excess energy with nowhere to go.",
      },
      {
        type: "text",
        body: "All of these symptoms are your body doing its job—preparing you for action. The problem isn't the symptoms; it's that your body thinks there's danger when there isn't.",
      },
      {
        type: "text",
        body: "When you understand that these symptoms are your body preparing for action (not signs of illness or danger), you can respond to them differently. Instead of fear, you can respond with understanding.",
      },
      {
        type: "tip",
        body: "Your body is doing what it's supposed to do. The symptoms aren't the problem—the false alarm is.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Why "Calm Down" Doesn't Work
   *
   * Format: Practice lesson
   * Focus: Experiential understanding of why suppression doesn't work
   */
  nervous_system_101_why_calm_down_fails: {
    id: "nervous_system_101_why_calm_down_fails",
    moduleId: "nervous_system_101",
    title: "Why 'Calm Down' Doesn't Work",
    goal: "Understand why trying to suppress anxiety backfires",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When someone tells you to 'calm down' during anxiety, it usually makes things worse. Here's why: your survival system doesn't respond to commands—it responds to safety signals.",
      },
      {
        t: "instruction",
        body: "Try this: Right now, try to make your heart beat slower. Just will it to slow down. What happens?",
      },
      { t: "timer", seconds: 10, label: "Try to slow your heart with willpower" },
      {
        t: "instruction",
        body: "You can't directly control your heart rate with thoughts. Your nervous system is automatic—it runs below the level of conscious control.",
      },
      {
        t: "instruction",
        body: "When you try to 'calm down' or 'stop being anxious,' you're fighting your own nervous system. Fighting creates more tension, which your system interprets as more threat.",
      },
      {
        t: "instruction",
        body: "Instead of fighting, we work with the system. We can't command it to stop, but we can send it safety signals: slower breathing, gentle movement, grounding in the present moment.",
      },
      {
        t: "instruction",
        body: "Take three slow breaths. Don't try to make anxiety go away—just breathe slowly and notice what happens.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "instruction",
        body: "Working with your nervous system (sending safety signals) is different from fighting it (trying to make it stop). One creates more tension; the other allows the system to settle.",
      },
      {
        t: "instruction",
        body: "Notice the difference: When you tried to command your heart to slow down, what happened? When you breathed slowly, what happened?",
      },
      { t: "timer", seconds: 20, label: "Reflect on the difference" },
      {
        t: "instruction",
        body: "Working with your nervous system means sending it signals of safety, not commands to stop. Slow breathing, gentle movement, grounding—these are signals, not commands.",
      },
      {
        t: "check",
        prompt: "I can work with my nervous system instead of fighting it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Symptoms as Signals
   *
   * Format: Journal lesson
   * Focus: Reflecting on physical symptoms and what they mean
   */
  nervous_system_101_symptoms_as_signals: {
    id: "nervous_system_101_symptoms_as_signals",
    moduleId: "nervous_system_101",
    title: "Symptoms as Signals",
    goal: "Reframe physical symptoms as information, not danger",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "common_symptoms",
        kind: "longText",
        label: "What physical symptoms do you experience when anxious? (e.g., racing heart, tight chest, sweaty palms, stomach issues, shaking)",
        minWords: 15,
      },
      {
        name: "what_they_mean",
        kind: "longText",
        label: "What have you believed these symptoms mean? (e.g., 'I'm having a heart attack,' 'I'm losing control,' 'Something is wrong with me')",
        minWords: 15,
      },
      {
        name: "new_understanding",
        kind: "longText",
        label: "If these symptoms are your nervous system preparing for action (not signs of danger), how does that change how you relate to them?",
        minWords: 20,
      },
      {
        name: "symptom_intensity",
        kind: "slider",
        label: "Right now, how intense are any physical symptoms you're feeling? (0 = none, 10 = extremely intense)",
        min: 0,
        max: 10,
        step: 1,
      },
    ],
    autosaveTag: "symptoms_as_signals",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Nervous System Understanding
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for understanding your nervous system
   */
  nervous_system_101_build_understanding: {
    id: "nervous_system_101_build_understanding",
    moduleId: "nervous_system_101",
    title: "Building Your Nervous System Understanding",
    goal: "Create a personal reference for how your nervous system responds",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "My nervous system is trying to protect me, not hurt me",
            kind: "check",
          },
          {
            label: "Physical symptoms are signals, not signs of danger",
            kind: "check",
          },
          {
            label: "I can't command my nervous system to stop, but I can send it safety signals",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Survival Response Tendency",
        items: [
          {
            label: "I tend toward fight response (confront, push back, feel aggressive)",
            kind: "check",
          },
          {
            label: "I tend toward flight response (want to escape, leave, get away)",
            kind: "check",
          },
          {
            label: "I tend toward freeze response (feel stuck, numb, disconnected)",
            kind: "check",
          },
          {
            label: "I experience a mix of responses depending on the situation",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Common Physical Symptoms",
        items: [
          {
            label: "Racing heart or heart palpitations",
            kind: "check",
          },
          {
            label: "Fast or shallow breathing",
            kind: "check",
          },
          {
            label: "Tight chest or chest pain",
            kind: "check",
          },
          {
            label: "Stomach issues (nausea, butterflies, tightness)",
            kind: "check",
          },
          {
            label: "Muscle tension or shaking",
            kind: "check",
          },
          {
            label: "Sweating or feeling hot",
            kind: "check",
          },
          {
            label: "Dizziness or lightheadedness",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Key Insight",
        items: [
          {
            label: "Write one key insight about your nervous system that you want to remember",
            kind: "shortText",
            inputId: "key_insight",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

