import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "Attention Skills" lesson definitions.
 *
 * Phase 3: Regulation - Module 9
 *
 * These lessons help users learn to work with attention skillfully. They cover:
 * - Why anxiety hijacks attention
 * - Grounding vs distraction
 * - How to shift attention *without avoidance*
 */
export const ATTENTION_SKILLS_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Why Anxiety Hijacks Attention
   *
   * Format: Card lesson
   * Focus: Understanding how anxiety takes over your attention
   */
  attention_skills_why_hijacks: {
    id: "attention_skills_why_hijacks",
    moduleId: "attention_skills",
    title: "Why Anxiety Hijacks Attention",
    goal: "Understand how anxiety takes over your attention and why",
    format: "card",
    cards: [
      {
        type: "text",
        body: "When anxiety shows up, it hijacks your attention. Your mind gets stuck on worry thoughts, physical sensations, or potential threats. It's hard to focus on anything else.",
      },
      {
        type: "text",
        body: "This happens because your survival system is designed to prioritize threats. When your brain detects potential danger (real or imagined), it redirects attention to that threat. It's trying to keep you safe.",
      },
      {
        type: "tip",
        body: "Anxiety hijacks attention because your brain prioritizes potential threats. It's trying to protect you, but it can get stuck.",
      },
      {
        type: "text",
        body: "The problem is that anxiety can hijack attention even when there's no real threat. Your brain treats worry thoughts and physical sensations as if they're actual dangers, pulling your attention away from everything else.",
      },
      {
        type: "text",
        body: "When attention is hijacked, you might notice: difficulty focusing on tasks, racing thoughts you can't stop, hypervigilance (scanning for threats), or feeling like your mind is stuck in a loop.",
      },
      {
        type: "text",
        body: "Understanding that anxiety hijacks attention helps you recognize what's happening. You're not broken or weak—your attention system is just doing its job, but it's stuck on a false alarm.",
      },
      {
        type: "tip",
        body: "Attention hijacking = Your brain prioritizing a false alarm. You're not broken—your attention system is just stuck.",
      },
      {
        type: "text",
        body: "The good news: You can learn to work with attention skillfully. You can't stop anxiety from trying to hijack attention, but you can learn to redirect it without fighting it.",
      },
      {
        type: "text",
        body: "The key is understanding the difference between helpful attention shifts (grounding, present-moment awareness) and unhelpful ones (distraction, avoidance). Both shift attention, but they work differently.",
      },
      {
        type: "text",
        body: "Grounding shifts attention to the present moment through your senses. Distraction shifts attention away from anxiety to something else. Both can help, but grounding is more sustainable because it doesn't require avoiding anxiety.",
      },
      {
        type: "text",
        body: "The goal isn't to never have your attention hijacked—that's not possible. The goal is to notice when it happens and skillfully redirect it back to what matters, without fighting or avoiding.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Grounding vs Distraction
   *
   * Format: Card lesson
   * Focus: Understanding the difference between helpful and unhelpful attention shifts
   */
  attention_skills_grounding_vs_distraction: {
    id: "attention_skills_grounding_vs_distraction",
    moduleId: "attention_skills",
    title: "Grounding vs Distraction",
    goal: "Understand the difference between grounding and distraction",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Both grounding and distraction shift your attention away from anxiety. But they work differently, and understanding the difference helps you choose the right tool for the moment.",
      },
      {
        type: "text",
        body: "Grounding shifts attention to the present moment through your senses. You notice what you can see, hear, feel, smell, or taste right now. You're not avoiding anxiety—you're anchoring in the present.",
      },
      {
        type: "tip",
        body: "Grounding = Shifting attention to the present moment through your senses. You're not avoiding—you're anchoring.",
      },
      {
        type: "text",
        body: "Distraction shifts attention away from anxiety to something else—a task, a show, a conversation. It can help in the moment, but it often requires avoiding anxiety, which can reinforce it.",
      },
      {
        type: "tip",
        body: "Distraction = Shifting attention away from anxiety to something else. It can help, but it often involves avoidance.",
      },
      {
        type: "text",
        body: "Grounding works because it connects you to the present moment, which is where safety actually exists. Anxiety is usually about the future (worry) or the past (trauma). The present moment is often safe.",
      },
      {
        type: "text",
        body: "Distraction works in the short term because it gives your nervous system a break from anxiety. But if you always need distraction to manage anxiety, you're reinforcing the belief that you can't handle anxiety directly.",
      },
      {
        type: "text",
        body: "The key difference: Grounding allows you to feel anxiety while shifting attention. Distraction often requires not feeling anxiety. Both can be useful, but grounding is more sustainable.",
      },
      {
        type: "text",
        body: "You can use both. Sometimes distraction is exactly what you need—a break from intense anxiety. But grounding is a skill you can use anytime, anywhere, without needing external resources.",
      },
      {
        type: "tip",
        body: "Both grounding and distraction can help. Grounding is more sustainable because it doesn't require avoiding anxiety.",
      },
      {
        type: "text",
        body: "The goal is to have options. Sometimes you need grounding to anchor in the present. Sometimes you need distraction to give yourself a break. The key is choosing skillfully, not automatically.",
      },
      {
        type: "text",
        body: "Practice grounding regularly so it becomes a skill you can use when anxiety hijacks your attention. The more you practice, the easier it becomes to redirect attention skillfully.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. Shifting Attention Without Avoidance
   *
   * Format: Card lesson
   * Focus: Learning to redirect attention skillfully
   */
  attention_skills_shifting_without_avoidance: {
    id: "attention_skills_shifting_without_avoidance",
    moduleId: "attention_skills",
    title: "Shifting Attention Without Avoidance",
    goal: "Learn to redirect attention skillfully without avoiding anxiety",
    format: "card",
    cards: [
      {
        type: "text",
        body: "The challenge with attention is learning to shift it without avoiding anxiety. You want to redirect attention skillfully, not escape from anxiety.",
      },
      {
        type: "text",
        body: "Here's the key: You can feel anxiety and still shift your attention. You don't have to make anxiety go away first. You can acknowledge it's there and then redirect attention to something else.",
      },
      {
        type: "tip",
        body: "You can feel anxiety and shift attention. You don't have to eliminate anxiety first—you can work with it while redirecting attention.",
      },
      {
        type: "text",
        body: "Grounding is the perfect example. When you ground, you're not trying to make anxiety disappear. You're acknowledging it's there and then shifting attention to your senses in the present moment.",
      },
      {
        type: "text",
        body: "The difference between skillful shifting and avoidance: Skillful shifting acknowledges anxiety and then redirects. Avoidance tries to make anxiety go away or pretends it's not there.",
      },
      {
        type: "text",
        body: "You can practice this: Notice anxiety is present. Acknowledge it: 'Anxiety is here.' Then gently redirect attention to something in the present moment—your breath, your senses, or a task.",
      },
      {
        type: "tip",
        body: "Skillful shifting = Acknowledge anxiety, then redirect. Avoidance = Try to make anxiety disappear or ignore it.",
      },
      {
        type: "text",
        body: "This takes practice. At first, anxiety might pull your attention back immediately. That's normal. Just notice it happened and redirect again. Each redirect is practice.",
      },
      {
        type: "text",
        body: "You're not trying to control attention perfectly. You're practicing working with it. Sometimes anxiety will hijack attention, and that's okay. The skill is noticing and redirecting, not preventing hijacking.",
      },
      {
        type: "text",
        body: "The more you practice, the easier it becomes. Your attention becomes more flexible—you can feel anxiety and still focus on what matters. You don't have to wait for anxiety to disappear to live your life.",
      },
      {
        type: "text",
        body: "Remember: The goal isn't perfect attention control. The goal is skillful attention management—noticing when attention is hijacked and redirecting it back to what matters, with anxiety along for the ride.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing Attention Skills
   *
   * Format: Practice lesson
   * Focus: Experiential practice in attention skills
   */
  attention_skills_practicing: {
    id: "attention_skills_practicing",
    moduleId: "attention_skills",
    title: "Practicing Attention Skills",
    goal: "Practice shifting attention skillfully",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice attention skills. We'll start by noticing where your attention is right now, then practice redirecting it skillfully.",
      },
      {
        t: "instruction",
        body: "First, notice where your attention is. Are you focused on this lesson? Are there other thoughts or sensations pulling your attention? Just notice without judgment.",
      },
      { t: "timer", seconds: 20, label: "Notice where your attention is" },
      {
        t: "instruction",
        body: "Now, if your attention wandered, that's normal. Just notice it happened and gently bring it back. This is the skill—noticing and redirecting, not preventing wandering.",
      },
      { t: "timer", seconds: 15, label: "Practice redirecting attention" },
      {
        t: "instruction",
        body: "Now let's practice grounding. Shift your attention to what you can see. Look around and notice 5 things you can see. Name them in your mind.",
      },
      { t: "timer", seconds: 30, label: "Notice 5 things you can see" },
      {
        t: "instruction",
        body: "Notice how grounding shifts your attention to the present moment. You're not avoiding anything—you're anchoring in what's actually here, right now.",
      },
      {
        t: "instruction",
        body: "Now shift attention to what you can hear. Notice 3 different sounds—near or far, loud or quiet. Just notice them.",
      },
      { t: "timer", seconds: 20, label: "Notice 3 sounds" },
      {
        t: "instruction",
        body: "Now shift attention to what you can feel. Notice your feet on the floor, your body in the chair, your clothes on your skin. Feel the physical contact with your environment.",
      },
      { t: "timer", seconds: 20, label: "Notice physical sensations" },
      {
        t: "instruction",
        body: "Notice how you can shift attention skillfully. You're not trying to control it perfectly—you're practicing working with it. Each shift is practice.",
      },
      {
        t: "instruction",
        body: "Remember: You can feel anxiety and still shift attention. You don't have to make anxiety disappear first. You can acknowledge it's there and redirect attention anyway.",
      },
      {
        t: "check",
        prompt: "I can shift my attention skillfully without avoiding anxiety.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Building Your Attention Skills Toolkit
   *
   * Format: Builder lesson
   * Focus: Create a personal reference for attention skills
   */
  attention_skills_build_toolkit: {
    id: "attention_skills_build_toolkit",
    moduleId: "attention_skills",
    title: "Building Your Attention Skills Toolkit",
    goal: "Create a personal reference for your attention skills",
    format: "builder",
    sections: [
      {
        title: "Key Understanding",
        items: [
          {
            label: "Anxiety hijacks attention because the brain prioritizes potential threats",
            kind: "check",
          },
          {
            label: "I can shift attention skillfully without avoiding anxiety",
            kind: "check",
          },
          {
            label: "Grounding anchors in the present; distraction shifts away from anxiety",
            kind: "check",
          },
          {
            label: "The goal is skillful attention management, not perfect control",
            kind: "check",
          },
        ],
        minRequired: 4,
      },
      {
        title: "My Grounding Techniques",
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
            label: "Naming things I can see, hear, feel in the present moment",
            kind: "check",
          },
          {
            label: "Breathing and noticing the breath",
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
        title: "When I Use Distraction",
        items: [
          {
            label: "When anxiety is too intense and I need a break",
            kind: "check",
          },
          {
            label: "When I need to focus on a task despite anxiety",
            kind: "check",
          },
          {
            label: "When grounding isn't enough in the moment",
            kind: "check",
          },
          {
            label: "I try to use grounding first, then distraction if needed",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title: "My Attention Redirection Practice",
        items: [
          {
            label: "I practice noticing when attention is hijacked",
            kind: "check",
          },
          {
            label: "I practice acknowledging anxiety and redirecting anyway",
            kind: "check",
          },
          {
            label: "I practice grounding regularly, even when not anxious",
            kind: "check",
          },
          {
            label: "I remember that perfect attention control isn't the goal",
            kind: "check",
          },
        ],
        minRequired: 2,
      },
      {
        title: "My Go-To Attention Skills",
        items: [
          {
            label: "Write your top 3 go-to attention skills and when you'll use them",
            kind: "shortText",
            inputId: "go_to_attention_skills",
          },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}

