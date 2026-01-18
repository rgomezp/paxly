import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Triggers (Internal vs External)" lesson definitions.
 *
 * Phase 2: Awareness - Module 6
 *
 * These lessons help users understand what triggers anxiety and how to identify
 * their personal triggers. They cover:
 * - Thoughts, sensations, memories (internal triggers)
 * - Caffeine, sleep, hunger, stress load (external triggers)
 * - Why "out of nowhere" is rarely true
 *
 * Key learning: Triggers aren't causes — they're cues.
 */
export const TRIGGERS_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Internal vs External Triggers
   *
   * Format: Card lesson
   * Focus: Understanding the difference between internal and external triggers
   */
  triggers_internal_vs_external: {
    id: "triggers_internal_vs_external",
    moduleId: "triggers",
    title: "Internal vs External Triggers",
    goal: "Understand the difference between internal and external triggers",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Anxiety often feels like it comes 'out of nowhere,' but it rarely does. Usually, something triggered it—either from inside you (internal) or from your environment (external).",
      },
      {
        type: "text",
        body: "Internal triggers come from inside you. They're things happening in your body or mind: thoughts, physical sensations, memories, emotions, or bodily states like hunger, fatigue, or pain.",
      },
      {
        type: "tip",
        body: "Internal triggers = What's happening inside you (thoughts, sensations, memories, body states).",
      },
      {
        type: "text",
        body: "External triggers come from your environment. They're things outside you: situations, people, places, substances (like caffeine), or events. They're things you can point to in the world around you.",
      },
      {
        type: "tip",
        body: "External triggers = What's happening around you (situations, people, places, substances, events).",
      },
      {
        type: "text",
        body: "Most anxiety episodes are triggered by a combination of both. For example, you might be tired (internal) and then have a difficult conversation (external), and anxiety spikes.",
      },
      {
        type: "text",
        body: "Understanding your triggers helps you predict and prepare for anxiety. It also helps you realize that anxiety rarely comes 'out of nowhere'—there's usually a pattern you can learn to recognize.",
      },
      {
        type: "text",
        body: "Here's the key insight: Triggers aren't causes—they're cues. They don't cause anxiety; they activate your anxiety system. Understanding this helps you respond to triggers without blaming them.",
      },
      {
        type: "tip",
        body: "Triggers = Cues that activate your anxiety system, not causes of anxiety itself.",
      },
      {
        type: "text",
        body: "When you understand your triggers, you can work with them. You can't always avoid triggers, but you can prepare for them, notice them early, and respond skillfully when they show up.",
      },
      {
        type: "text",
        body: "The goal isn't to eliminate all triggers (that's impossible). The goal is to understand them, recognize them, and know how to respond when they activate your anxiety system.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Common Triggers (Internal and External)
   *
   * Format: Card lesson
   * Focus: Understanding common internal and external triggers
   */
  triggers_common_triggers: {
    id: "triggers_common_triggers",
    moduleId: "triggers",
    title: "Common Triggers (Internal and External)",
    goal: "Learn about common triggers that activate anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Learning to recognize common triggers helps you understand why anxiety shows up when it does. Most triggers fall into two categories: internal (inside you) and external (around you).",
      },
      {
        type: "text",
        body: "Internal triggers include thoughts (worry thoughts, memories of past anxiety, catastrophic thinking), physical sensations (racing heart, dizziness, stomach discomfort), bodily states (hunger, fatigue, pain), and emotions (sadness, anger, overwhelm).",
      },
      {
        type: "tip",
        body: "Internal triggers = What's happening inside you. Thoughts, sensations, memories, body states, and emotions can all activate your anxiety system.",
      },
      {
        type: "text",
        body: "Physical sensations that feel similar to anxiety symptoms can trigger more anxiety—creating a feedback loop. A racing heart from exercise might be interpreted as danger, activating your anxiety system.",
      },
      {
        type: "text",
        body: "Bodily states like hunger, fatigue, or pain lower your threshold for anxiety. When your body is stressed or depleted, it's easier for triggers to activate your anxiety system.",
      },
      {
        type: "tip",
        body: "When you're tired, hungry, or in pain, your anxiety system is more sensitive. Taking care of your body helps reduce trigger sensitivity.",
      },
      {
        type: "text",
        body: "External triggers include substances (caffeine, alcohol), sleep deprivation, hunger or blood sugar fluctuations, stressful situations (work deadlines, conflicts, social situations), people, and places. (Note: Never change prescribed medications without consulting your healthcare provider.)",
      },
      {
        type: "tip",
        body: "External triggers = What's happening around you. Substances, situations, people, and places can all activate your anxiety system.",
      },
      {
        type: "text",
        body: "Caffeine is a common external trigger. It's a stimulant that can mimic anxiety symptoms, making you feel jittery or on edge. Sleep deprivation is another major trigger—when you're sleep-deprived, your anxiety system is more sensitive.",
      },
      {
        type: "text",
        body: "Stressful situations, certain people, or places where you've had panic attacks can all be external triggers. The key is understanding that these are cues, not causes—they activate your system, but they don't mean something is dangerous.",
      },
      {
        type: "text",
        body: "Most anxiety episodes are triggered by a combination of both internal and external factors. For example, you might be tired (internal) and then have a difficult conversation (external), and anxiety spikes.",
      },
      {
        type: "text",
        body: "The key is learning to recognize these triggers. Once you notice them, you can respond skillfully instead of automatically. You can say: 'This is a trigger, not a threat. I can feel this without it meaning danger.'",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Why "Out of Nowhere" is Rarely True
   *
   * Format: Practice lesson
   * Focus: Experiential practice in identifying triggers
   */
  triggers_out_of_nowhere: {
    id: "triggers_out_of_nowhere",
    moduleId: "triggers",
    title: "Why 'Out of Nowhere' is Rarely True",
    goal: "Practice identifying triggers in anxiety episodes",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Anxiety often feels like it comes 'out of nowhere,' but if you look back, there's usually a trigger. Let's practice identifying triggers in your own experience.",
      },
      {
        t: "instruction",
        body: "Think of a recent time when anxiety showed up. It might have felt sudden, but let's look for what triggered it.",
      },
      {
        t: "instruction",
        body: "First, look at internal triggers. What was happening inside you? Were you tired? Hungry? Having worry thoughts? Feeling a physical sensation? Remembering something?",
      },
      { t: "timer", seconds: 45, label: "Identify internal triggers" },
      {
        t: "instruction",
        body: "Now look at external triggers. What was happening around you? Were you in a specific situation? With certain people? Had you consumed caffeine? Were you sleep-deprived? In a stressful situation?",
      },
      { t: "timer", seconds: 45, label: "Identify external triggers" },
      {
        t: "instruction",
        body: "Notice how there were likely multiple triggers working together. Maybe you were tired (internal) and then had a difficult conversation (external), and anxiety spiked.",
      },
      { t: "timer", seconds: 30, label: "Notice how triggers combined" },
      {
        t: "instruction",
        body: "The anxiety might have felt sudden, but the triggers were building. Understanding this helps you see that anxiety rarely comes 'out of nowhere'—there's usually a pattern.",
      },
      {
        t: "instruction",
        body: "Practice this: The next time anxiety shows up, pause and ask: 'What triggered this?' Look for both internal and external triggers. The more you practice, the better you get at recognizing patterns.",
      },
      { t: "timer", seconds: 30, label: "Practice identifying triggers" },
      {
        t: "instruction",
        body: "Remember: Triggers are cues, not causes. They activate your anxiety system, but they don't mean something is wrong. Understanding your triggers helps you respond skillfully instead of automatically.",
      },
      {
        t: "check",
        prompt:
          "I can identify triggers in my anxiety episodes and understand they're cues, not causes.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Personal Triggers
   *
   * Format: Journal lesson
   * Focus: Personal reflection on triggers
   */
  triggers_my_personal: {
    id: "triggers_my_personal",
    moduleId: "triggers",
    title: "My Personal Triggers",
    goal: "Document your personal internal and external triggers",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "internal_triggers",
        kind: "longText",
        label:
          "What are your internal triggers? (Thoughts, physical sensations, memories, bodily states like hunger/fatigue, emotions)",
        minWords: 25,
      },
      {
        name: "external_triggers",
        kind: "longText",
        label:
          "What are your external triggers? (Situations, people, places, substances like caffeine, sleep deprivation, stress)",
        minWords: 25,
      },
      {
        name: "trigger_combinations",
        kind: "longText",
        label:
          "How do your triggers combine? (e.g., 'When I'm tired and then have a difficult conversation, anxiety spikes')",
        minWords: 20,
      },
      {
        name: "out_of_nowhere",
        kind: "longText",
        label:
          "Think of a time anxiety felt like it came 'out of nowhere.' Looking back, what triggers can you identify?",
        minWords: 20,
      },
      {
        name: "trigger_response",
        kind: "longText",
        label:
          "How might understanding your triggers help you respond differently? (Remember: triggers are cues, not causes)",
        minWords: 20,
      },
    ],
    autosaveTag: "personal_triggers",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Trigger Awareness
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for triggers
   */
  triggers_build_awareness: {
    id: "triggers_build_awareness",
    moduleId: "triggers",
    title: "Building Your Trigger Awareness",
    goal: "Create a personal reference for your triggers",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Triggers are cues, not causes—they activate your anxiety system",
            kind: "check",
          },
          {
            label: "Anxiety rarely comes 'out of nowhere'—there's usually a trigger",
            kind: "check",
          },
          {
            label:
              "Most anxiety episodes are triggered by a combination of internal and external factors",
            kind: "check",
          },
          {
            label: "Understanding triggers helps me respond skillfully instead of automatically",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Internal Triggers",
        items: [
          {
            label: "Worry thoughts or catastrophic thinking",
            kind: "check",
          },
          {
            label: "Physical sensations (racing heart, dizziness, etc.)",
            kind: "check",
          },
          {
            label: "Memories of past anxiety or trauma",
            kind: "check",
          },
          {
            label: "Hunger or blood sugar fluctuations",
            kind: "check",
          },
          {
            label: "Fatigue or sleep deprivation",
            kind: "check",
          },
          {
            label: "Pain or illness",
            kind: "check",
          },
          {
            label: "Other emotions (sadness, anger, overwhelm)",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My External Triggers",
        items: [
          {
            label: "Caffeine or other stimulants",
            kind: "check",
          },
          {
            label: "Sleep deprivation",
            kind: "check",
          },
          {
            label: "Stressful situations (work, conflicts, deadlines)",
            kind: "check",
          },
          {
            label: "Social situations or certain people",
            kind: "check",
          },
          {
            label: "Specific places or locations",
            kind: "check",
          },
          {
            label: "Crowded or overwhelming environments",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Trigger Response Plan",
        items: [
          {
            label: "When I notice a trigger, I will: (write your response plan)",
            kind: "shortText",
            inputId: "trigger_response_plan",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
