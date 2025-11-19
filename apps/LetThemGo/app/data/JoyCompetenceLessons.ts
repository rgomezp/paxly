import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Joy Competence module lessons
 */
export const JOY_COMPETENCE_LESSONS: Record<string, ILessonConfig> = {
  w6_move_body: {
    id: "w6_move_body",
    moduleId: "joy_competence",
    title: "Move Your Body",
    goal: "Mood up via movement",
    estMinutes: 6,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Movement is one of the most effective mood regulators. When you're depressed or anxious, your body produces fewer feel-good chemicals. Exercise increases endorphins, dopamine, and serotonin—the same neurotransmitters that help regulate mood.",
      },
      {
        t: "instruction",
        body: "You don't need to run a marathon. Even 10 minutes of movement can shift your state. The goal isn't to 'fix' your mood—it's to give your body a different signal: 'We're moving, we're alive, we're capable.'",
      },
      {
        t: "instruction",
        body: "First, check in: How are you feeling right now? Name it without judgment. Feeling down is normal after a breakup. It's okay to feel this way.",
      },
      { t: "timer", seconds: 30, label: "Check in with yourself" },
      {
        t: "instruction",
        body: "Now let's move for 10 minutes. You don't need to feel motivated—you just need to start. Movement creates motivation, not the other way around.",
      },
      {
        t: "instruction",
        body: "Here are some options:\n\n• Walk outside (even around the block)\n• Gentle yoga or stretching\n• Dance to one song\n• Climb stairs\n• Do jumping jacks\n\nPick whatever feels most doable right now.",
      },
      { t: "timer", seconds: 600, label: "Move your body—10 minutes" },
      {
        t: "instruction",
        body: "Notice how you feel now versus before. Even a small shift counts. You moved your body when you didn't feel like it. That's competence. That's self-care.",
      },
      {
        t: "check",
        prompt: "I can use movement to shift my mood when I'm down",
      },
    ],
    commitment: { text: "Finish" },
  },
  w5_mastery_calendar: {
    id: "w5_mastery_calendar",
    moduleId: "joy_competence",
    title: "Mastery Calendar",
    goal: "Rebuild competence via tiny goals",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Habits: Micro-goals rebuild competence (After a breakup, you might feel like you've lost competence. Small, achievable goals rebuild that sense of mastery. Think tiny: 'Make my bed,' 'Call one friend,' 'Cook one meal.' Success builds on success)",
        items: [
          { label: "Add micro-goal #1", kind: "shortText" },
          { label: "Add micro-goal #2", kind: "shortText" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  w5_social_micro: {
    id: "w5_social_micro",
    moduleId: "joy_competence",
    title: "Social Micro-Exposures",
    goal: "Gentle re-entry socially",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Pick one: Gentle social re-entry (After isolation, socializing can feel overwhelming. Micro-exposures are tiny, low-stakes interactions that rebuild your social confidence. Start small—you don't need to attend a party)",
        items: [
          { label: "Say hi to barista", kind: "check" },
          { label: "10-min call with friend", kind: "check" },
          { label: "Join a class", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  w6_novelty_dose: {
    id: "w6_novelty_dose",
    moduleId: "joy_competence",
    title: "Novelty Dose",
    goal: "Reboot reward system",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Novelty activates your brain's reward system. When you do something new, your brain releases dopamine—the same chemical involved in pleasure and motivation. After a breakup, your reward system might feel depleted. Novelty helps reboot it.",
      },
      {
        type: "text",
        body: "You don't need big changes. Tiny newness is enough: a different route to work, a new café, a different playlist, trying a new recipe, visiting a new park. Small novelty creates small dopamine hits that add up.",
      },
      {
        type: "tip",
        body: "Change one small routine this week. Take a different route. Try a new coffee shop. Listen to a new podcast. These micro-changes signal to your brain: 'Life is still interesting. There's still newness to discover.'",
      },
      {
        type: "text",
        body: "Novelty also helps break the association between your daily routines and your ex. When you change your route, you're not just getting dopamine—you're creating new neural pathways that aren't linked to them.",
      },
    ],
    commitment: { text: "Finish", duration: "week" },
  },
  w6_gratitude_real: {
    id: "w6_gratitude_real",
    moduleId: "joy_competence",
    title: "Realistic Gratitude",
    goal: "Ground without toxic positivity",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "grains",
        kind: "longText",
        label:
          "3 small grains of good (Not 'I'm grateful for everything'—that's toxic positivity. Find 3 tiny, specific things: 'The sun felt warm on my face,' 'My coffee tasted good,' 'I finished one task.' This grounds you in reality without dismissing your pain)",
      },
    ],
    commitment: { text: "Finish" },
  },
  joy_micro_joys: {
    id: "joy_micro_joys",
    moduleId: "joy_competence",
    title: "Micro-Joys Practice",
    goal: "Notice small moments of joy",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "joys",
        kind: "longText",
        label:
          "List 5 micro-joys from today (Tiny moments of pleasure or contentment: a good song, a warm shower, a funny text, a beautiful sky, a comfortable bed. These don't erase your pain—they exist alongside it)",
      },
      {
        name: "savor",
        kind: "longText",
        label:
          "How can you savor these moments? (Savoring means intentionally extending positive experiences. How can you notice and appreciate these micro-joys more? This trains your brain to register positive moments)",
      },
    ],
    commitment: { text: "Finish" },
  },
  joy_competence_building: {
    id: "joy_competence_building",
    moduleId: "joy_competence",
    title: "Build Competence Through Small Wins",
    goal: "Create a sense of mastery",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Small wins: Rebuild your sense of capability (After a breakup, you might feel incompetent or like you've lost yourself. Small wins rebuild that sense of mastery. Each completed task is evidence: 'I can do things. I'm capable.' Start tiny)",
        items: [
          { label: "Complete a small task", kind: "check" },
          { label: "Learn something new", kind: "check" },
          { label: "Finish a project", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  joy_play_exploration: {
    id: "joy_play_exploration",
    moduleId: "joy_competence",
    title: "Play and Exploration",
    goal: "Rediscover playfulness",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "playful_activities",
        kind: "longText",
        label:
          "What activities feel playful to you? (Play is anything done for its own sake, not for a goal. Examples: drawing, dancing alone, trying a new hobby, exploring a new place, playing games. What used to feel fun? What sounds interesting?)",
      },
      {
        name: "schedule",
        kind: "shortText",
        label:
          "When will you do one? (Schedule it like an appointment. Play doesn't happen spontaneously when you're depressed—you need to plan it)",
      },
    ],
    commitment: { text: "Finish" },
  },
  joy_achievement_tracking: {
    id: "joy_achievement_tracking",
    moduleId: "joy_competence",
    title: "Track Your Achievements",
    goal: "Acknowledge your progress",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "achievements",
        kind: "longText",
        label:
          "What have you achieved recently? (Big or small: got out of bed, went to work, completed a lesson, called a friend, cooked a meal, survived a hard day. After a breakup, basic functioning IS an achievement. Acknowledge it)",
      },
      {
        name: "celebration",
        kind: "shortText",
        label:
          "How will you celebrate? (Celebration doesn't need to be big. It can be: 'I'll acknowledge this achievement,' 'I'll treat myself to something small,' 'I'll tell someone about it.' Celebration reinforces your progress)",
      },
    ],
    commitment: { text: "Finish" },
  },
  joy_flow_activities: {
    id: "joy_flow_activities",
    moduleId: "joy_competence",
    title: "Find Flow Activities",
    goal: "Discover activities that bring flow",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Flow is a state of complete absorption in an activity. Time disappears. You're fully present, fully engaged. Research shows flow states increase happiness, reduce anxiety, and build competence.",
      },
      {
        type: "text",
        body: "Flow happens when the challenge matches your skill level—not too easy (boring) and not too hard (anxious). You're in the sweet spot where you're stretched but capable.",
      },
      {
        type: "text",
        body: "What activities make you lose track of time? Examples: creative work (writing, art, music), physical activities (running, climbing), problem-solving (puzzles, games), learning (reading, courses).",
      },
      {
        type: "tip",
        body: "After a breakup, flow activities are particularly valuable. They give you a break from rumination. They remind you: 'I can be absorbed in something other than my pain.' They rebuild your sense of competence.",
      },
      {
        type: "text",
        body: "You might not feel like doing flow activities right now. That's normal. But if you can push through the initial resistance and start, flow often follows. The activity creates the motivation, not the other way around.",
      },
    ],
    commitment: { text: "Finish" },
  },
}
