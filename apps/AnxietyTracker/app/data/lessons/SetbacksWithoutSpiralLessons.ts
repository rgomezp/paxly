import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Setbacks Without Spiral" lesson definitions.
 *
 * Phase 6: Integration - Module 18
 *
 * These lessons help users understand setbacks and prevent spiraling.
 * They cover:
 * - Why flare-ups happen
 * - Stress stacking
 * - Relapse prevention without fear
 */
export const SETBACKS_WITHOUT_SPIRAL_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Understanding Setbacks
   *
   * Format: Card lesson
   * Focus: Understanding what setbacks are and why they're normal
   */
  setbacks_without_spiral_understanding: {
    id: "setbacks_without_spiral_understanding",
    moduleId: "setbacks_without_spiral",
    title: "Understanding Setbacks",
    goal: "Understand what setbacks are and why they're a normal part of recovery",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Setbacks are temporary increases in anxiety symptoms. They're not failures—they're part of the recovery process. Everyone experiences setbacks, even people who are doing well.",
      },
      {
        type: "text",
        body: "A setback might look like: Anxiety returning after a period of feeling better. Panic attacks coming back. Old patterns resurfacing. Increased worry or avoidance.",
      },
      {
        type: "tip",
        body: "Setbacks = Temporary increases in symptoms. They're normal, not failures.",
      },
      {
        type: "text",
        body: "The problem isn't the setback itself—it's how we respond to it. When we see a setback as proof that we're failing, we spiral. When we see it as a temporary fluctuation, we can handle it.",
      },
      {
        type: "text",
        body: "Setbacks don't mean you've lost progress. They don't mean you're back to square one. They're temporary fluctuations in a longer-term trend of improvement.",
      },
      {
        type: "tip",
        body: "Setbacks ≠ Lost progress. They're temporary fluctuations, not proof of failure.",
      },
      {
        type: "text",
        body: "Think about it like physical fitness: If you've been exercising regularly and then miss a week, you haven't lost all your progress. You might feel a bit out of shape, but you can get back on track. Anxiety recovery is similar.",
      },
      {
        type: "text",
        body: "The key is to respond to setbacks skillfully. Instead of panicking or giving up, you can recognize it as a setback, understand why it might be happening, and use your tools to get back on track.",
      },
      {
        type: "tip",
        body: "Skillful response to setbacks = Recognize, understand, use tools. Don't panic or give up.",
      },
      {
        type: "text",
        body: "Remember: Setbacks are normal. They're part of the process. The goal isn't to never have setbacks—it's to handle them without spiraling.",
      },
      {
        type: "text",
        body: "When you can handle setbacks without spiraling, you're building resilience. You're learning that temporary increases in anxiety don't mean you're failing—they mean you're human.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Why Flare-Ups Happen
   *
   * Format: Card lesson
   * Focus: Understanding the common causes of anxiety flare-ups
   */
  setbacks_without_spiral_why_flare_ups: {
    id: "setbacks_without_spiral_why_flare_ups",
    moduleId: "setbacks_without_spiral",
    title: "Why Flare-Ups Happen",
    goal: "Understand the common causes of anxiety flare-ups",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Flare-ups happen for many reasons. Understanding why can help you respond skillfully instead of panicking. Here are the most common causes:",
      },
      {
        type: "text",
        body: "1. Stress stacking: When multiple stressors pile up, your system gets overwhelmed. Work stress + relationship stress + lack of sleep + financial worry = Flare-up. It's not that you're failing—it's that your system is overloaded.",
      },
      {
        type: "tip",
        body: "Stress stacking = Multiple stressors piling up. Your system gets overwhelmed, not because you're failing, but because there's too much.",
      },
      {
        type: "text",
        body: "2. Life transitions: Big changes—even positive ones—can trigger flare-ups. Starting a new job, moving, relationship changes, health changes. Your system is adjusting, and anxiety can spike during adjustment periods.",
      },
      {
        type: "text",
        body: "3. Physical factors: Illness, lack of sleep, poor nutrition, hormonal changes. Your body and mind are connected—when your body is stressed, your anxiety system can flare up. (Note: Never change medications without consulting your healthcare provider.)",
      },
      {
        type: "tip",
        body: "Physical factors = Body stress affects anxiety. Illness, sleep, nutrition, hormones all matter.",
      },
      {
        type: "text",
        body: "4. Stopping tools: Sometimes when we're doing well, we stop using our tools. We think we don't need them anymore. But tools are maintenance, not just crisis management. Stopping them can lead to flare-ups.",
      },
      {
        type: "text",
        body: "5. Secondary anxiety: Anxiety about anxiety can cause flare-ups. 'What if my anxiety comes back?' 'What if I'm getting worse?' This worry itself can trigger anxiety, creating a flare-up.",
      },
      {
        type: "tip",
        body: "Secondary anxiety = Anxiety about anxiety. Worrying about anxiety coming back can trigger it.",
      },
      {
        type: "text",
        body: "6. Seasonal or cyclical patterns: Some people have seasonal patterns. Some have cyclical patterns related to life circumstances. Recognizing your patterns can help you prepare.",
      },
      {
        type: "text",
        body: "The key is: Flare-ups usually have reasons. They're not random failures. Understanding why can help you respond skillfully instead of catastrophizing.",
      },
      {
        type: "tip",
        body: "Flare-ups usually have reasons. Understanding why helps you respond skillfully, not catastrophize.",
      },
      {
        type: "text",
        body: "Remember: Flare-ups are temporary. They don't mean you're failing. They mean your system is responding to something—and you can respond skillfully to that response.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Stress Stacking
   *
   * Format: Card lesson
   * Focus: Understanding how stress accumulates and causes flare-ups
   */
  setbacks_without_spiral_stress_stacking: {
    id: "setbacks_without_spiral_stress_stacking",
    moduleId: "setbacks_without_spiral",
    title: "Stress Stacking",
    goal: "Understand how stress accumulates and causes anxiety flare-ups",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Stress stacking is when multiple stressors pile up and overwhelm your system. It's not that any single stressor is too much—it's that together, they exceed your capacity.",
      },
      {
        type: "text",
        body: "Think about it like a bucket: Each stressor adds water to the bucket. A little work stress? Fine. A little relationship stress? Fine. But work + relationship + sleep deprivation + financial worry + health concern? The bucket overflows.",
      },
      {
        type: "tip",
        body: "Stress stacking = Multiple stressors piling up. Like a bucket filling up—eventually it overflows.",
      },
      {
        type: "text",
        body: "When your stress bucket is full, your anxiety system becomes more reactive. Things that normally wouldn't trigger anxiety suddenly do. Small stressors feel big. Your system is already overwhelmed, so it responds more intensely.",
      },
      {
        type: "text",
        body: "This is why flare-ups can seem to come 'out of nowhere.' You might think: 'I was doing fine, why is this happening now?' But if you look at your stress bucket, you'll see it's been filling up.",
      },
      {
        type: "tip",
        body: "Flare-ups that seem 'out of nowhere' = Often stress stacking. Your bucket was filling up, and something small made it overflow.",
      },
      {
        type: "text",
        body: "The solution isn't to eliminate all stress—that's impossible. The solution is to recognize when your bucket is getting full and take steps to reduce stress or increase your capacity.",
      },
      {
        type: "text",
        body: "You can reduce stress by: Addressing what you can control. Setting boundaries. Saying no. Asking for help. Taking breaks. Prioritizing self-care.",
      },
      {
        type: "tip",
        body: "Reduce stress = Address what you can, set boundaries, say no, ask for help, take breaks.",
      },
      {
        type: "text",
        body: "You can increase capacity by: Using your regulation tools regularly. Getting enough sleep. Eating well. Exercising. Building resilience through practice.",
      },
      {
        type: "text",
        body: "The key is awareness: Notice when your stress bucket is getting full. Don't wait until it overflows. Take proactive steps to manage stress before it becomes overwhelming.",
      },
      {
        type: "tip",
        body: "Awareness = Notice when your bucket is getting full. Take proactive steps before it overflows.",
      },
      {
        type: "text",
        body: "Remember: Stress stacking is normal. Life has multiple stressors. The goal isn't to eliminate stress—it's to manage it skillfully so your bucket doesn't overflow.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Handling Setbacks Without Spiral
   *
   * Format: Practice lesson
   * Focus: Experiential practice in responding to setbacks skillfully
   */
  setbacks_without_spiral_handling: {
    id: "setbacks_without_spiral_handling",
    moduleId: "setbacks_without_spiral",
    title: "Handling Setbacks Without Spiral",
    goal: "Practice responding to setbacks skillfully without spiraling",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice handling setbacks without spiraling. The key is to recognize setbacks as temporary fluctuations, not proof of failure.",
      },
      {
        t: "instruction",
        body: "First, let's practice recognizing a setback. Think about a time you had an anxiety flare-up or setback. What did it feel like? What thoughts came up?",
      },
      { t: "timer", seconds: 45, label: "Recall a setback experience" },
      {
        t: "instruction",
        body: "Now, let's practice the skillful response. Instead of thinking 'This means I'm failing,' practice thinking 'This is a temporary setback. It's normal. I can handle it.'",
      },
      { t: "timer", seconds: 30, label: "Practice the skillful thought" },
      {
        t: "instruction",
        body: "Next, let's understand why. Think about what might have contributed to that setback. Was there stress stacking? Life transitions? Physical factors? Understanding why helps you respond skillfully.",
      },
      { t: "timer", seconds: 45, label: "Understand why the setback happened" },
      {
        t: "instruction",
        body: "Now, let's use your tools. When you have a setback, you don't need to panic—you can use your regulation tools. Practice using a tool right now, even if you're not anxious.",
      },
      { t: "timer", seconds: 60, label: "Practice using a regulation tool" },
      {
        t: "instruction",
        body: "Remember: Setbacks are temporary. They don't mean you've lost progress. Practice the belief: 'This is temporary. I've handled this before. I can handle it again.'",
      },
      { t: "timer", seconds: 30, label: "Practice the belief" },
      {
        t: "instruction",
        body: "Let's practice preventing spirals. When you notice catastrophic thoughts like 'This will never end' or 'I'm back to square one,' practice replacing them with: 'This is temporary. I can handle it.'",
      },
      { t: "timer", seconds: 45, label: "Practice preventing spirals" },
      {
        t: "instruction",
        body: "Finally, let's practice self-compassion. Setbacks are hard. It's okay to feel disappointed or frustrated. But you can also be kind to yourself: 'This is hard, and I'm doing my best. Setbacks are normal.'",
      },
      { t: "timer", seconds: 30, label: "Practice self-compassion" },
      {
        t: "instruction",
        body: "Remember: The goal isn't to never have setbacks. The goal is to handle them without spiraling. Every time you handle a setback skillfully, you're building resilience.",
      },
      {
        t: "check",
        prompt:
          "I can recognize setbacks as temporary fluctuations and respond skillfully without spiraling.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Reflecting on Setbacks
   *
   * Format: Journal lesson
   * Focus: Personal reflection on setbacks and how to handle them
   */
  setbacks_without_spiral_reflecting: {
    id: "setbacks_without_spiral_reflecting",
    moduleId: "setbacks_without_spiral",
    title: "Reflecting on Setbacks",
    goal: "Reflect on your experience with setbacks and how to handle them",
    format: "journal",
    fields: [
      {
        name: "setback_experience",
        label:
          "Think about a setback or flare-up you've experienced. What happened? What did it feel like?",
        kind: "longText",
      },
      {
        name: "setback_thoughts",
        label:
          "What thoughts came up during that setback? Did you spiral? What did you tell yourself?",
        kind: "longText",
      },
      {
        name: "setback_causes",
        label:
          "Looking back, what might have contributed to that setback? Was there stress stacking? Life transitions? Physical factors?",
        kind: "longText",
      },
      {
        name: "skillful_response",
        label:
          "If you could go back, how would you respond more skillfully? What would you think? What tools would you use?",
        kind: "longText",
      },
      {
        name: "setback_reminder",
        label:
          "Write a reminder you can use when you have a setback (e.g., 'This is temporary, I can handle it,' 'Setbacks are normal, not failures').",
        kind: "shortText",
      },
      {
        name: "stress_bucket",
        label:
          "Right now, how full is your stress bucket? What stressors are present? What can you do to reduce stress or increase capacity?",
        kind: "longText",
      },
    ],
    commitment: { text: "Finish" },
  },
}
