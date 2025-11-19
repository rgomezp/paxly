import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Narrative module lessons
 */
export const NARRATIVE_LESSONS: Record<string, ILessonConfig> = {
  d19_fact_feel_meaning: {
    id: "d19_fact_feel_meaning",
    moduleId: "narrative",
    title: "Facts → Feelings → Meaning",
    goal: "Write a coherent breakup story",
    estMinutes: 7,
    format: "journal",
    fields: [
      {
        name: "facts",
        kind: "longText",
        label:
          "What happened (facts) - Just the facts, no interpretation. What actually occurred? When? What was said or done? Stick to observable events, not assumptions or judgments",
      },
      {
        name: "feelings",
        kind: "longText",
        label:
          "How it felt - Your emotional experience. What did you feel? Sad, angry, confused, relieved? All feelings are valid. This is your truth, separate from the facts",
      },
      {
        name: "meaning",
        kind: "longText",
        label:
          "What it means now - How are you making sense of this? What's the story you're telling yourself? This can evolve—what does it mean right now? (Not forever, just now)",
      },
    ],
    commitment: { text: "Finish" },
  },
  d20_self_forgiveness: {
    id: "d20_self_forgiveness",
    moduleId: "narrative",
    title: "Self-Forgiveness",
    goal: "Reduce self-blame loops",
    estMinutes: 6,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Self-forgiveness isn't about excusing your mistakes or pretending you did nothing wrong. It's about choosing to stop using your pain as proof that you're fundamentally flawed or unworthy.",
      },
      {
        type: "text",
        body: "You made mistakes. You probably have regrets. That's human. But holding onto self-blame keeps you stuck. It becomes a loop: 'I should have known better' → 'I'm stupid' → 'I deserve this pain' → 'I should have known better.'",
      },
      {
        type: "text",
        body: "Forgiveness breaks the loop. It says: 'I did the best I could with what I knew at the time. I can learn from this without using it as evidence against myself.'",
      },
      {
        type: "tip",
        body: "Practice saying: 'I did the best I could with what I knew. I can learn from this. I'm human, and humans make mistakes. I'm still worthy of love and healing.'",
      },
      {
        type: "text",
        body: "This doesn't mean you don't take responsibility. It means you take responsibility AND you offer yourself compassion. Both are possible. Both are necessary for healing.",
      },
    ],
    commitment: { text: "Finish" },
  },
  d20_grief_permissions: {
    id: "d20_grief_permissions",
    moduleId: "narrative",
    title: "Permissions to Grieve",
    goal: "Normalize waves of grief",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Grief comes in waves. It's not linear. You can miss them and still move on. You can be healing and still have hard days. You can know it's over and still feel the loss.",
      },
      {
        type: "text",
        body: "Society tells us to 'get over it' quickly. But grief has its own timeline. Fighting it makes it worse. Giving yourself permission to grieve actually helps you process and move forward.",
      },
      {
        type: "text",
        body: "Here are your permissions:\n\n• You can miss them\n• You can be sad\n• You can have hard days\n• You can take your time\n• You can grieve what you lost\n• You can grieve what you hoped for",
      },
      {
        type: "tip",
        body: "Instead of fighting every wave of grief, schedule short grief windows. Give yourself 10-15 minutes to feel it fully, then return to your day. This honors the grief without letting it take over.",
      },
      {
        type: "text",
        body: "Grief is love with nowhere to go. It's proof you cared. Let yourself feel it. It won't last forever, but trying to suppress it will make it last longer.",
      },
    ],
    commitment: { text: "Finish" },
  },
  d21_closure_ritual: {
    id: "d21_closure_ritual",
    moduleId: "narrative",
    title: "Private Closure Ritual",
    goal: "A symbolic close for this chapter",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Choose a ritual: Symbolic closure (Closure comes from within, not from them. A ritual helps your brain and body process the ending. It's a way to honor what was and mark that it's over. Choose something that feels meaningful to you)",
        items: [
          { label: "Write + rip letter", kind: "check" },
          { label: "Box old items", kind: "check" },
          { label: "Walk a new route", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  d21_keep_the_good: {
    id: "d21_keep_the_good",
    moduleId: "narrative",
    title: "Keep the Good, Ditch the Myth",
    goal: "Extract lessons without idealizing",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "good",
        kind: "longText",
        label:
          "What I'll keep (What was real and good? What did you learn? What memories or qualities do you want to carry forward? This honors the relationship without idealizing it)",
      },
      {
        name: "myth",
        kind: "longText",
        label:
          "What was fantasy (What did you hope for that wasn't real? What did you idealize? What story did you tell yourself that wasn't accurate? This helps you see clearly)",
      },
      {
        name: "lesson",
        kind: "shortText",
        label:
          "One lesson (What's one key lesson you're taking from this? This helps you extract meaning without romanticizing the pain)",
      },
    ],
    commitment: { text: "Finish" },
  },
  narrative_rewrite_story: {
    id: "narrative_rewrite_story",
    moduleId: "narrative",
    title: "Rewrite Your Story",
    goal: "Create a new narrative about the relationship",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "old_story",
        kind: "longText",
        label:
          "The old story you tell yourself (What's the narrative you've been repeating? Is it all-or-nothing? Does it blame you entirely or them entirely? What's the story that keeps you stuck?)",
      },
      {
        name: "new_story",
        kind: "longText",
        label:
          "A more balanced, accurate story (What's a more nuanced version? One that holds complexity—there were good parts AND problems, you both contributed AND it wasn't all your fault, it was meaningful AND it's over. Make it believable, not just positive)",
      },
    ],
    commitment: { text: "Finish" },
  },
  narrative_acceptance_practice: {
    id: "narrative_acceptance_practice",
    moduleId: "narrative",
    title: "Radical Acceptance",
    goal: "Accept what happened without judgment",
    estMinutes: 6,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Radical acceptance is a DBT skill that means fully accepting reality as it is, without fighting it. What happened, happened. Fighting it—wishing it were different, denying it, or resisting it—causes more pain than the event itself.",
      },
      {
        t: "instruction",
        body: "Acceptance doesn't mean approval. You don't have to like what happened. You don't have to think it was fair. You're just acknowledging: 'This is what happened. This is reality.'",
      },
      {
        t: "instruction",
        body: "Think of something about the breakup that's hard to accept. Maybe it's that it's over. Maybe it's how it ended. Maybe it's something they did or said.",
      },
      {
        t: "instruction",
        body: "Now practice accepting it. Say to yourself: 'This happened. I don't like it, but it's true. Fighting it won't change it. I can accept it and still feel my feelings about it.'",
      },
      { t: "timer", seconds: 120, label: "Practice accepting what happened" },
      {
        t: "instruction",
        body: "Notice any resistance. That's normal. Acceptance is a practice—you do it over and over. Each time you accept reality instead of fighting it, you reduce your suffering.",
      },
      {
        t: "check",
        prompt: "I can practice acceptance when I'm resisting reality",
      },
    ],
    commitment: { text: "Finish" },
  },
  narrative_meaning_making: {
    id: "narrative_meaning_making",
    moduleId: "narrative",
    title: "Find Meaning in the Experience",
    goal: "Extract meaning without romanticizing",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "lessons",
        kind: "longText",
        label:
          "What did you learn? (What did this relationship teach you? About yourself? About relationships? About what you need? About what you won't tolerate? Extract lessons without saying 'everything happens for a reason')",
      },
      {
        name: "growth",
        kind: "longText",
        label:
          "How did you grow? (What skills did you develop? What did you discover about yourself? What are you proud of yourself for? This acknowledges your resilience without minimizing the pain)",
      },
    ],
    commitment: { text: "Finish" },
  },
  narrative_let_go_ritual: {
    id: "narrative_let_go_ritual",
    moduleId: "narrative",
    title: "Let Go Ritual",
    goal: "Symbolically release the past",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Choose a ritual: Symbolic release (Rituals help your brain process endings. They create a clear marker: 'This chapter is closed.' Choose something that feels meaningful and safe)",
        items: [
          { label: "Write and burn letter", kind: "check" },
          { label: "Release ceremony", kind: "check" },
          { label: "Symbolic gesture", kind: "shortText" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  narrative_future_vision: {
    id: "narrative_future_vision",
    moduleId: "narrative",
    title: "Vision for Your Future",
    goal: "Create a positive vision forward",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "vision",
        kind: "longText",
        label:
          "What do you want your future to look like? (Be specific: What does your life look like in 6 months? A year? What are you doing? Who are you? What matters to you? This isn't about finding a new partner—it's about building a life you're excited about)",
      },
      {
        name: "steps",
        kind: "longText",
        label:
          "First steps toward that vision (What are small, concrete actions you can take? Examples: 'Reconnect with friends,' 'Start that hobby,' 'Focus on career,' 'Travel somewhere new.' Make them specific and achievable)",
      },
    ],
    commitment: { text: "Finish" },
  },
}
