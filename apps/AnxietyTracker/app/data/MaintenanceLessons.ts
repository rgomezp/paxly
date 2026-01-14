import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Maintenance module lessons
 */
export const MAINTENANCE_LESSONS: Record<string, ILessonConfig> = {
  m_maint_30: {
    id: "m_maint_30",
    moduleId: "maintenance",
    title: "30-Day Check-In",
    goal: "Review progress + risks",
    format: "journal",
    fields: [
      {
        name: "wins",
        kind: "longText",
        label:
          "Wins this month (What went well? What did you accomplish? What skills did you practice? Acknowledge your progress—even small wins matter. This builds momentum)",
      },
      {
        name: "risks",
        kind: "longText",
        label:
          "Risks ahead (What challenges are coming? What situations might trigger you? What patterns are you noticing? Identifying risks helps you prepare, not panic)",
      },
      {
        name: "adjust",
        kind: "shortText",
        label:
          "One adjustment (Based on your wins and risks, what's one small change you'll make? Examples: 'I'll add a morning routine,' 'I'll check in with support weekly,' 'I'll practice one skill daily')",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_maint_60: {
    id: "m_maint_60",
    moduleId: "maintenance",
    title: "60-Day Check-In",
    goal: "Solidify habits",
    format: "journal",
    fields: [
      {
        name: "habits",
        kind: "longText",
        label:
          "What's sticking? (What habits have become automatic? What practices are you doing consistently? These are your anchors—they're working. Notice what's sustainable vs what felt forced)",
      },
      {
        name: "upgrade",
        kind: "shortText",
        label:
          "Upgrade one habit by 10% (Small improvements compound. Examples: 'I'll add 2 more minutes to my morning routine,' 'I'll practice one additional skill,' 'I'll check in with support twice a week instead of once.' Tiny upgrades prevent stagnation)",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_maint_90: {
    id: "m_maint_90",
    moduleId: "maintenance",
    title: "90-Day Letter",
    goal: "Send Future-You encouragement",
    format: "journal",
    fields: [
      {
        name: "letter",
        kind: "longText",
        label:
          "Write your 90-day letter (What do you want to tell yourself in 90 days? What are you proud of yourself for? What do you hope for? What encouragement do you need? This builds hope and agency—you're actively shaping your future)",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_craving_protocol: {
    id: "m_craving_protocol",
    moduleId: "maintenance",
    title: "Craving Protocol",
    goal: "One-page emergency plan",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Cravings and urges can hit even months after a breakup. Having a pre-planned protocol removes decision-making when you're activated. Your brain can't think clearly in that state—you need muscle memory.",
      },
      {
        type: "text",
        body: "Here's your protocol:\n\n1. NOTICE: 'I'm having an urge to contact them'\n2. NAME: 'This is my attachment system activating'\n3. WAIT: 90-second timer (urges peak and fall)\n4. BREATHE: 2-3 rounds of physiological breathing\n5. TEXT BUDDY: Reach out to support, not the ex\n6. RE-COMMIT: Remind yourself why you're doing this",
      },
      {
        type: "tip",
        body: "Pin this protocol in your SOS menu. When a craving hits, you don't need to remember the steps—they're right there. This creates space between urge and action.",
      },
      {
        type: "text",
        body: "The goal isn't to never have cravings—that's unrealistic. The goal is to have a plan when they hit. Each time you use the protocol successfully, you're strengthening new neural pathways.",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_relapse_review: {
    id: "m_relapse_review",
    moduleId: "maintenance",
    title: "Relapse Review (Non-Shame)",
    goal: "Turn slip into data",
    format: "journal",
    fields: [
      {
        name: "what_happened",
        kind: "longText",
        label:
          "What happened (Be factual, not judgmental: What actually occurred? What triggered it? What were the circumstances? This is data, not evidence against yourself)",
      },
      {
        name: "what_helped",
        kind: "longText",
        label:
          "What helped even a little (What did you do that worked? Did you pause? Did you reach out? Did you use a skill? Even small things count. This shows you have resources)",
      },
      {
        name: "next_time",
        kind: "shortText",
        label:
          "One change for next time (Based on what happened, what's one small adjustment? Examples: 'I'll check in with support before that situation,' 'I'll use my craving protocol earlier,' 'I'll avoid that trigger')",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_habit_tracking: {
    id: "m_habit_tracking",
    moduleId: "maintenance",
    title: "Habit Tracking",
    goal: "Track your progress",
    format: "journal",
    fields: [
      {
        name: "habits",
        kind: "longText",
        label:
          "What habits are you maintaining? (What practices are you doing regularly? Examples: morning routine, breath work, support check-ins, grounding exercises. Tracking helps you see what's working)",
      },
      {
        name: "progress",
        kind: "longText",
        label:
          "How's your progress? (Be honest: Are you consistent? Are some habits easier than others? What's working? What needs adjustment? Progress isn't linear—notice patterns without judgment)",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_trigger_awareness: {
    id: "m_trigger_awareness",
    moduleId: "maintenance",
    title: "Ongoing Trigger Awareness",
    goal: "Stay aware of triggers",
    format: "journal",
    fields: [
      {
        name: "triggers",
        kind: "longText",
        label:
          "What triggers are you noticing? (What situations, people, or thoughts still activate you? Triggers can evolve—what bothered you last month might be different now. Stay curious, not judgmental)",
      },
      {
        name: "responses",
        kind: "longText",
        label:
          "How are you responding? (What are you doing when triggers hit? Are you using your skills? Are you reaching out? Are you noticing patterns? This helps you see your growth and identify areas for improvement)",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_support_maintenance: {
    id: "m_support_maintenance",
    moduleId: "maintenance",
    title: "Maintain Your Support System",
    goal: "Keep connections strong",
    format: "builder",
    sections: [
      {
        title:
          "Support actions: Nurture your connections (Social support is crucial for long-term recovery. As you heal, it's easy to let these connections fade. But they're your safety net. Regular check-ins keep them strong and available when you need them)",
        items: [
          { label: "Check in with support person", kind: "check" },
          { label: "Attend support group", kind: "check" },
          { label: "Reach out to friend", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  m_celebration_milestones: {
    id: "m_celebration_milestones",
    moduleId: "maintenance",
    title: "Celebrate Milestones",
    goal: "Acknowledge your progress",
    format: "journal",
    fields: [
      {
        name: "milestones",
        kind: "longText",
        label:
          "What milestones have you reached? (Big or small: 30 days no contact, completed a module, had a good week, used a skill successfully, reconnected with a friend. Milestones are evidence of your progress—acknowledge them)",
      },
      {
        name: "celebration",
        kind: "shortText",
        label:
          "How will you celebrate? (Celebration reinforces progress. It can be small: 'I'll acknowledge this to myself,' 'I'll tell someone,' 'I'll treat myself to something.' The act of celebrating matters more than the size)",
      },
    ],
    commitment: { text: "Finish" },
  },
  m_ongoing_self_care: {
    id: "m_ongoing_self_care",
    moduleId: "maintenance",
    title: "Ongoing Self-Care Plan",
    goal: "Maintain self-care practices",
    format: "builder",
    sections: [
      {
        title:
          "Self-care practices: Sustain your healing (Self-care isn't a one-time thing—it's an ongoing practice. As you heal, it's easy to let these practices slide. But they're what got you here. Maintaining them prevents backsliding and supports continued growth)",
        items: [
          { label: "Daily practice", kind: "check" },
          { label: "Weekly practice", kind: "check" },
          { label: "Monthly practice", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
}
