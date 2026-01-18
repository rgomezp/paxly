import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Building Self-Trust" lesson definitions.
 *
 * Phase 6: Integration - Module 17
 *
 * These lessons help users build self-trust and confidence.
 * They cover:
 * - "I can handle discomfort"
 * - Evidence-based confidence
 * - Panic memories reprocessed
 */
export const BUILDING_SELF_TRUST_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. What Is Self-Trust?
   *
   * Format: Card lesson
   * Focus: Understanding self-trust and why it matters
   */
  building_self_trust_what_is_it: {
    id: "building_self_trust_what_is_it",
    moduleId: "building_self_trust",
    title: "What Is Self-Trust?",
    goal: "Understand self-trust and why it matters for anxiety recovery",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Self-trust is the belief that you can handle what comes your way, even when it's difficult. It's confidence based on evidence, not wishful thinking.",
      },
      {
        type: "text",
        body: "When you have self-trust, you know you can handle anxiety, discomfort, and uncertainty. You don't have to eliminate these things—you trust that you can manage them.",
      },
      {
        type: "tip",
        body: "Self-trust = Belief that you can handle difficulty, based on evidence, not just hope.",
      },
      {
        type: "text",
        body: "Self-trust is different from blind confidence. It's not about thinking nothing bad will happen. It's about knowing that even if something difficult happens, you can handle it.",
      },
      {
        type: "text",
        body: "When you lack self-trust, every anxiety episode feels like proof you can't handle it. When you have self-trust, anxiety episodes become evidence that you can handle it—because you've handled them before.",
      },
      {
        type: "text",
        body: "Self-trust is built through experience. Every time you face something difficult and get through it, you're building evidence that you can handle it. That evidence becomes self-trust.",
      },
      {
        type: "tip",
        body: "Self-trust = Built through experience. Every time you handle difficulty, you build evidence.",
      },
      {
        type: "text",
        body: "The more you practice facing anxiety, discomfort, and uncertainty, the more evidence you collect. The more evidence, the stronger your self-trust becomes.",
      },
      {
        type: "text",
        body: "Self-trust doesn't mean you never feel anxious or uncertain. It means you trust that you can handle those feelings, that you've done it before and you can do it again.",
      },
      {
        type: "text",
        body: "Remember: Self-trust is a skill you can build. Every small step toward facing difficulty is a step toward stronger self-trust.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. "I Can Handle Discomfort"
   *
   * Format: Card lesson
   * Focus: Building the belief that you can handle discomfort
   */
  building_self_trust_handle_discomfort: {
    id: "building_self_trust_handle_discomfort",
    moduleId: "building_self_trust",
    title: "'I Can Handle Discomfort'",
    goal: "Build the belief that you can handle discomfort",
    format: "card",
    cards: [
      {
        type: "text",
        body: "'I can handle discomfort' is a powerful belief. When you truly believe this, anxiety loses much of its power because you're not afraid of the discomfort itself.",
      },
      {
        type: "text",
        body: "Think about it: Most of the fear in anxiety isn't about the situation—it's about the discomfort. 'What if I feel anxious?' 'What if I panic?' 'What if I can't handle it?'",
      },
      {
        type: "tip",
        body: "Most anxiety fear = Fear of discomfort. 'What if I can't handle feeling anxious?'",
      },
      {
        type: "text",
        body: "Here's something to consider: You may have handled discomfort before. Past anxiety episodes you've gotten through can be evidence. Many people find they can handle more discomfort than they initially thought.",
      },
      {
        type: "text",
        body: "The more you practice handling discomfort, the stronger this belief becomes. Every time you feel anxious and still take action, you're building evidence: 'I can handle discomfort.'",
      },
      {
        type: "tip",
        body: "Every time you handle discomfort = Evidence you can handle it. Evidence builds self-trust.",
      },
      {
        type: "text",
        body: "You don't have to like discomfort. You just have to trust that you can handle it. That trust is what allows you to take action even when you're anxious.",
      },
      {
        type: "text",
        body: "Practice this belief: 'I can handle discomfort.' Say it to yourself. Notice when you've handled discomfort before. Build evidence for this belief.",
      },
      {
        type: "text",
        body: "The more you believe 'I can handle discomfort,' the less power anxiety has. You're not trying to eliminate discomfort—you're trusting that you can handle it.",
      },
      {
        type: "tip",
        body: "Believing 'I can handle discomfort' = Less fear of anxiety. You're not trying to eliminate it—you're trusting you can handle it.",
      },
      {
        type: "text",
        body: "Remember: You don't have to eliminate discomfort to live your life. You just have to trust that you can handle it. That trust is self-trust.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Evidence-Based Confidence
   *
   * Format: Card lesson
   * Focus: Understanding how to build confidence from evidence
   */
  building_self_trust_evidence_based: {
    id: "building_self_trust_evidence_based",
    moduleId: "building_self_trust",
    title: "Evidence-Based Confidence",
    goal: "Learn to build confidence from actual evidence",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Confidence isn't something you fake until you make it. It's something you build from evidence. Every time you handle something difficult, you're collecting evidence for confidence.",
      },
      {
        type: "text",
        body: "Think about your evidence: Every anxiety episode you've survived. Every panic attack you've gotten through. Every time you felt anxious and still took action. That's all evidence.",
      },
      {
        type: "tip",
        body: "Evidence = Every time you've handled difficulty. Every anxiety episode survived is evidence you can handle it.",
      },
      {
        type: "text",
        body: "The problem is that we often focus on the times we struggled, not the times we succeeded. But every time you got through anxiety is a success. Every time you handled discomfort is evidence.",
      },
      {
        type: "text",
        body: "Start collecting your evidence. Make a list: Times you felt anxious and handled it. Times you faced something difficult and got through it. Times you chose values over comfort.",
      },
      {
        type: "tip",
        body: "Collect evidence = Notice times you've handled difficulty. Every success is evidence for confidence.",
      },
      {
        type: "text",
        body: "Evidence-based confidence is different from blind optimism. It's not 'I hope I can handle this.' It's 'I've handled this before, I can handle it again.'",
      },
      {
        type: "text",
        body: "The more evidence you collect, the stronger your confidence becomes. You're not trying to convince yourself—you're recognizing what you've already done.",
      },
      {
        type: "text",
        body: "Remember: You don't need to be perfect. You just need evidence. Every small step, every time you handled something difficult, is evidence that builds confidence.",
      },
      {
        type: "tip",
        body: "Evidence-based confidence = Recognizing what you've done, not hoping for what you might do.",
      },
      {
        type: "text",
        body: "The more you practice collecting evidence, the easier it becomes to trust yourself. You're not trying to be confident—you're recognizing that you already have evidence for confidence.",
      },
      {
        type: "text",
        body: "Panic memories are powerful evidence. When you remember a panic attack, you might think it's proof of weakness. But it's actually proof of strength—you survived it, you got through it.",
      },
      {
        type: "tip",
        body: "Panic memories can be reframed as evidence that you got through a difficult experience. Many people find this perspective helpful.",
      },
      {
        type: "text",
        body: "Reprocessing panic memories means reframing them as evidence. Instead of 'That was terrible and I couldn't handle it,' think: 'That was intense, and I got through it. I can handle intensity.'",
      },
      {
        type: "text",
        body: "The more you reprocess these memories, the less scary they become. They become evidence of your strength instead of proof of your weakness. Every panic attack you survived is evidence you can handle intensity.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Building Your Self-Trust Evidence
   *
   * Format: Practice lesson
   * Focus: Experiential practice in collecting evidence for self-trust
   */
  building_self_trust_collecting_evidence: {
    id: "building_self_trust_collecting_evidence",
    moduleId: "building_self_trust",
    title: "Building Your Self-Trust Evidence",
    goal: "Practice collecting evidence for self-trust",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice building self-trust by collecting evidence. Every time you've handled difficulty is evidence that you can handle it.",
      },
      {
        t: "instruction",
        body: "Think about anxiety episodes you've survived. Every panic attack you got through. Every time you felt anxious and still took action. What comes to mind?",
      },
      { t: "timer", seconds: 45, label: "Recall anxiety episodes you've survived" },
      {
        t: "instruction",
        body: "Now think about times you faced something difficult. Maybe you avoided something and then faced it. Maybe you chose values over comfort. What evidence do you have?",
      },
      { t: "timer", seconds: 45, label: "Recall times you faced difficulty" },
      {
        t: "instruction",
        body: "Notice how each of these is evidence. Every time you handled discomfort, every time you got through anxiety, every time you faced something difficult—that's all evidence you can handle it.",
      },
      { t: "timer", seconds: 30, label: "Notice the evidence" },
      {
        t: "instruction",
        body: "Now think about a panic attack or intense anxiety episode. Instead of focusing on how terrible it was, focus on the fact that you got through it. That's evidence of strength.",
      },
      { t: "timer", seconds: 45, label: "Reprocess a panic memory as evidence" },
      {
        t: "instruction",
        body: "Practice the belief: 'I can handle discomfort.' Think about all the evidence you just collected. You've handled discomfort before. You can handle it again.",
      },
      { t: "timer", seconds: 30, label: "Practice the belief" },
      {
        t: "instruction",
        body: "Remember: Self-trust is built from evidence. Every time you handle difficulty, you're building more evidence. The more evidence, the stronger your self-trust.",
      },
      {
        t: "instruction",
        body: "The more you practice collecting evidence, the easier it becomes to trust yourself. You're not trying to be confident—you're recognizing that you already have evidence for confidence.",
      },
      {
        t: "check",
        prompt: "I can collect evidence for self-trust and recognize that I can handle discomfort.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Self-Trust Foundation
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for self-trust
   */
  building_self_trust_build_foundation: {
    id: "building_self_trust_build_foundation",
    moduleId: "building_self_trust",
    title: "Building Your Self-Trust Foundation",
    goal: "Create a personal reference for your self-trust evidence",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Self-trust is the belief I can handle difficulty, based on evidence",
            kind: "check",
          },
          {
            label: "I can handle discomfort—I've done it before",
            kind: "check",
          },
          {
            label: "Confidence comes from evidence, not wishful thinking",
            kind: "check",
          },
          {
            label: "Every panic attack I've survived is evidence of strength",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Evidence: Times I've Handled Anxiety",
        items: [
          {
            label: "Panic attacks I've survived",
            kind: "check",
          },
          {
            label: "Anxiety episodes I've gotten through",
            kind: "check",
          },
          {
            label: "Times I felt anxious and still took action",
            kind: "check",
          },
          {
            label: "Times I chose values over comfort",
            kind: "check",
          },
          {
            label: "Times I faced something I was avoiding",
            kind: "check",
          },
          {
            label: "Other evidence of handling difficulty",
            kind: "check",
          },
        ],
        minRequired: 3,
      },
      {
        title: "My Reprocessed Panic Memories",
        items: [
          {
            label: "I can reframe panic memories as evidence of strength",
            kind: "check",
          },
          {
            label: "Every panic attack I survived proves I can handle intensity",
            kind: "check",
          },
          {
            label: "Panic memories are proof I got through it, not proof I'm weak",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Self-Trust Reminder",
        items: [
          {
            label:
              "Write a reminder you can use to build self-trust (e.g., 'I've handled this before, I can handle it again,' 'I can handle discomfort')",
            kind: "shortText",
            inputId: "self_trust_reminder",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
