import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "What Anxiety Actually Is" lesson definitions.
 *
 * Phase 1: Foundations - Module 1
 *
 * These lessons help users understand anxiety as a system, not a flaw.
 * They cover:
 * - Anxiety vs fear vs stress
 * - Why humans evolved anxiety
 * - Why anxiety feels urgent but isn't dangerous
 *
 * Key learning: Anxiety is a system, not a flaw.
 */
export const WHAT_ANXIETY_IS_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Anxiety vs Fear vs Stress
   *
   * Format: Card lesson
   * Focus: Understanding the differences between these related but distinct experiences
   */
  what_anxiety_is_anxiety_vs_fear_vs_stress: {
    id: "what_anxiety_is_anxiety_vs_fear_vs_stress",
    moduleId: "what_anxiety_is",
    title: "Anxiety vs Fear vs Stress",
    goal: "Understand the difference between anxiety, fear, and stress",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety, fear, and stress are related but different. Understanding the difference helps you respond more skillfully to each.",
      },
      {
        type: "text",
        body: "Fear is your response to a real, present threat. A bear in front of you? That's fear. Your body reacts immediately to keep you safe.",
      },
      {
        type: "tip",
        body: "Fear = Real danger, happening now. Your body's alarm system working correctly.",
      },
      {
        type: "text",
        body: "Anxiety is your response to a potential, future threat. The bear isn't here, but your mind is preparing for what might happen. It's anticipation, not reaction.",
      },
      {
        type: "tip",
        body: "Anxiety = Potential danger, not happening now. Your mind trying to protect you from future problems.",
      },
      {
        type: "text",
        body: "Stress is your body's response to demands or pressure. It can come from deadlines, responsibilities, or life changes. Stress can trigger anxiety, but they're not the same.",
      },
      {
        type: "tip",
        body: "Stress = Pressure or demands. Anxiety = Worry about what those demands might lead to.",
      },
      {
        type: "text",
        body: "Here's the key: Fear protects you from real danger. Anxiety tries to protect you from imagined danger. Both feel urgent, but only fear is responding to something actually happening.",
      },
      {
        type: "text",
        body: "When you feel anxious, you can ask: 'Is there a real threat right now, or is my mind preparing for a threat that might not happen?' This question alone can shift how anxiety feels.",
      },
      {
        type: "text",
        body: "Here's a practical way to use this: When anxiety shows up, pause and ask yourself: 'Am I responding to something happening right now (fear), or something that might happen (anxiety)?'",
      },
      {
        type: "tip",
        body: "Most of the time, anxiety is about the future, not the present. Recognizing this can help you respond more skillfully.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Humans Evolved Anxiety
   *
   * Format: Card lesson
   * Focus: Understanding anxiety as an evolutionary advantage, not a flaw
   */
  what_anxiety_is_why_we_evolved_anxiety: {
    id: "what_anxiety_is_why_we_evolved_anxiety",
    moduleId: "what_anxiety_is",
    title: "Why Humans Evolved Anxiety",
    goal: "See anxiety as a protective system, not a personal failure",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety isn't a bug—it's a feature. Your ancestors who worried about potential threats survived longer than those who didn't.",
      },
      {
        type: "text",
        body: "Imagine you're an early human. The rustling in the bushes could be wind... or it could be a predator. The person who felt anxious and prepared was more likely to survive.",
      },
      {
        type: "tip",
        body: "Anxiety is your brain's way of saying 'Hey, let's be ready, just in case.' It's a survival mechanism that worked too well.",
      },
      {
        type: "text",
        body: "In modern life, your anxiety system still works the same way. But now it's responding to emails, social situations, and deadlines—not predators.",
      },
      {
        type: "text",
        body: "The system isn't broken. It's just responding to modern threats the same way it responded to ancient ones. The intensity is the same, but the context has changed.",
      },
      {
        type: "tip",
        body: "Your anxiety isn't trying to hurt you—it's trying to protect you. The problem isn't the system; it's that the system is working too hard in situations where you're actually safe.",
      },
      {
        type: "text",
        body: "When you understand anxiety as a protective system, you can work with it instead of against it. You're not broken—you're human, with a system that's trying to keep you safe.",
      },
      {
        type: "text",
        body: "Think about it: If anxiety were truly a flaw, why would it be so common? Why would evolution keep it around? The answer: Because it helped our ancestors survive.",
      },
      {
        type: "tip",
        body: "Anxiety being common doesn't mean it's a flaw—it means it's a feature that worked too well.",
      },
      {
        type: "text",
        body: "The goal isn't to completely eliminate anxiety. For many people, the goal is to understand it, work with it, and reduce how much it controls their life.",
      },
      {
        type: "text",
        body: "You have a system that's trying to protect you. That's not a flaw—that's biology. Now you can learn to work with it instead of against it.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Why Anxiety Feels Urgent But Isn't Dangerous
   *
   * Format: Practice lesson
   * Focus: Experiential understanding of anxiety's false urgency
   */
  what_anxiety_is_false_urgency: {
    id: "what_anxiety_is_false_urgency",
    moduleId: "what_anxiety_is",
    title: "Why Anxiety Feels Urgent But Isn't Dangerous",
    goal: "Experience how anxiety creates urgency without real danger",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Anxiety feels urgent. Your body says 'Act now! Something is wrong!' But here's the thing: anxiety creates urgency, not actual danger.",
      },
      {
        t: "instruction",
        body: "Think of a recent time you felt anxious. What did your body feel like? Racing heart? Tight chest? Sweaty palms?",
      },
      { t: "timer", seconds: 30, label: "Notice what anxiety feels like in your body" },
      {
        t: "instruction",
        body: "Those sensations are your body preparing for action. But ask yourself: Was there actually something dangerous happening? Or was your body preparing for a threat that didn't exist?",
      },
      { t: "timer", seconds: 30, label: "Reflect on whether there was real danger" },
      {
        t: "instruction",
        body: "Anxiety's job is to make you feel like you need to act immediately. But most of the time, the 'threat' is in your mind, not in reality.",
      },
      {
        t: "instruction",
        body: "Try this: Take three slow breaths. Notice that nothing bad happens when you slow down. The urgency was a feeling, not a fact.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "instruction",
        body: "Anxiety feels urgent, but urgency doesn't mean danger. You can feel anxious and still be safe. You can feel urgent and still take your time.",
      },
      {
        t: "instruction",
        body: "The next time anxiety shows up with that urgent feeling, remember: Urgency is a signal, not a command. You can notice it, acknowledge it, and still choose how to respond.",
      },
      {
        t: "instruction",
        body: "Practice this now: Think of a situation that typically makes you feel anxious urgency. Now imagine feeling that urgency and still taking a moment to breathe before acting.",
      },
      { t: "timer", seconds: 30, label: "Practice feeling urgency without immediately acting" },
      {
        t: "check",
        prompt: "I can feel anxious urgency without acting on it immediately.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Relationship With Anxiety
   *
   * Format: Journal lesson
   * Focus: Personal reflection on how anxiety shows up and what it means
   */
  what_anxiety_is_my_relationship: {
    id: "what_anxiety_is_my_relationship",
    moduleId: "what_anxiety_is",
    title: "My Relationship With Anxiety",
    goal: "Reflect on how anxiety shows up in your life and what it means to you",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "how_it_shows_up",
        kind: "longText",
        label:
          "How does anxiety show up for you? What does it feel like in your body, your thoughts, your behavior?",
        minWords: 20,
      },
      {
        name: "what_it_means",
        kind: "longText",
        label:
          "What have you believed anxiety means about you? (e.g., 'I'm weak,' 'I'm broken,' 'I can't handle life')",
        minWords: 15,
      },
      {
        name: "new_perspective",
        kind: "longText",
        label:
          "If anxiety is a protective system (not a flaw), how might you relate to it differently?",
        minWords: 20,
      },
      {
        name: "anxiety_level",
        kind: "slider",
        label: "Right now, how anxious do you feel? (0 = calm, 10 = extremely anxious)",
        min: 0,
        max: 10,
        step: 1,
      },
    ],
    autosaveTag: "anxiety_relationship",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Understanding of Anxiety
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for understanding anxiety
   */
  what_anxiety_is_build_understanding: {
    id: "what_anxiety_is_build_understanding",
    moduleId: "what_anxiety_is",
    title: "Building Your Understanding of Anxiety",
    goal: "Create a personal reference for how anxiety works for you",
    format: "builder",
    sections: [
      {
        title: "What Anxiety Is For Me",
        items: [
          {
            label: "Anxiety is a protective system, not a flaw",
            kind: "check",
          },
          {
            label: "Anxiety is anticipation of potential threats, not reaction to real danger",
            kind: "check",
          },
          {
            label: "Anxiety feels urgent, but urgency doesn't mean danger",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "How Anxiety Shows Up",
        items: [
          {
            label: "Physical sensations (e.g., racing heart, tight chest, sweaty palms)",
            kind: "check",
          },
          {
            label:
              "Thoughts (e.g., 'What if...', 'I can't handle this', 'Something bad will happen')",
            kind: "check",
          },
          {
            label: "Behaviors (e.g., avoiding, checking, seeking reassurance)",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Key Insight",
        items: [
          {
            label: "Write one key insight about anxiety that you want to remember",
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
