import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Relapse recovery lessons for A/B testing
 * These lessons help users stabilize and recommit after breaking no contact
 */
export const RELAPSE_LESSONS: Record<string, ILessonConfig> = {
  mini_repair_relapse: {
    id: "mini_repair_relapse",
    moduleId: "mini_interventions",
    title: "2-Minute Repair",
    goal: "Stabilize after contact/slip",
    estMinutes: 3,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "A slip doesn't erase your progress. Your brain has already built new pathways. This is a detour, not a reset. Let's stabilize your nervous system first.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Name what happened without judgment: 'I contacted them' or 'I looked at their social media.' Facts, not shame. Shame keeps you stuck—data helps you move forward.",
      },
      {
        t: "instruction",
        body: "You're NOT back at zero. Every day of no contact before this mattered. Every skill you practiced is still there. This is one moment—let's re-commit now.",
      },
      {
        t: "check",
        prompt: "I'm committed to continuing my healing.",
      },
      {
        t: "instruction",
        body: "Let's take 3 more breaths to settle your nervous system, then we'll pause to integrate.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      { t: "timer", seconds: 60, label: "Settle and notice the shift" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_self_compassion: {
    id: "relapse_self_compassion",
    moduleId: "mini_interventions",
    title: "Self-Compassion Reset",
    goal: "Practice kindness after a slip",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "You're human. Breaking no contact is incredibly hard. The fact that you're here, doing this work, shows your commitment. Let's treat yourself with the same kindness you'd show a friend.",
      },
      {
        t: "instruction",
        body: "Place a hand on your heart. Feel your heartbeat. This is your body, doing its best to keep you safe. You're not broken—you're healing.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Say to yourself: 'This is a moment of struggle. Struggling is part of healing. I'm not alone in this.'",
      },
      {
        t: "check",
        prompt: "I choose self-compassion over self-criticism.",
      },
      {
        t: "instruction",
        body: "What would you tell a friend who just broke no contact? You deserve that same gentle voice. Your inner critic doesn't help—your inner supporter does.",
      },
      { t: "timer", seconds: 90, label: "Rest in self-compassion" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_neuroscience: {
    id: "relapse_neuroscience",
    moduleId: "mini_interventions",
    title: "The Science of Slips",
    goal: "Understand what your brain is doing",
    estMinutes: 3,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Your brain has two systems: the old attachment pathway (familiar, automatic) and new healing pathways (what you're building). When you contact them, the old pathway fires—but that doesn't delete the new ones.",
      },
      {
        t: "instruction",
        body: "Every time you practice a new skill, you strengthen those neural pathways. The old pathway is like a well-worn trail—it's easy to fall back into. But your new pathways are getting stronger with each practice.",
      },
      { t: "breath", pattern: "box", rounds: 2 },
      {
        t: "instruction",
        body: "This slip activated the old pathway. That's data, not failure. Now you get to consciously choose the new pathway. That choice—right now—is strengthening your healing brain.",
      },
      {
        t: "check",
        prompt: "I understand this is part of my brain's learning process.",
      },
      {
        t: "instruction",
        body: "Let's do 4 rounds of box breathing to activate your prefrontal cortex—the part that helps you make conscious choices instead of automatic reactions.",
      },
      { t: "breath", pattern: "box", rounds: 4 },
      { t: "timer", seconds: 60, label: "Notice your brain's capacity to choose" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_values: {
    id: "relapse_values",
    moduleId: "mini_interventions",
    title: "Reconnect to Your Why",
    goal: "Remember what matters most",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "You chose no contact for a reason. That reason hasn't changed. Let's reconnect to what you're really committed to: your healing, your peace, your future self.",
      },
      {
        t: "instruction",
        body: "Take a moment to remember: Why did you start this journey? What do you want for yourself? What kind of person are you becoming?",
      },
      { t: "timer", seconds: 60, label: "Reflect on your deeper why" },
      {
        t: "instruction",
        body: "This slip doesn't change your values. You still value your healing. You still value your peace. You still value breaking free from patterns that don't serve you.",
      },
      {
        t: "check",
        prompt: "I'm recommitting to my values and my healing journey.",
      },
      {
        t: "instruction",
        body: "Let's take 5 deep breaths, and with each exhale, recommit to what you truly want: freedom, peace, and a life that's truly yours.",
      },
      { t: "breath", pattern: "physiological", rounds: 5 },
      { t: "timer", seconds: 45, label: "Feel your recommitment" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_somatic: {
    id: "relapse_somatic",
    moduleId: "mini_interventions",
    title: "Body Reset",
    goal: "Release tension and reset your system",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "After contact, your body is likely holding tension, anxiety, or activation. Let's release that physically. Your body stores what your mind processes.",
      },
      {
        t: "instruction",
        body: "Stand up if you can. Shake your hands and arms. Let your shoulders drop. Roll your neck gently. Your body needs to move the energy through.",
      },
      { t: "timer", seconds: 60, label: "Move and release tension" },
      {
        t: "instruction",
        body: "Now sit or lie down. Place your hands on your belly. Breathe into your belly, feeling it rise and fall. This activates your parasympathetic nervous system—the rest and digest mode.",
      },
      { t: "breath", pattern: "physiological", rounds: 4 },
      {
        t: "instruction",
        body: "Scan your body from head to toe. Where do you feel tension? Breathe into those spots. You're not trying to fix anything—just noticing and allowing.",
      },
      { t: "timer", seconds: 90, label: "Body scan and release" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_cognitive: {
    id: "relapse_cognitive",
    moduleId: "mini_interventions",
    title: "Reframe the Story",
    goal: "Shift from shame to learning",
    estMinutes: 3,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "The story you tell yourself about this slip matters. 'I failed' keeps you stuck. 'I'm learning' helps you move forward. Let's reframe what happened.",
      },
      {
        t: "instruction",
        body: "Instead of 'I'm back at square one,' try: 'I had a slip, and I'm immediately getting back on track.' Instead of 'I can't do this,' try: 'This is hard, and I'm doing it anyway.'",
      },
      { t: "breath", pattern: "box", rounds: 2 },
      {
        t: "instruction",
        body: "What did you learn from this slip? What triggered it? What can you do differently next time? Every slip is data that makes you stronger.",
      },
      { t: "timer", seconds: 60, label: "Identify what you learned" },
      {
        t: "check",
        prompt: "I'm choosing to see this as learning, not failure.",
      },
      {
        t: "instruction",
        body: "Take 3 more breaths, and with each one, let go of the old story and breathe in the new one: you're learning, growing, and healing.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },
  relapse_future_self: {
    id: "relapse_future_self",
    moduleId: "mini_interventions",
    title: "Your Future Self",
    goal: "Connect with who you're becoming",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Close your eyes and imagine yourself 6 months from now. You've been consistently practicing no contact. How do you feel? What's different? What's possible for you?",
      },
      { t: "timer", seconds: 90, label: "Visualize your future self" },
      {
        t: "instruction",
        body: "Your future self knows that this slip was just one moment. They know you kept going. They're proud of you for getting back up right now, in this moment.",
      },
      {
        t: "instruction",
        body: "What would your future self say to you right now? They'd probably say: 'Keep going. This moment doesn't define you. I'm proof that you can do this.'",
      },
      {
        t: "check",
        prompt: "I'm choosing to act like my future self would act.",
      },
      {
        t: "instruction",
        body: "Take 5 deep breaths, and with each one, feel yourself moving toward that future self. You're not there yet, but you're on the path. This slip is just a step on that path.",
      },
      { t: "breath", pattern: "physiological", rounds: 5 },
      { t: "timer", seconds: 45, label: "Feel the connection to your future" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_progress: {
    id: "relapse_progress",
    moduleId: "mini_interventions",
    title: "Count Your Wins",
    goal: "Remember your progress",
    estMinutes: 3,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Before this slip, how many days of no contact did you have? Every single one of those days mattered. Every day built new neural pathways. Every day strengthened your capacity to heal.",
      },
      {
        t: "instruction",
        body: "Think about what you've learned since you started: new coping skills, new ways of thinking, new understanding of yourself. None of that disappears because of one moment.",
      },
      { t: "timer", seconds: 60, label: "Remember your progress" },
      {
        t: "instruction",
        body: "You've done hard things. You've practiced. You've grown. This slip doesn't erase any of that. In fact, how you handle this slip right now is another opportunity to practice and grow.",
      },
      {
        t: "check",
        prompt: "I acknowledge my progress and my capacity to continue.",
      },
      {
        t: "instruction",
        body: "Let's take 4 breaths to ground yourself in your progress. You're not starting over—you're continuing forward with more wisdom than before.",
      },
      { t: "breath", pattern: "physiological", rounds: 4 },
      { t: "timer", seconds: 60, label: "Feel your accumulated strength" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_acceptance: {
    id: "relapse_acceptance",
    moduleId: "mini_interventions",
    title: "Radical Acceptance",
    goal: "Accept what is, then move forward",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "What happened, happened. Fighting it, denying it, or beating yourself up won't change it. Radical acceptance means: this is what is. Now, what's next?",
      },
      {
        t: "instruction",
        body: "Say it out loud or in your mind: 'I contacted them. This happened. I can't change it. I accept it.' Notice how acceptance feels different from resistance.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Acceptance isn't giving up—it's acknowledging reality so you can make a clear choice about what to do next. You can't change the past, but you can choose your next action.",
      },
      {
        t: "check",
        prompt: "I accept what happened and choose to move forward.",
      },
      {
        t: "instruction",
        body: "Now that you've accepted what is, what do you choose? You choose to continue. You choose to recommit. You choose healing. Take 5 breaths to feel that choice in your body.",
      },
      { t: "breath", pattern: "physiological", rounds: 5 },
      { t: "timer", seconds: 60, label: "Rest in acceptance and choice" },
    ],
    commitment: { text: "Finish" },
  },
  relapse_action: {
    id: "relapse_action",
    moduleId: "mini_interventions",
    title: "Immediate Recommitment",
    goal: "Take action to get back on track",
    estMinutes: 3,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "The best time to recommit is right now. Not tomorrow, not after you feel better—right now. Action creates momentum. Let's take immediate steps to get back on track.",
      },
      {
        t: "instruction",
        body: "First, stabilize your nervous system. Take 3 deep breaths: in through your nose, out through your mouth. This signals safety to your body.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Now, make a clear commitment. Say it out loud or write it down: 'I'm recommitting to no contact right now, starting this moment.' Clarity creates power.",
      },
      {
        t: "check",
        prompt: "I'm recommitting to no contact starting now.",
      },
      {
        t: "instruction",
        body: "What's one concrete action you can take in the next hour to support your recommitment? Maybe delete their number, block them, or reach out to a support person.",
      },
      { t: "timer", seconds: 60, label: "Identify your next action" },
      {
        t: "instruction",
        body: "You've recommitted. You've stabilized. You've planned your next action. You're back on track. Take 3 more breaths to anchor this moment.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },
}

// Array of all relapse lesson IDs for random selection
export const RELAPSE_LESSON_IDS = Object.keys(RELAPSE_LESSONS)
