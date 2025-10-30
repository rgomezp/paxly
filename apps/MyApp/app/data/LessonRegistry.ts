import { ILessonConfig } from "@/types/lessons/ILessonConfig"

export const LESSONS: Record<string, ILessonConfig> = {
  d1_stabilize_intro: {
    id: "d1_stabilize_intro",
    moduleId: "stabilize",
    title: "Lower the Volume",
    goal: "Reduce panic 10–20% and create safety nets",
    estMinutes: 10,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Breakups yank predictability. Your brain fires alarms to regain certainty.",
      },
      { type: "tip", body: "Say: ‘This is an alarm, not the truth.’" },
    ],
    commitment: { text: "Add 3 crisis contacts & pin SOS", duration: "today" },
    checkIn: { mood: true, urge: true },
    gating: { minHoursBeforeNext: 12 },
  },
  mini_wait_90: {
    id: "mini_wait_90",
    moduleId: "mini_interventions",
    title: "Wait 90 Seconds",
    goal: "Create space before acting",
    estMinutes: 2,
    format: "practice",
    steps: [{ t: "timer", seconds: 90, label: "Urge peaks then falls" }],
    commitment: { text: "Always run timer >6/10 urge" },
  },
  mini_sleep_rescue: {
    id: "mini_sleep_rescue",
    moduleId: "mini_interventions",
    title: "Sleep Rescue Audio",
    goal: "Downshift for sleep",
    estMinutes: 10,
    format: "practice",
    steps: [{ t: "audio", asset: "app://audio/sleep_rescue.mp3" }],
    commitment: { text: "Start if awake >20 min" },
  },
  w6_move_body: {
    id: "w6_move_body",
    moduleId: "joy_competence",
    title: "Move Your Body",
    goal: "Mood up via movement",
    estMinutes: 8,
    format: "practice",
    steps: [
      { t: "instruction", body: "10-minute walk or gentle mobility." },
      { t: "timer", seconds: 600, label: "Go move" },
    ],
    commitment: { text: "10-min walk today" },
  },
  d9_rumination_cap: {
    id: "d9_rumination_cap",
    moduleId: "cognitive_aid",
    title: "Ruminations Cap",
    goal: "Contain worry to a window",
    estMinutes: 7,
    format: "builder",
    sections: [
      {
        title: "Worry Window",
        items: [
          { label: "Pick a 10-minute time", kind: "datetime" },
          { label: "Pick a place", kind: "picker", options: ["desk", "sofa", "porch", "kitchen"] },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Stick to the window today" },
  },
  mini_repair_relapse: {
    id: "mini_repair_relapse",
    moduleId: "mini_interventions",
    title: "3-Minute Repair",
    goal: "Stabilize after contact/slip",
    estMinutes: 3,
    format: "practice",
    steps: [
      { t: "breath", pattern: "physiological", rounds: 2 },
      { t: "instruction", body: "You’re not back at zero. Re-commit now." },
      { t: "timer", seconds: 60, label: "Settle" },
    ],
    commitment: { text: "Tap NC dashboard" },
  },
}
