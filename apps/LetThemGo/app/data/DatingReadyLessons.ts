import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Dating Ready module lessons
 */
export const DATING_READY_LESSONS: Record<string, ILessonConfig> = {
  w7_readiness_check: {
    id: "w7_readiness_check",
    moduleId: "dating_ready",
    title: "Dating Readiness Check",
    goal: "Decide if/when to date",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "readiness_context",
        kind: "text",
        label:
          "Be honest: Are you dating to fill a void or because you're genuinely ready? Signs of readiness: You're not hoping your ex will come back, you can see the relationship realistically, you're not using dating to avoid feelings, you're excited about meeting new people (not just escaping loneliness)",
      },
      {
        name: "score",
        kind: "slider",
        label: "Readiness (0–10)",
        min: 0,
        max: 10,
      },
      {
        name: "guards",
        kind: "longText",
        label:
          "Guardrails you'll keep (What boundaries will you maintain? Examples: 'No sex for first 3 dates,' 'Max 2 dates per week,' 'I'll debrief after each date,' 'I'll check in with myself about my attachment patterns.' These protect you from rushing into something unhealthy)",
      },
    ],
    commitment: { text: "Finish" },
  },
  w7_pace_plan: {
    id: "w7_pace_plan",
    moduleId: "dating_ready",
    title: "Pace Plan",
    goal: "Prevent attachment whiplash",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Rules: Slow down to prevent attachment whiplash (After a breakup, your attachment system is sensitive. Moving too fast can create intense attachment to someone new before you know if they're actually right for you. These rules protect you from rushing into another unhealthy dynamic)",
        items: [
          { label: "Max 2 dates/week", kind: "check" },
          { label: "No sleepovers first 3 dates", kind: "check" },
          { label: "Debrief after each date", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  w7_first_3_dates: {
    id: "w7_first_3_dates",
    moduleId: "dating_ready",
    title: "First 3 Dates Guardrails",
    goal: "Safety + clarity early",
    estMinutes: 6,
    format: "card",
    cards: [
      {
        type: "text",
        body: "The first few dates are data-gathering, not commitment-making. Keep them short (1-2 hours), public (safety first), and during early evenings (clear boundaries). This keeps dopamine levels manageable—not too high, not too low.",
      },
      {
        type: "text",
        body: "High-intensity first dates (long dinners, late nights, private spaces) can create false intimacy. You might mistake chemistry for compatibility, or attachment activation for genuine connection.",
      },
      {
        type: "text",
        body: "After each date, check in with YOURSELF, not their vibe. How did YOU feel? Safe? Comfortable? Curious? Or anxious, activated, or trying to impress? Your internal experience matters more than whether they seemed interested.",
      },
      {
        type: "tip",
        body: "End each date with a self-check-in: 'How did I feel? What did I notice? What's my gut saying?' Don't make decisions based on whether they texted you back or seemed into you. Make decisions based on your own experience.",
      },
      {
        type: "text",
        body: "These guardrails aren't about being cold or guarded. They're about gathering real information before your attachment system gets activated. Slow and steady wins the race to healthy connection.",
      },
    ],
    commitment: { text: "Finish" },
  },
  w8_debrief_template: {
    id: "w8_debrief_template",
    moduleId: "dating_ready",
    title: "Post-Date Debrief",
    goal: "Choose based on data, not dopamine",
    estMinutes: 6,
    format: "journal",
    template: "post_date_debrief",
    fields: [
      {
        name: "felt",
        kind: "longText",
        label:
          "How did I feel during/after? (Be specific: Safe? Anxious? Excited? Activated? Comfortable? Notice if you felt like you had to perform or if you could be yourself. Your feelings are data)",
      },
      {
        name: "aligned",
        kind: "radio",
        label:
          "Values aligned? (Did you see evidence of shared values? Or red flags? Or is it too early to tell? Don't force alignment—just observe)",
        options: ["yes", "no", "unsure"],
      },
      {
        name: "next",
        kind: "shortText",
        label:
          "Do I want a next date? Why? (Base this on YOUR experience, not their interest level. If you're unsure, that's information. You don't need to say yes just because they asked)",
      },
    ],
    commitment: { text: "Finish" },
  },
  w8_values_alignment: {
    id: "w8_values_alignment",
    moduleId: "dating_ready",
    title: "Values Alignment Check",
    goal: "Spot misalignments early",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "my_values",
        kind: "longText",
        label:
          "My top values (What matters most to you? Examples: honesty, family, growth, adventure, stability, service. Know your values before you start dating—this is your compass)",
      },
      {
        name: "signals",
        kind: "longText",
        label:
          "Signals of alignment/misalignment (What are you looking for? Examples of alignment: They show respect, they're consistent, they share similar priorities. Examples of misalignment: They dismiss your values, they show contempt, they prioritize things that conflict with yours. Notice patterns, not just words)",
      },
    ],
    commitment: { text: "Finish" },
  },
  dating_red_flags_early: {
    id: "dating_red_flags_early",
    moduleId: "dating_ready",
    title: "Early Red Flags",
    goal: "Recognize warning signs early",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Red flags are patterns of behavior that indicate potential problems. Common early red flags: disrespect (dismissing your feelings, talking down to you), inconsistency (hot-cold behavior, unreliable), boundary violations (pushing your limits, not respecting 'no'), and emotional unavailability (can't discuss feelings, shuts down).",
      },
      {
        type: "text",
        body: "After a breakup, you might be more sensitive to red flags—or you might ignore them because you're eager for connection. Both are problematic. Trust your observations, not your hope.",
      },
      {
        type: "text",
        body: "One red flag is enough. You don't need a pattern of ten. If someone shows disrespect, boundary violations, or other deal-breakers early, that's information. They're showing you who they are—believe them.",
      },
      {
        type: "tip",
        body: "Trust your gut. If something feels off, it probably is. You don't need to justify or explain why. Your safety and well-being matter more than giving someone the benefit of the doubt.",
      },
      {
        type: "text",
        body: "Red flags don't mean they're a bad person—they mean they're not right for you, or not ready for a healthy relationship. Either way, that's enough reason to step back.",
      },
    ],
    commitment: { text: "Finish" },
  },
  dating_self_worth: {
    id: "dating_self_worth",
    moduleId: "dating_ready",
    title: "Maintain Self-Worth While Dating",
    goal: "Keep your sense of self",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "worth",
        kind: "longText",
        label:
          "What makes you valuable? (Your worth isn't determined by whether someone wants to date you. What are your strengths? Your values? Your qualities? Write this down before you start dating—you'll need to remember it)",
      },
      {
        name: "reminders",
        kind: "longText",
        label:
          "Reminders for when dating gets hard (What will you tell yourself when rejection happens? When someone ghosts? When you feel insecure? Examples: 'My worth isn't determined by their response,' 'Rejection is redirection,' 'I'm worthy of someone who sees my value')",
      },
    ],
    commitment: { text: "Finish" },
  },
  dating_communication_skills: {
    id: "dating_communication_skills",
    moduleId: "dating_ready",
    title: "Healthy Communication Skills",
    goal: "Practice clear, direct communication",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "needs",
        kind: "longText",
        label:
          "How will you communicate your needs? (Healthy communication means being direct: 'I need X' instead of hinting or expecting them to read your mind. Practice: 'I'd like to take things slow,' 'I need consistency,' 'I value honesty.' Clear communication creates clarity)",
      },
      {
        name: "listening",
        kind: "longText",
        label:
          "How will you practice active listening? (Active listening means hearing what they're actually saying, not just waiting for your turn to talk. It means asking clarifying questions, reflecting back what you heard, and being present. This builds connection and prevents misunderstandings)",
      },
    ],
    commitment: { text: "Finish" },
  },
  dating_self_care_plan: {
    id: "dating_self_care_plan",
    moduleId: "dating_ready",
    title: "Self-Care While Dating",
    goal: "Maintain self-care during dating",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Self-care practices: Maintain your life (Dating can be consuming. It's easy to lose yourself in the excitement or anxiety of new connections. These practices keep you grounded in your own life, not just the relationship. This protects your identity and prevents codependency)",
        items: [
          { label: "Maintain alone time", kind: "check" },
          { label: "Keep up hobbies", kind: "check" },
          { label: "Stay connected to friends", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  dating_boundaries_expectations: {
    id: "dating_boundaries_expectations",
    moduleId: "dating_ready",
    title: "Dating Boundaries & Expectations",
    goal: "Set clear boundaries and expectations when dating",
    estMinutes: 7,
    format: "journal",
    fields: [
      {
        name: "what_i_want",
        kind: "longText",
        label:
          "What do I want in a relationship? (Be specific: What are your relationship goals? What kind of connection are you looking for? Examples: 'Mutual respect, emotional availability, shared values, healthy communication.' Knowing what you want helps you recognize it when you see it)",
      },
      {
        name: "what_i_wont_accept",
        kind: "longText",
        label:
          "What won't I accept? (Your deal-breakers: What behaviors are non-negotiable? Examples: 'Disrespect, dishonesty, boundary violations, emotional unavailability.' These are your hard lines)",
      },
      {
        name: "boundaries",
        kind: "longText",
        label:
          "What boundaries will I set? (What limits will you maintain? Examples: 'I won't have sex until I feel safe and connected,' 'I need consistency in communication,' 'I won't tolerate hot-cold behavior.' Boundaries protect you)",
      },
      {
        name: "how_to_communicate",
        kind: "longText",
        label:
          "How will I communicate these boundaries? (Practice clear, direct communication. Example: 'I need to take things slow,' 'I value consistency in communication,' 'I'm not comfortable with that.' You don't need to explain why—just state what you need)",
      },
    ],
    commitment: { text: "Finish" },
  },
}
