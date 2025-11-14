import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Cognitive Aid module lessons
 */
export const COGNITIVE_AID_LESSONS: Record<string, ILessonConfig> = {
  d9_rumination_cap: {
    id: "d9_rumination_cap",
    moduleId: "cognitive_aid",
    title: "Ruminations Cap",
    goal: "Contain worry to a window",
    estMinutes: 6,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Rumination feels productive—like you're solving a problem. But research shows it actually makes you feel worse and doesn't lead to solutions. Your brain gets stuck in loops, replaying the same thoughts without resolution.",
      },
      {
        t: "instruction",
        body: "The solution isn't to stop thinking—that's impossible. It's to contain it. We're going to create a 'worry window'—a designated 10-minute period where you can think about your concerns. The rest of the day is protected.",
      },
      {
        t: "instruction",
        body: "This works because it gives your brain structure. Instead of thoughts intruding all day, they know they have a scheduled time. This reduces the urgency and frequency of intrusive thoughts.",
      },
      {
        t: "instruction",
        body: "Pick ONE topic to focus on during this window. If another worry pops up, say to yourself: 'Not now—I'll think about that during my worry window later.' Write it down if you need to remember it.",
      },
      {
        t: "instruction",
        body: "Now, for the next 10 minutes, think about your chosen topic. Really think. Explore it from all angles. But here's the key: you're not trying to solve it. You're just thinking.",
      },
      { t: "timer", seconds: 600, label: "Worry window—think it through" },
      {
        t: "instruction",
        body: "Time's up. Closure: You don't need solutions right now. Let it be unfinished. The goal wasn't to solve anything—it was to give your thoughts a container so they don't hijack your entire day.",
      },
      {
        t: "instruction",
        body: "Before we end, identify one small action you could take later (not now) that might help. This shifts you from rumination to planning, which is more productive.",
      },
      {
        t: "textInput",
        prompt: "One small action you could take later?",
        placeholder: "e.g., 'Talk to a friend about this'",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "If worries come up later today, remind yourself: 'I have a worry window scheduled. I'll think about this then.' This creates space between the thought and your response.",
      },
      {
        t: "check",
        prompt: "I'll use the worry window technique when ruminations intrude",
      },
    ],
    commitment: { text: "Stick to window" },
  },
  d7_thought_traps: {
    id: "d7_thought_traps",
    moduleId: "cognitive_aid",
    title: "Recognize Thought Traps",
    goal: "Identify and challenge cognitive distortions",
    estMinutes: 14,
    format: "card",
    cards: [
      // FOUNDATION
      {
        type: "text",
        body: "Your mind is trying to protect you, but sometimes its strategies backfire. Cognitive distortions are thinking patterns that feel true but aren't accurate.",
      },
      {
        type: "text",
        body: "These patterns develop as shortcuts—ways your brain tries to make sense of painful experiences quickly. But they often make you feel worse.",
      },
      {
        type: "tip",
        body: "Learning to spot these patterns is one of the most powerful skills in recovery. Once you see them, they lose their grip.",
      },

      // DISTORTION 1: All-or-Nothing
      {
        type: "text",
        body: "ALL-OR-NOTHING THINKING\n\nSeeing things in extremes with no middle ground.\n\nExamples:\n• 'I'm completely unlovable'\n• 'The relationship was perfect until it ended'\n• 'I always fail at relationships'\n• 'They never cared about me'",
      },
      {
        type: "tip",
        body: "Reality is almost always more nuanced. Look for the gray: 'I'm struggling right now, AND I have people who care about me. The relationship had good parts AND fundamental incompatibilities.'",
      },
      {
        type: "qa",
        question: "Which all-or-nothing thought have you had recently?",
        options: [
          "I'll never find love again",
          "I'm completely worthless",
          "Everyone leaves me",
          "I always pick the wrong person",
        ],
      },

      // DISTORTION 2: Mind Reading
      {
        type: "text",
        body: "MIND READING\n\nAssuming you know what others think without evidence.\n\nExamples:\n• 'They think I'm pathetic for still caring'\n• 'Everyone can tell I'm a mess'\n• 'They're definitely happier now'\n• 'My friends are judging me'",
      },
      {
        type: "tip",
        body: "Challenge it: 'I don't actually know what they're thinking. I'm making assumptions based on my anxiety, not facts.' Ask yourself: What's the evidence?",
      },

      // DISTORTION 3: Catastrophizing
      {
        type: "text",
        body: "CATASTROPHIZING\n\nJumping to the worst possible outcome.\n\nExamples:\n• 'I'll be alone forever'\n• 'I'll never recover from this'\n• 'My whole life is ruined'\n• 'I can't survive this pain'",
      },
      {
        type: "text",
        body: "Your brain catastrophizes because it mistakes emotional pain for physical danger. The intensity of feeling makes the worst-case scenario seem certain.",
      },
      {
        type: "tip",
        body: "Counter it with: 'This feels permanent, but feelings aren't facts. I've survived difficult things before. I'm in intense pain AND I will get through this.'",
      },

      // DISTORTION 4: Emotional Reasoning
      {
        type: "text",
        body: "EMOTIONAL REASONING\n\nBelieving something is true because it feels true.\n\nExamples:\n• 'I feel unlovable, so I must be'\n• 'I feel like they're the only one, so they are'\n• 'I feel hopeless, so there is no hope'\n• 'I feel like I'm dying, so I can't handle this'",
      },
      {
        type: "tip",
        body: "Separate feeling from fact: 'I FEEL unlovable. That doesn't mean I AM unlovable. Feelings are valid, but they're not reality checks.'",
      },

      // DISTORTION 5: Personalization
      {
        type: "text",
        body: "PERSONALIZATION\n\nBlaming yourself for things outside your control.\n\nExamples:\n• 'If I were better, they'd have stayed'\n• 'I should have been enough'\n• 'It's my fault they couldn't commit'\n• 'I ruined everything'",
      },
      {
        type: "text",
        body: "Relationships end for complex reasons—timing, incompatibility, their own issues, circumstances. You're taking responsibility for things that weren't fully in your control.",
      },
      {
        type: "tip",
        body: "Try: 'I contributed to the relationship's problems AND so did they. I can learn and grow without carrying all the blame.'",
      },

      // DISTORTION 6: Should Statements
      {
        type: "text",
        body: "SHOULD STATEMENTS\n\nRigid rules about how things 'should' be.\n\nExamples:\n• 'I should be over this by now'\n• 'They should have treated me better'\n• 'I shouldn't still miss them'\n• 'Life should be fair'",
      },
      {
        type: "tip",
        body: "Replace 'should' with 'I wish' or 'I prefer': 'I wish I were further along in healing, AND I'm doing the best I can.' This creates space for reality without harsh judgment.",
      },

      // INTEGRATION
      {
        type: "text",
        body: "Most people use 2-3 distortions repeatedly. Your job isn't to eliminate them—that's impossible. Your job is to notice them.",
      },
      {
        type: "tip",
        body: "When you catch a distortion, name it: 'There's my all-or-nothing thinking again.' This creates distance between you and the thought. You're observing it, not being controlled by it.",
      },
      {
        type: "text",
        body: "Over time, this awareness weakens the distortion's power. You start to question thoughts automatically rather than believing them without examination.",
      },
    ],
    commitment: {
      text: "Name 3 traps",
      duration: "today",
    },
  },
  d7_cbt_record: {
    id: "d7_cbt_record",
    moduleId: "cognitive_aid",
    title: "CBT Thought Record",
    goal: "Reframe the loudest thought",
    estMinutes: 8,
    format: "journal",
    template: "cbt_5col",
    fields: [
      {
        name: "situation",
        kind: "longText",
        label: "Situation (What happened? Be specific—just the facts, not your interpretation)",
      },
      {
        name: "thought",
        kind: "longText",
        label:
          "Hot Thought (What's the automatic thought that popped up? The one that feels most intense)",
      },
      {
        name: "emotion",
        kind: "radio",
        label: "Main Emotion (What emotion does this thought create?)",
        options: ["sad", "angry", "fear", "shame", "other"],
      },
      {
        name: "evidence_for",
        kind: "longText",
        label: "Evidence For (What facts support this thought? Be honest—what's actually true?)",
      },
      {
        name: "evidence_against",
        kind: "longText",
        label:
          "Evidence Against (What facts contradict this thought? What's another way to see this?)",
      },
      {
        name: "alternative",
        kind: "longText",
        label: "Balanced Alternative (A more realistic, nuanced thought that considers both sides)",
      },
    ],
    autosaveTag: "cbt",
  },
  d8_reframe_script: {
    id: "d8_reframe_script",
    moduleId: "cognitive_aid",
    title: "Reframe in 3 Lines",
    goal: "Create believable alternative thoughts",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "hot",
        kind: "longText",
        label:
          "Hot thought (The automatic thought that's causing distress—write it exactly as it appears)",
      },
      {
        name: "balanced",
        kind: "longText",
        label:
          "Balanced thought (A more realistic alternative. Key: it must be believable. Not toxic positivity—something you can actually accept. Use 'AND' to hold complexity)",
      },
      {
        name: "action",
        kind: "shortText",
        label:
          "One action now (What's one small thing you can do that aligns with the balanced thought?)",
      },
    ],
    commitment: { text: "Say aloud 3×" },
  },
  d8_catastrophe_ladder: {
    id: "d8_catastrophe_ladder",
    moduleId: "cognitive_aid",
    title: "Catastrophe Ladder",
    goal: "Reduce worst-case spirals",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "worst",
        kind: "longText",
        label:
          "Worst case (What's the absolute worst that could happen? Go there—name the fear fully)",
      },
      {
        name: "likely",
        kind: "longText",
        label:
          "Most likely (What's actually most likely to happen? Be realistic, not optimistic—just honest about probabilities)",
      },
      {
        name: "cope",
        kind: "longText",
        label:
          "How I'd cope (Even if the worst happened, what would you do? What resources do you have? This builds confidence that you can handle difficulty)",
      },
    ],
    commitment: { text: "Work through 1 fear" },
  },
  cognitive_evidence_check: {
    id: "cognitive_evidence_check",
    moduleId: "cognitive_aid",
    title: "Evidence Check",
    goal: "Challenge thoughts with facts",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "thought",
        kind: "longText",
        label: "The thought (What's the distressing thought you want to examine?)",
      },
      {
        name: "evidence_for",
        kind: "longText",
        label:
          "Evidence supporting it (What facts or experiences support this thought? Be honest—don't dismiss valid concerns)",
      },
      {
        name: "evidence_against",
        kind: "longText",
        label:
          "Evidence against it (What facts or experiences contradict this thought? What would a friend say? What's another interpretation?)",
      },
      {
        name: "balanced",
        kind: "longText",
        label:
          "More balanced thought (Based on the evidence, what's a more accurate, nuanced perspective?)",
      },
    ],
    commitment: { text: "Check 2 thoughts" },
  },
  cognitive_perspective_shift: {
    id: "cognitive_perspective_shift",
    moduleId: "cognitive_aid",
    title: "Perspective Shift",
    goal: "See the situation from different angles",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "my_view",
        kind: "longText",
        label: "How I see it (Your current perspective—write it honestly, without judgment)",
      },
      {
        name: "friend_view",
        kind: "longText",
        label:
          "How a friend might see it (Imagine a compassionate friend who loves you. What would they say? How would they frame this?)",
      },
      {
        name: "future_view",
        kind: "longText",
        label:
          "How I'll see it in 6 months (Project forward. With time and distance, how might you view this differently? What will matter then?)",
      },
    ],
    commitment: { text: "Perspective shift" },
  },
  cognitive_black_white_thinking: {
    id: "cognitive_black_white_thinking",
    moduleId: "cognitive_aid",
    title: "Challenge All-or-Nothing Thinking",
    goal: "Find the gray areas",
    estMinutes: 5,
    format: "card",
    cards: [
      {
        type: "text",
        body: "All-or-nothing thinking sees the world in extremes: 'I'm a complete failure' or 'They're perfect.' 'The relationship was all good' or 'It was all bad.' 'I always mess up' or 'I never do anything right.'",
      },
      {
        type: "text",
        body: "This distortion feels true because it's simple and certain. But reality is almost always more complex. Most situations have nuance, gray areas, and mixed truths.",
      },
      {
        type: "text",
        body: "Your brain uses this pattern because it's efficient—categorizing things as all good or all bad is faster than holding complexity. But it creates unnecessary suffering when you can't see the middle ground.",
      },
      {
        type: "tip",
        body: "Practice finding the gray: 'I'm struggling with this breakup AND I'm doing my best. The relationship had good parts AND fundamental incompatibilities. I made mistakes AND so did they.'",
      },
      {
        type: "text",
        body: "When you catch an all-or-nothing thought, ask: 'What's the gray area here? What's partially true? What's the more nuanced version?' This doesn't minimize your pain—it just makes your thinking more accurate.",
      },
      {
        type: "tip",
        body: "Use the word 'AND' instead of 'BUT.' 'I'm hurting AND I'm healing.' 'This is hard AND I can handle it.' This holds complexity without dismissing either side.",
      },
    ],
    commitment: { text: "Catch 3 thoughts" },
  },
  cognitive_should_statements: {
    id: "cognitive_should_statements",
    moduleId: "cognitive_aid",
    title: "Replace 'Should' Statements",
    goal: "Reduce self-criticism and pressure",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "shoulds",
        kind: "longText",
        label:
          "List your 'should' statements (What do you tell yourself you 'should' be doing, feeling, or having? Examples: 'I should be over this by now,' 'I shouldn't still miss them')",
      },
      {
        name: "replacements",
        kind: "longText",
        label:
          "Replace with kinder alternatives (Turn 'should' into 'I wish' or 'I prefer.' Example: 'I wish I were further along, AND I'm doing my best.' This creates space for reality without harsh judgment)",
      },
    ],
    commitment: { text: "Replace 2 shoulds" },
  },
  cognitive_restructuring_practice: {
    id: "cognitive_restructuring_practice",
    moduleId: "cognitive_aid",
    title: "Cognitive Restructuring Practice",
    goal: "Systematically challenge and reframe thoughts",
    estMinutes: 8,
    format: "journal",
    fields: [
      {
        name: "situation",
        kind: "longText",
        label:
          "What situation triggered this thought? (Be specific—just the facts of what happened)",
      },
      {
        name: "automatic_thought",
        kind: "longText",
        label:
          "What's the automatic thought? (The thought that popped up automatically, without you choosing it)",
      },
      {
        name: "emotions",
        kind: "longText",
        label: "What emotions does this thought create? (How does thinking this make you feel?)",
      },
      {
        name: "evidence_for",
        kind: "longText",
        label: "Evidence supporting this thought (What facts or experiences support it? Be honest)",
      },
      {
        name: "evidence_against",
        kind: "longText",
        label:
          "Evidence against this thought (What contradicts it? What's another way to interpret this?)",
      },
      {
        name: "alternative_thought",
        kind: "longText",
        label:
          "A more balanced alternative thought (Based on the evidence, what's a more realistic, nuanced perspective? Must be believable, not just positive)",
      },
      {
        name: "outcome",
        kind: "longText",
        label:
          "How would you feel with the alternative thought? (If you believed the balanced thought instead, how would your emotions shift?)",
      },
    ],
    commitment: { text: "Restructure 2 thoughts" },
  },
}
