import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Safety Behaviors" lesson definitions.
 *
 * Phase 2: Awareness - Module 7
 *
 * These lessons help users understand safety behaviors and why they reinforce anxiety.
 * They cover:
 * - What they are (checking, reassurance, avoidance)
 * - Why they *feel* helpful but reinforce anxiety
 * - Gentle self-recognition (no shame)
 *
 * Understanding safety behaviors can be helpful for many people working on anxiety.
 */
export const SAFETY_BEHAVIORS_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. What Are Safety Behaviors?
   *
   * Format: Card lesson
   * Focus: Understanding what safety behaviors are and recognizing them
   */
  safety_behaviors_what_are_they: {
    id: "safety_behaviors_what_are_they",
    moduleId: "safety_behaviors",
    title: "What Are Safety Behaviors?",
    goal: "Understand what safety behaviors are and how to recognize them",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Safety behaviors are things you do to try to feel safer or reduce anxiety in the moment. They feel helpful, but they actually reinforce anxiety in the long run.",
      },
      {
        type: "text",
        body: "Common safety behaviors include: checking things repeatedly (locks, emails, symptoms), seeking reassurance from others, avoiding situations or places, or having escape plans. (Note: Carrying necessary medications as prescribed by a doctor is not a safety behavior—always follow your healthcare provider's guidance.)",
      },
      {
        type: "tip",
        body: "Safety behaviors = Things you do to try to feel safer. They work in the short term but reinforce anxiety in the long term.",
      },
      {
        type: "text",
        body: "Checking is a common safety behavior. You might check if doors are locked, if you turned off the stove, if you have your phone, or if you're having symptoms. Each check provides temporary relief, but it reinforces the belief that checking is necessary.",
      },
      {
        type: "text",
        body: "Reassurance-seeking is another safety behavior. You might ask others if you're okay, if something is normal, or if you should be worried. The reassurance feels good temporarily, but it reinforces the belief that you need external confirmation to feel safe.",
      },
      {
        type: "text",
        body: "Avoidance is a major safety behavior. You might avoid situations, places, or activities that trigger anxiety. Avoidance works—you don't feel anxious if you don't do the thing. But it reinforces the belief that the thing is dangerous and that you can't handle it.",
      },
      {
        type: "tip",
        body: "Avoidance = Short-term relief, long-term reinforcement. Every time you avoid, you're teaching your brain that avoidance is necessary.",
      },
      {
        type: "text",
        body: "Carrying safety items or having escape plans can also be safety behaviors. If you always need water, your phone, or an escape route to feel safe, you're reinforcing the belief that you can't handle situations without these things.",
      },
      {
        type: "text",
        body: "The key insight: Safety behaviors feel helpful because they reduce anxiety in the moment. But they reinforce anxiety in the long run because they prevent you from learning that you can handle anxiety without them.",
      },
      {
        type: "text",
        body: "Understanding safety behaviors is crucial because they're often invisible to you. You might not realize you're doing them, or you might think they're just 'being careful' or 'being prepared.'",
      },
      {
        type: "text",
        body: "The goal isn't to judge yourself for safety behaviors—they make sense! The goal is to recognize them, understand how they work, and gradually reduce them so you can learn that you can handle anxiety without them.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Safety Behaviors Reinforce Anxiety
   *
   * Format: Card lesson
   * Focus: Understanding the mechanism by which safety behaviors reinforce anxiety
   */
  safety_behaviors_why_reinforce: {
    id: "safety_behaviors_why_reinforce",
    moduleId: "safety_behaviors",
    title: "Why Safety Behaviors Reinforce Anxiety",
    goal: "Understand how safety behaviors actually make anxiety worse over time",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Safety behaviors feel helpful because they reduce anxiety in the moment. But here's the problem: They reinforce anxiety in the long run by preventing you from learning that you can handle anxiety without them.",
      },
      {
        type: "text",
        body: "Here's how it works: When you use a safety behavior and anxiety goes down, your brain learns: 'I needed that safety behavior to feel safe.' It doesn't learn: 'I can handle anxiety on my own.'",
      },
      {
        type: "tip",
        body: "Safety behaviors teach your brain that you need them to be safe, not that you can handle anxiety without them.",
      },
      {
        type: "text",
        body: "For example, if you always check if doors are locked and then feel relief, your brain learns that checking is necessary. It doesn't learn that you can feel safe without checking.",
      },
      {
        type: "text",
        body: "If you always seek reassurance and then feel better, your brain learns that reassurance is necessary. It doesn't learn that you can handle uncertainty without reassurance.",
      },
      {
        type: "text",
        body: "If you always avoid situations and then don't feel anxious, your brain learns that avoidance is necessary. It doesn't learn that you can handle the situation even if you feel anxious.",
      },
      {
        type: "tip",
        body: "Every time you use a safety behavior, you're reinforcing the belief that you need it. The more you use it, the stronger the belief becomes.",
      },
      {
        type: "text",
        body: "Safety behaviors also prevent you from learning that anxiety passes on its own. If you always do something to reduce anxiety, you never learn that anxiety would have passed anyway.",
      },
      {
        type: "text",
        body: "The paradox: Safety behaviors work in the short term (they reduce anxiety), which is why you keep using them. But they make anxiety worse in the long term (they reinforce the need for them).",
      },
      {
        type: "text",
        body: "Breaking free from safety behaviors means learning to tolerate anxiety without doing anything to reduce it. It means learning that you can handle anxiety on your own, without checking, reassurance, avoidance, or safety items.",
      },
      {
        type: "text",
        body: "This is hard work, and it's normal to feel resistant. Safety behaviors feel necessary because they've worked before. But the goal is to learn that you don't need them—that you can handle anxiety without them.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Recognizing Your Safety Behaviors
   *
   * Format: Practice lesson
   * Focus: Experiential practice in identifying personal safety behaviors
   */
  safety_behaviors_recognizing: {
    id: "safety_behaviors_recognizing",
    moduleId: "safety_behaviors",
    title: "Recognizing Your Safety Behaviors",
    goal: "Practice identifying your personal safety behaviors",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Safety behaviors are often invisible to you because they feel like 'being careful' or 'being prepared.' Let's practice recognizing them.",
      },
      {
        t: "instruction",
        body: "Think about what you do to try to feel safer or reduce anxiety. Do you check things? Seek reassurance? Avoid situations? Carry safety items?",
      },
      { t: "timer", seconds: 45, label: "Identify your safety behaviors" },
      {
        t: "instruction",
        body: "Now think about checking behaviors. Do you check locks, emails, symptoms, or other things repeatedly? Each check might feel necessary, but it's actually a safety behavior.",
      },
      { t: "timer", seconds: 30, label: "Identify checking behaviors" },
      {
        t: "instruction",
        body: "Think about reassurance-seeking. Do you ask others if you're okay, if something is normal, or if you should be worried? Do you Google symptoms or search for answers?",
      },
      { t: "timer", seconds: 30, label: "Identify reassurance-seeking" },
      {
        t: "instruction",
        body: "Think about avoidance. What situations, places, or activities do you avoid because of anxiety? Each avoidance is a safety behavior that reinforces the belief that the thing is dangerous.",
      },
      { t: "timer", seconds: 45, label: "Identify avoidance behaviors" },
      {
        t: "instruction",
        body: "Think about safety items or escape plans. Do you always need certain things with you to feel safe? Do you always need an escape route? These are also safety behaviors.",
      },
      { t: "timer", seconds: 30, label: "Identify safety items or escape plans" },
      {
        t: "instruction",
        body: "Notice how these behaviors feel necessary. That's the trap—they feel helpful, so you keep using them. But they're actually reinforcing anxiety in the long run.",
      },
      {
        t: "instruction",
        body: "Remember: There's no shame in safety behaviors. They make sense! The goal is just to recognize them so you can gradually reduce them and learn that you can handle anxiety without them.",
      },
      {
        t: "check",
        prompt: "I can recognize my safety behaviors and understand they're reinforcing anxiety.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. My Safety Behaviors
   *
   * Format: Journal lesson
   * Focus: Personal reflection on safety behaviors
   */
  safety_behaviors_my_behaviors: {
    id: "safety_behaviors_my_behaviors",
    moduleId: "safety_behaviors",
    title: "My Safety Behaviors",
    goal: "Document your personal safety behaviors and understand their impact",
    format: "journal",
    template: "custom",
    fields: [
      {
        name: "checking_behaviors",
        kind: "longText",
        label:
          "What checking behaviors do you engage in? (e.g., checking locks, emails, symptoms, phone) How often?",
        minWords: 25,
      },
      {
        name: "reassurance_seeking",
        kind: "longText",
        label:
          "How do you seek reassurance? (e.g., asking others, Googling symptoms, searching for answers) What do you need reassurance about?",
        minWords: 25,
      },
      {
        name: "avoidance_behaviors",
        kind: "longText",
        label:
          "What do you avoid because of anxiety? (situations, places, activities, people) How has avoidance affected your life?",
        minWords: 25,
      },
      {
        name: "safety_items",
        kind: "longText",
        label:
          "What safety items do you carry or what escape plans do you have? (Note: Prescribed medications should always be carried as directed by your doctor.)",
        minWords: 20,
      },
      {
        name: "impact",
        kind: "longText",
        label:
          "How have safety behaviors affected your life? How do they reinforce anxiety? What would it be like to reduce them?",
        minWords: 25,
      },
    ],
    autosaveTag: "safety_behaviors",
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Safety Behavior Awareness
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for safety behaviors
   */
  safety_behaviors_build_awareness: {
    id: "safety_behaviors_build_awareness",
    moduleId: "safety_behaviors",
    title: "Building Your Safety Behavior Awareness",
    goal: "Create a personal reference for your safety behaviors",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Safety behaviors feel helpful but reinforce anxiety in the long run",
            kind: "check",
          },
          {
            label: "Safety behaviors prevent me from learning I can handle anxiety without them",
            kind: "check",
          },
          {
            label: "There's no shame in safety behaviors—they make sense",
            kind: "check",
          },
          {
            label: "The goal is to gradually reduce safety behaviors to learn I don't need them",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Checking Behaviors",
        items: [
          {
            label: "Checking locks, doors, or windows",
            kind: "check",
          },
          {
            label: "Checking emails, messages, or notifications",
            kind: "check",
          },
          {
            label: "Checking physical symptoms or health",
            kind: "check",
          },
          {
            label: "Checking if I have my phone, keys, wallet",
            kind: "check",
          },
          {
            label: "Checking if appliances are off (stove, lights, etc.)",
            kind: "check",
          },
          {
            label: "Other checking behaviors",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Reassurance-Seeking Behaviors",
        items: [
          {
            label: "Asking others if I'm okay or if something is normal",
            kind: "check",
          },
          {
            label: "Googling symptoms or searching for answers",
            kind: "check",
          },
          {
            label: "Seeking validation or confirmation from others",
            kind: "check",
          },
          {
            label: "Reading about anxiety or health to feel reassured",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Avoidance Behaviors",
        items: [
          {
            label: "Avoiding certain situations or places",
            kind: "check",
          },
          {
            label: "Avoiding social situations or people",
            kind: "check",
          },
          {
            label: "Avoiding activities or experiences",
            kind: "check",
          },
          {
            label: "Avoiding thoughts or feelings",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Safety Items or Escape Plans",
        items: [
          {
            label: "Always carrying water, phone, or medication",
            kind: "check",
          },
          {
            label: "Always needing an escape route or exit plan",
            kind: "check",
          },
          {
            label: "Always having someone available for support",
            kind: "check",
          },
          {
            label: "Other safety items or plans",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Plan to Reduce Safety Behaviors",
        items: [
          {
            label: "Write one safety behavior you want to gradually reduce and how you'll do it",
            kind: "shortText",
            inputId: "reduction_plan",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
