import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Anxiety vs Panic" lesson definitions.
 *
 * Phase 1: Foundations - Module 3
 *
 * These lessons help users understand the difference between anxiety and panic.
 * They cover:
 * - Anxiety = ongoing anticipation
 * - Panic = acute false alarm
 * - Why panic feels medical / existential
 *
 * Key learning: Panic is intense, not harmful.
 */
export const ANXIETY_VS_PANIC_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Anxiety vs Panic: The Key Difference
   *
   * Format: Card lesson
   * Focus: Understanding the fundamental difference between anxiety and panic
   */
  anxiety_vs_panic_key_difference: {
    id: "anxiety_vs_panic_key_difference",
    moduleId: "anxiety_vs_panic",
    title: "Anxiety vs Panic: The Key Difference",
    goal: "Understand how anxiety and panic are different",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety and panic feel similar, but they're different experiences. Understanding the difference helps you respond more skillfully to each.",
      },
      {
        type: "text",
        body: "Anxiety is ongoing anticipation. It's the worry that builds over time—the 'what if' thoughts that linger. Anxiety can last hours, days, or even weeks. It's like background noise that gets louder or quieter.",
      },
      {
        type: "tip",
        body: "Anxiety = 'What if something bad happens?' It's the anticipation, not the event itself.",
      },
      {
        type: "text",
        body: "Panic is an acute false alarm. It's a sudden, intense surge that peaks within minutes. Your body's alarm system goes off at full volume, even though there's no real danger. Panic is like a fire alarm going off when there's no fire.",
      },
      {
        type: "tip",
        body: "Panic = Your body's alarm system activating at maximum intensity, even though you're safe.",
      },
      {
        type: "text",
        body: "Think of it this way: Anxiety is the worry about the test tomorrow. Panic is the moment your body thinks you're dying right now, even though you're just sitting in your car.",
      },
      {
        type: "text",
        body: "Both feel awful, but they're different. Anxiety is persistent worry. Panic is a sudden, intense peak. Understanding this helps you know what you're dealing with.",
      },
      {
        type: "text",
        body: "Anxiety can build gradually. You might notice it getting worse over hours or days. Panic hits suddenly—one moment you're fine, the next your body's alarm is at full volume.",
      },
      {
        type: "tip",
        body: "Anxiety = gradual build. Panic = sudden surge. Knowing which you're experiencing helps you choose the right response.",
      },
      {
        type: "text",
        body: "Anxiety responds well to grounding, breathing, and cognitive tools. Panic responds well to riding it out, knowing it will pass, and not fighting the sensations.",
      },
      {
        type: "text",
        body: "The more you understand the difference, the more skillfully you can respond to each. Both are manageable, but they need different approaches.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Panic Feels Medical
   *
   * Format: Card lesson
   * Focus: Understanding why panic attacks feel like medical emergencies
   */
  anxiety_vs_panic_why_feels_medical: {
    id: "anxiety_vs_panic_why_feels_medical",
    moduleId: "anxiety_vs_panic",
    title: "Why Panic Feels Medical",
    goal: "Understand why panic attacks feel like medical emergencies",
    format: "card",
    cards: [
      {
        type: "text",
        body: "During a panic attack, your body does everything it would do if you were actually in danger. The symptoms are real and intense—which is why they feel so medical.",
      },
      {
        type: "text",
        body: "Racing heart, chest tightness, difficulty breathing, dizziness, sweating, shaking—these are the same symptoms you'd have if you were running from a bear. Your body can't tell the difference between real danger and a false alarm.",
      },
      {
        type: "tip",
        body: "Your body's response is identical whether the threat is real or imagined. The intensity is the same.",
      },
      {
        type: "text",
        body: "When your heart races and your chest tightens, it's natural to think 'heart attack.' When you feel dizzy and disconnected, it's natural to think 'stroke' or 'losing my mind.' But these are panic symptoms, not medical emergencies.",
      },
      {
        type: "text",
        body: "The key difference: Medical emergencies get worse over time. Panic attacks peak and then subside, usually within 10-20 minutes. If you've had panic attacks before and they always pass, that's important information.",
      },
      {
        type: "tip",
        body: "Panic attacks are self-limiting—they peak and then fade. Medical emergencies don't get better on their own.",
      },
      {
        type: "text",
        body: "Understanding that panic feels medical but isn't medical can help you ride it out instead of escalating it with catastrophic thoughts.",
      },
      {
        type: "text",
        body: "If you're ever truly unsure whether something is panic or a medical emergency, it's okay to get checked out. But if you've had panic attacks before and this feels the same, that's valuable information.",
      },
      {
        type: "tip",
        body: "Panic attacks feel the same each time. If this feels like previous panic attacks, it's likely panic, not a new medical problem.",
      },
      {
        type: "text",
        body: "The more you understand that panic symptoms are your body's alarm system (not signs of illness), the less scary they become. They're still intense, but they're not dangerous.",
      },
      {
        type: "text",
        body: "Remember: Medical emergencies get worse. Panic attacks get better. If your symptoms are peaking and then fading, that's panic, not a medical emergency.",
      },
      {
        type: "text",
        body: "Panic also feels existential. During a panic attack, you might think: 'I'm losing my mind,' 'I'm going crazy,' 'I'll never be normal again,' or 'This will never end.' These thoughts are your brain trying to explain intense sensations, not facts.",
      },
      {
        type: "tip",
        body: "Catastrophic thoughts during panic are symptoms, not truths. You don't have to believe them—you can notice them and let them pass.",
      },
      {
        type: "text",
        body: "Every panic attack you've survived is proof that you can handle it. The feeling of 'this will never end' is part of the panic, not a prediction. Panic always ends.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Panic is Intense, Not Harmful
   *
   * Format: Practice lesson
   * Focus: Experiential understanding that panic is intense but not dangerous
   */
  anxiety_vs_panic_intense_not_harmful: {
    id: "anxiety_vs_panic_intense_not_harmful",
    moduleId: "anxiety_vs_panic",
    title: "Panic is Intense, Not Harmful",
    goal: "Experience that panic is intense but not dangerous",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Panic attacks feel terrible. They're intense, overwhelming, and scary. But here's what's true: They're not dangerous. Your body can handle the intensity.",
      },
      {
        t: "instruction",
        body: "Think about a panic attack you've had (or imagine one). What did it feel like? What were the physical sensations? What were the thoughts?",
      },
      { t: "timer", seconds: 30, label: "Recall or imagine the experience" },
      {
        t: "instruction",
        body: "Now ask yourself: Did that panic attack actually harm you? Did it cause physical damage? Did you die? Did you lose your mind?",
      },
      { t: "timer", seconds: 20, label: "Reflect on whether it actually caused harm" },
      {
        t: "instruction",
        body: "Panic attacks are intense, but they don't cause physical harm. Your heart can race safely. Your breathing can be fast. Your body can handle the intensity—it's designed to.",
      },
      {
        t: "instruction",
        body: "The danger isn't in the sensations themselves. The danger is in the interpretation: 'This is dangerous' or 'I can't handle this.' Those thoughts make panic worse.",
      },
      {
        t: "instruction",
        body: "Try this reframe: 'This is intense, but it's not dangerous. My body can handle this. It's a false alarm, and it will pass.'",
      },
      { t: "timer", seconds: 30, label: "Practice the reframe" },
      {
        t: "instruction",
        body: "Panic is intense, not harmful. You can feel terrible and still be safe. You can feel like you're dying and still be okay. The intensity is real, but the danger is not.",
      },
      {
        t: "check",
        prompt: "I can experience intense panic sensations without believing they're dangerous.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Experience with Anxiety and Panic
   *
   * Format: Journal lesson
   * Focus: Personal reflection on experiences with anxiety and panic
   */
  anxiety_vs_panic_my_experience: {
    id: "anxiety_vs_panic_my_experience",
    moduleId: "anxiety_vs_panic",
    title: "My Experience with Anxiety and Panic",
    goal: "Reflect on your personal experiences with anxiety and panic",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "anxiety_experience",
        kind: "longText",
        label: "How does anxiety show up for you? What does it feel like? (e.g., ongoing worry, persistent thoughts, background unease)",
        minWords: 20,
      },
      {
        name: "panic_experience",
        kind: "longText",
        label: "Have you experienced panic attacks? If so, what do they feel like? If not, what do you imagine they might feel like?",
        minWords: 15,
      },
      {
        name: "medical_fears",
        kind: "longText",
        label: "During panic or intense anxiety, what medical fears come up? (e.g., 'I'm having a heart attack,' 'I'm losing my mind')",
        minWords: 15,
      },
      {
        name: "existential_fears",
        kind: "longText",
        label: "What existential fears come up? (e.g., 'I'll never be normal again,' 'This will never end,' 'I'm going crazy')",
        minWords: 15,
      },
      {
        name: "new_understanding",
        kind: "longText",
        label: "If panic is intense but not harmful, and these fears are symptoms not facts, how does that change your relationship with panic?",
        minWords: 20,
      },
    ],
    autosaveTag: "anxiety_panic_experience",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Anxiety vs Panic Understanding
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for understanding anxiety vs panic
   */
  anxiety_vs_panic_build_understanding: {
    id: "anxiety_vs_panic_build_understanding",
    moduleId: "anxiety_vs_panic",
    title: "Building Your Anxiety vs Panic Understanding",
    goal: "Create a personal reference for understanding anxiety and panic",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Anxiety is ongoing anticipation; panic is an acute false alarm",
            kind: "check",
          },
          {
            label: "Panic feels medical, but it's not a medical emergency",
            kind: "check",
          },
          {
            label: "Panic is intense, but it's not harmful",
            kind: "check",
          },
          {
            label: "Panic attacks always peak and then fade",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Experience",
        items: [
          {
            label: "I experience ongoing anxiety (persistent worry, anticipation)",
            kind: "check",
          },
          {
            label: "I experience panic attacks (sudden, intense surges)",
            kind: "check",
          },
          {
            label: "I experience both anxiety and panic",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "Common Panic Symptoms I Experience",
        items: [
          {
            label: "Racing heart or heart palpitations",
            kind: "check",
          },
          {
            label: "Chest tightness or pain",
            kind: "check",
          },
          {
            label: "Difficulty breathing or feeling like I can't breathe",
            kind: "check",
          },
          {
            label: "Dizziness or lightheadedness",
            kind: "check",
          },
          {
            label: "Feeling like I'm losing control or going crazy",
            kind: "check",
          },
          {
            label: "Feeling disconnected from reality (derealization)",
            kind: "check",
          },
          {
            label: "Feeling disconnected from my body (depersonalization)",
            kind: "check",
          },
          {
            label: "Fear of dying or having a medical emergency",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Panic Reframe",
        items: [
          {
            label: "Write a reframe you can use during panic (e.g., 'This is intense but not dangerous,' 'This is a false alarm and it will pass')",
            kind: "shortText",
            inputId: "panic_reframe",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

