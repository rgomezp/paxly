import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Identity module lessons
 */
export const IDENTITY_LESSONS: Record<string, ILessonConfig> = {
  d16_roles_inventory: {
    id: "d16_roles_inventory",
    moduleId: "identity",
    title: "Roles Lost/Kept/Gained",
    goal: "Reclaim identity beyond relationship",
    estMinutes: 7,
    format: "journal",
    fields: [
      {
        name: "lost",
        kind: "longText",
        label:
          "Roles lost (What roles did you have in the relationship that you no longer have? Examples: 'their partner,' 'their support person,' 'part of a couple,' 'their go-to person')",
      },
      {
        name: "kept",
        kind: "longText",
        label:
          "Roles kept (What roles do you still have that existed before or outside the relationship? Examples: 'friend,' 'sibling,' 'colleague,' 'artist,' 'athlete,' 'volunteer')",
      },
      {
        name: "gained",
        kind: "longText",
        label:
          "Roles gained (What new roles or identities are emerging? Examples: 'single person,' 'independent,' 'someone who's healing,' 'more self-reliant')",
      },
    ],
    commitment: { text: "Schedule 1 activity" },
  },
  d16_values_sort: {
    id: "d16_values_sort",
    moduleId: "identity",
    title: "Values Card Sort",
    goal: "Find top 5 values",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "values",
        kind: "longText",
        label:
          "Top values (aim for 5) - What matters most to you? Examples: honesty, creativity, adventure, family, growth, service, authenticity, freedom, connection, stability. These are your compass—they guide decisions aligned with who you are)",
      },
      {
        name: "act",
        kind: "shortText",
        label:
          "One value-aligned action today (What's one small thing you can do today that aligns with one of your top values? This reconnects you with yourself)",
      },
    ],
    commitment: { text: "Take 1 value-aligned action" },
  },
  d17_morning_ritual: {
    id: "d17_morning_ritual",
    moduleId: "identity",
    title: "New Morning Ritual",
    goal: "Anchor mornings to self",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Pick 1–2: Morning anchors (Mornings set the tone for your day. A simple ritual signals to your nervous system: 'I'm taking care of myself.' This builds self-trust and autonomy. Start small—one or two actions is enough)",
        items: [
          { label: "Hydrate + sunlight", kind: "check" },
          { label: "5-min movement", kind: "check" },
          { label: "Breath/journal 3-min", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Try morning ritual" },
  },
  d18_friend_reconnect: {
    id: "d18_friend_reconnect",
    moduleId: "identity",
    title: "Re-open a Door",
    goal: "Rebuild pro-social ties",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "person",
        kind: "shortText",
        label:
          "Who will you reach out to? (Think of someone you've lost touch with or someone you'd like to reconnect with. Relationships outside romantic partnerships are crucial for identity)",
      },
      {
        name: "text",
        kind: "longText",
        label:
          "Draft your message (Keep it simple and authentic. Example: 'Hey, been thinking about you. Would love to catch up if you're open to it.' No need to explain the breakup unless you want to)",
      },
    ],
    commitment: { text: "Send 1 text" },
  },
  d18_future_self_note: {
    id: "d18_future_self_note",
    moduleId: "identity",
    title: "Note to Future-You",
    goal: "Boost agency + hope",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "note",
        kind: "longText",
        label:
          "Write to yourself 30 days from now (What do you want to tell your future self? What are you proud of yourself for right now? What do you hope for? This exercise builds hope and agency—you're actively shaping your future)",
      },
    ],
    commitment: { text: "Schedule delivery" },
  },
  identity_strengths_inventory: {
    id: "identity_strengths_inventory",
    moduleId: "identity",
    title: "Strengths Inventory",
    goal: "Reconnect with your strengths",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "strengths",
        kind: "longText",
        label:
          "List 5 of your strengths (What are you good at? What do others appreciate about you? Examples: resilience, empathy, creativity, problem-solving, humor, loyalty, determination. These existed before the relationship and will exist after)",
      },
      {
        name: "examples",
        kind: "longText",
        label:
          "Examples of when you used them (When have you demonstrated these strengths? This reminds you: you have resources. You've handled difficult things before. You're capable)",
      },
    ],
    commitment: { text: "Use 1 strength" },
  },
  identity_hobbies_reconnect: {
    id: "identity_hobbies_reconnect",
    moduleId: "identity",
    title: "Reconnect with Hobbies",
    goal: "Rediscover activities you enjoy",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "old_hobbies",
        kind: "longText",
        label:
          "Hobbies you used to enjoy (What did you do before the relationship? What brought you joy? Reconnecting with these activities reminds you: you have interests and passions beyond partnership)",
      },
      {
        name: "new_hobbies",
        kind: "longText",
        label:
          "New hobbies to try (What have you always wanted to try? What sounds interesting? Trying new things builds identity and confidence. You're discovering who you are now)",
      },
    ],
    commitment: { text: "Try 1 hobby" },
  },
  identity_self_compassion: {
    id: "identity_self_compassion",
    moduleId: "identity",
    title: "Self-Compassion Practice",
    goal: "Treat yourself with kindness",
    estMinutes: 5,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Self-compassion isn't self-pity or making excuses. It's treating yourself with the same kindness you'd offer a good friend. Research shows self-compassion reduces anxiety, depression, and shame while increasing resilience.",
      },
      {
        t: "instruction",
        body: "Think of a difficult moment you're going through—maybe something related to the breakup, a mistake you made, or a painful feeling you're having.",
      },
      {
        t: "instruction",
        body: "Now imagine a close friend came to you with this same struggle. What would you say to them? How would you comfort them? What tone would you use?",
      },
      { t: "timer", seconds: 45, label: "Imagine comforting your friend" },
      {
        t: "instruction",
        body: "Now offer that same kindness to yourself. Say those words to yourself. Use that same gentle tone. You deserve the same compassion you'd give a friend.",
      },
      { t: "timer", seconds: 60, label: "Offer yourself that kindness" },
      {
        t: "instruction",
        body: "Notice how that feels. Self-compassion might feel uncomfortable at first—many of us are more comfortable being harsh with ourselves. But this is a skill you can build.",
      },
      {
        t: "check",
        prompt: "I can practice self-compassion when I'm struggling",
      },
    ],
    commitment: { text: "Self-compassion" },
  },
  identity_goals_setting: {
    id: "identity_goals_setting",
    moduleId: "identity",
    title: "Set Personal Goals",
    goal: "Create goals for yourself",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "short_term",
        kind: "longText",
        label:
          "Short-term goals (this month) - What do you want to accomplish in the next 30 days? Make them specific and achievable. Examples: 'Go to the gym 3x/week,' 'Reconnect with 2 friends,' 'Start a new hobby'",
      },
      {
        name: "long_term",
        kind: "longText",
        label:
          "Long-term goals (this year) - What do you want for yourself in the next year? These can be bigger, more aspirational. Examples: 'Travel somewhere new,' 'Learn a new skill,' 'Build a stronger social circle'",
      },
    ],
    commitment: { text: "1 step forward" },
  },
  identity_autonomy_practice: {
    id: "identity_autonomy_practice",
    moduleId: "identity",
    title: "Practice Autonomy",
    goal: "Make decisions for yourself",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Autonomy means making choices based on your values and needs, not others' expectations or approval. After a breakup, you might realize how many decisions were made to please your partner or avoid conflict.",
      },
      {
        type: "text",
        body: "Rebuilding autonomy is crucial for identity. When you make decisions for yourself, you're telling yourself: 'I trust my judgment. I know what I need. I can take care of myself.'",
      },
      {
        type: "text",
        body: "This doesn't mean being selfish or never considering others. It means your primary reference point is your own values and needs, not external validation or fear of rejection.",
      },
      {
        type: "tip",
        body: "Practice making small decisions independently today. What do YOU want for dinner? What do YOU want to do this weekend? What do YOU think about this situation? Start small and build the muscle.",
      },
      {
        type: "text",
        body: "Each independent decision strengthens your sense of self. You're rebuilding trust in yourself and your ability to navigate life on your own terms.",
      },
    ],
    commitment: { text: "3 decisions" },
  },
}
