import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Body-First Regulation" lesson definitions.
 *
 * Phase 3: Regulation - Module 8
 *
 * These lessons help users learn body-first regulation skills. They cover:
 * - Breath (what helps vs what backfires)
 * - Temperature, movement, grounding
 * - Why regulation ≠ relaxation
 *
 * Connects directly to your **mini interventions**
 */
export const BODY_FIRST_REGULATION_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Why Body-First Regulation Works
   *
   * Format: Card lesson
   * Focus: Understanding why regulating the body first is effective
   */
  body_first_regulation_why_works: {
    id: "body_first_regulation_why_works",
    moduleId: "body_first_regulation",
    title: "Why Body-First Regulation Works",
    goal: "Understand why regulating your body first is effective for anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When anxiety spikes, your body activates first. Your heart races, your breath gets fast, your muscles tense. Trying to think your way out of anxiety doesn't work because your body is already activated.",
      },
      {
        type: "text",
        body: "Body-first regulation works because it addresses anxiety where it lives—in your body. When you regulate your body, your mind follows. When you calm your nervous system, your thoughts slow down.",
      },
      {
        type: "tip",
        body: "Body-first regulation = Working with your body to send safety signals to your nervous system, which then calms your mind.",
      },
      {
        type: "text",
        body: "Think of it like this: If your house is on fire, you don't sit down to think about it—you put out the fire. When your body is activated, you don't try to think your way out—you regulate your body first.",
      },
      {
        type: "text",
        body: "Your nervous system responds to physical signals faster than it responds to thoughts. Slow breathing sends a stronger safety signal than telling yourself 'I'm safe.' Movement, temperature, and grounding all send physical signals that your nervous system understands.",
      },
      {
        type: "tip",
        body: "Physical signals (breath, movement, temperature) speak directly to your nervous system. Thoughts have to go through more processing.",
      },
      {
        type: "text",
        body: "Body-first regulation doesn't mean you ignore your thoughts. It means you address your body first, which makes it easier to work with your thoughts. A regulated body can think more clearly.",
      },
      {
        type: "text",
        body: "The goal isn't to eliminate anxiety—it's to regulate your nervous system so you can think clearly and respond skillfully. Body-first regulation gives you that foundation.",
      },
      {
        type: "text",
        body: "Remember: Regulation ≠ relaxation. You don't have to be completely relaxed to be regulated. Regulation means your nervous system is in a manageable state, not necessarily a calm state.",
      },
      {
        type: "tip",
        body: "Regulation = Your nervous system is manageable, not necessarily calm. You can be regulated and still feel some anxiety.",
      },
      {
        type: "text",
        body: "Body-first regulation is a skill you can practice. The more you practice, the better you get at it. And the better you get, the more options you have when anxiety shows up.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Breath: What Helps vs What Backfires
   *
   * Format: Card lesson
   * Focus: Understanding effective vs ineffective breathing techniques
   */
  body_first_regulation_breath: {
    id: "body_first_regulation_breath",
    moduleId: "body_first_regulation",
    title: "Breath: What Helps vs What Backfires",
    goal: "Learn effective breathing techniques and avoid what backfires",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Breathing is one of the most powerful body-first regulation tools. But not all breathing is created equal. Some techniques help, and some can backfire.",
      },
      {
        type: "text",
        body: "What helps: Slow, controlled breathing. Breathing slower than your anxiety wants you to breathe sends a safety signal to your nervous system. Box breathing (4-4-4-4) or physiological sigh (two short inhales, one long exhale) are effective.",
      },
      {
        type: "tip",
        body: "Slow breathing = Safety signal. Fast breathing = Threat signal. Slower is better.",
      },
      {
        type: "text",
        body: "What backfires: Trying to breathe perfectly, holding your breath, or forcing your breath. When you try to control your breath too much, you create tension, which your nervous system interprets as more threat.",
      },
      {
        type: "text",
        body: "The key is gentle guidance, not forceful control. You're not trying to make your breath perfect—you're just slowing it down slightly, letting your body do the rest.",
      },
      {
        type: "tip",
        body: "Gentle guidance works. Forceful control backfires. Let your body breathe, just slower.",
      },
      {
        type: "text",
        body: "If breathing makes you more anxious, that's okay. Some people find that focusing on breath increases anxiety. In that case, try movement, temperature, or grounding instead.",
      },
      {
        type: "text",
        body: "Breathing works best when you're not trying too hard. It's about creating a rhythm that your nervous system recognizes as safe, not about achieving perfect breath control.",
      },
      {
        type: "text",
        body: "Practice breathing when you're not anxious. The more you practice when you're calm, the easier it is to use when you're anxious. It's like building a muscle—regular practice makes it stronger.",
      },
      {
        type: "text",
        body: "Remember: Breathing is a tool, not a cure. It helps regulate your nervous system, which makes it easier to work with anxiety. But it's not about making anxiety disappear—it's about creating space to respond skillfully.",
      },
      {
        type: "tip",
        body: "Breathing = Regulation tool, not anxiety cure. It creates space for skillful response.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Temperature, Movement, and Grounding
   *
   * Format: Card lesson
   * Focus: Understanding other body-first regulation tools
   */
  body_first_regulation_other_tools: {
    id: "body_first_regulation_other_tools",
    moduleId: "body_first_regulation",
    title: "Temperature, Movement, and Grounding",
    goal: "Learn other body-first regulation tools beyond breathing",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Breathing isn't the only body-first regulation tool. Temperature, movement, and grounding can all send safety signals to your nervous system.",
      },
      {
        type: "text",
        body: "Temperature changes can interrupt anxiety. Cold water on your face or wrists, holding something cold, or even splashing cold water can shift your nervous system's attention away from anxiety.",
      },
      {
        type: "tip",
        body: "Cold = Strong signal that interrupts anxiety. Your nervous system pays attention to temperature changes.",
      },
      {
        type: "text",
        body: "Movement can regulate your nervous system. Gentle movement like walking, shaking your hands, or stretching can help discharge excess energy and send safety signals. Your body is designed to move, and movement can help regulate activation.",
      },
      {
        type: "text",
        body: "Grounding connects you to the present moment through your senses. Noticing what you can see, hear, touch, smell, or taste pulls your attention away from anxious thoughts and into your body and environment.",
      },
      {
        type: "tip",
        body: "Grounding = Using your senses to anchor in the present moment, away from anxious thoughts.",
      },
      {
        type: "text",
        body: "These tools work because they send physical signals that your nervous system understands. They don't require thinking—they work directly with your body.",
      },
      {
        type: "text",
        body: "You can combine tools. For example, you might use cold water while breathing slowly, or walk while practicing grounding. Combining tools can be more effective than using one alone.",
      },
      {
        type: "text",
        body: "Different tools work for different people and different situations. If breathing doesn't help, try movement. If movement doesn't help, try temperature. Experiment to find what works for you.",
      },
      {
        type: "text",
        body: "The key is using these tools to regulate, not to escape. You're not trying to make anxiety disappear—you're trying to regulate your nervous system so you can respond skillfully.",
      },
      {
        type: "tip",
        body: "Body-first tools = Regulation, not escape. They help you manage anxiety, not avoid it.",
      },
      {
        type: "text",
        body: "Practice these tools when you're not anxious. The more you practice, the easier they are to use when you need them. Build your toolkit so you have options when anxiety shows up.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Body-First Regulation
   *
   * Format: Practice lesson
   * Focus: Experiential practice in body-first regulation
   */
  body_first_regulation_practicing: {
    id: "body_first_regulation_practicing",
    moduleId: "body_first_regulation",
    title: "Practicing Body-First Regulation",
    goal: "Practice body-first regulation techniques",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice body-first regulation. We'll start with breathing, then try other tools. Remember: gentle guidance, not forceful control.",
      },
      {
        t: "instruction",
        body: "First, notice your breath right now. Is it fast? Slow? Shallow? Deep? Just notice without trying to change it.",
      },
      { t: "timer", seconds: 15, label: "Notice your breath" },
      {
        t: "instruction",
        body: "Now, gently slow your breath down. Don't force it—just guide it to be slightly slower. Inhale slowly, exhale slowly. Let your body do the work.",
      },
      { t: "breath", pattern: "box", rounds: 4 },
      {
        t: "instruction",
        body: "Notice how that feels. Did your nervous system respond? You don't need to be completely calm—just notice if there's any shift.",
      },
      { t: "timer", seconds: 15, label: "Notice any shifts" },
      {
        t: "instruction",
        body: "Now let's try grounding. Look around and name 5 things you can see. Notice their colors, shapes, textures.",
      },
      { t: "timer", seconds: 30, label: "Name 5 things you can see" },
      {
        t: "instruction",
        body: "Now notice 3 things you can hear. Sounds near or far, loud or quiet. Just notice them.",
      },
      { t: "timer", seconds: 20, label: "Notice 3 sounds" },
      {
        t: "instruction",
        body: "Now notice what you can feel. Your feet on the floor, your body in the chair, your clothes on your skin. Feel the physical contact with your environment.",
      },
      { t: "timer", seconds: 20, label: "Notice physical sensations" },
      {
        t: "instruction",
        body: "Notice how grounding pulls your attention into the present moment, away from anxious thoughts. This is body-first regulation—working with your body to regulate your mind.",
      },
      {
        t: "instruction",
        body: "Remember: These are tools you can use anytime. Practice them when you're calm so they're easier to use when you're anxious. Build your toolkit.",
      },
      {
        t: "check",
        prompt: "I can use body-first regulation tools to help manage anxiety.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Body-First Regulation Toolkit
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for body-first regulation tools
   */
  body_first_regulation_build_toolkit: {
    id: "body_first_regulation_build_toolkit",
    moduleId: "body_first_regulation",
    title: "Building Your Body-First Regulation Toolkit",
    goal: "Create a personal reference for your body-first regulation tools",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label:
              "Body-first regulation works because it addresses anxiety where it lives—in the body",
            kind: "check",
          },
          {
            label: "Regulation ≠ relaxation—I can be regulated without being completely calm",
            kind: "check",
          },
          {
            label: "Gentle guidance works; forceful control backfires",
            kind: "check",
          },
          {
            label: "Practice when calm makes tools easier to use when anxious",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Breathing Tools",
        items: [
          {
            label: "Box breathing (4-4-4-4)",
            kind: "check",
          },
          {
            label: "Physiological sigh (two short inhales, one long exhale)",
            kind: "check",
          },
          {
            label: "Slow, controlled breathing",
            kind: "check",
          },
          {
            label: "Other breathing techniques",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Temperature Tools",
        items: [
          {
            label: "Cold water on face or wrists",
            kind: "check",
          },
          {
            label: "Holding something cold",
            kind: "check",
          },
          {
            label: "Splashing cold water",
            kind: "check",
          },
          {
            label: "Other temperature techniques",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Movement Tools",
        items: [
          {
            label: "Walking",
            kind: "check",
          },
          {
            label: "Shaking hands or body",
            kind: "check",
          },
          {
            label: "Stretching",
            kind: "check",
          },
          {
            label: "Gentle movement",
            kind: "check",
          },
          {
            label: "Other movement techniques",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Grounding Tools",
        items: [
          {
            label: "5-4-3-2-1 senses (5 things I see, 4 I feel, 3 I hear, 2 I smell, 1 I taste)",
            kind: "check",
          },
          {
            label: "Noticing physical contact (feet on floor, body in chair)",
            kind: "check",
          },
          {
            label: "Naming things I can see, hear, feel",
            kind: "check",
          },
          {
            label: "Other grounding techniques",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Go-To Tools",
        items: [
          {
            label: "Write your top 3 go-to body-first regulation tools and when you'll use them",
            kind: "shortText",
            inputId: "go_to_tools",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
