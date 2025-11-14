import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Mini Interventions module lessons
 */
export const MINI_INTERVENTIONS_LESSONS: Record<string, ILessonConfig> = {
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
    commitment: { text: "Open NC dashboard" },
  },
  mini_text_buddy: {
    id: "mini_text_buddy",
    moduleId: "mini_interventions",
    title: "Text the Buddy, Not the Ex",
    goal: "Redirect urge to support",
    estMinutes: 3,
    format: "builder",
    sections: [
      {
        title:
          "Setup: Redirect the urge (When you want to contact your ex, your attachment system is activated. Contacting them reinforces the pattern. Contacting support instead redirects that energy toward healing. Set this up now, before you need it)",
        items: [
          { label: "Choose buddy", kind: "contact", source: "phonebook" },
          { label: "Save template", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Pin buddy" },
  },
  mini_public_wave: {
    id: "mini_public_wave",
    moduleId: "mini_interventions",
    title: "Handle a Public Wave",
    goal: "Cope with sudden tears in public",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Emotional waves can hit anywhere, anytime. This is normal—your nervous system is processing. You're not broken. Let's find a reset spot.",
      },
      {
        t: "instruction",
        body: "Find a bathroom or private space. If you can't, step outside or find a quiet corner. You don't need to explain—just move to safety.",
      },
      {
        t: "instruction",
        body: "Splash cold water on your face and wrists. This activates the mammalian diving reflex, which can quickly downshift your nervous system.",
      },
      {
        t: "instruction",
        body: "Take 5 slow breaths: In for 4, hold for 4, out for 6. This activates your parasympathetic nervous system—the calming branch.",
      },
      { t: "timer", seconds: 120, label: "Reset and notice the shift" },
      {
        t: "instruction",
        body: "You're okay. Emotional waves pass. You handled this. When you're ready, you can return or leave—your choice.",
      },
    ],
    commitment: { text: "Restroom reset" },
  },
  mini_sleep_rescue: {
    id: "mini_sleep_rescue",
    moduleId: "mini_interventions",
    title: "Sleep Rescue Audio",
    goal: "Downshift for sleep",
    estMinutes: 10,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When you're awake for more than 20 minutes, your nervous system is likely activated. Trying to force sleep won't work—you need to downshift first.",
      },
      {
        t: "instruction",
        body: "This guided audio will help your nervous system shift from activation to rest. It uses breath work, body awareness, and progressive relaxation to activate your parasympathetic nervous system.",
      },
      {
        t: "instruction",
        body: "Let yourself follow along. You don't need to do it perfectly—just let the guidance support your body's natural ability to rest.",
      },
      { t: "audio", asset: "app://audio/sleep_rescue.mp3" },
      {
        t: "instruction",
        body: "If you're still awake after this, that's okay. Your nervous system has shifted. You can try again or just rest—resting is still restorative even if you're not sleeping.",
      },
    ],
    commitment: { text: "Start if awake" },
  },
}
