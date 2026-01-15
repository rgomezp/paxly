import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * "A New Relationship With Your Mind" lesson definitions.
 *
 * Phase 6: Integration - Module 20
 *
 * These lessons help users develop a new relationship with their mind.
 * They cover:
 * - Thoughts as events, not truths
 * - Emotions as weather
 * - You as the context, not the content
 */
export const NEW_RELATIONSHIP_WITH_MIND_LESSON_DEFINITIONS: Record<string, ILessonConfig> = {
  /**
   * 1. Thoughts as Events, Not Truths
   *
   * Format: Card lesson
   * Focus: Understanding that thoughts are events in the mind, not facts
   */
  new_relationship_with_mind_thoughts_as_events: {
    id: "new_relationship_with_mind_thoughts_as_events",
    moduleId: "new_relationship_with_mind",
    title: "Thoughts as Events, Not Truths",
    goal: "Understand that thoughts are events in the mind, not facts about reality",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Your mind produces thoughts constantly. Thousands of them every day. Most of them are just mental events—not facts, not truths, not commands. They're just thoughts.",
      },
      {
        type: "text",
        body: "When you have an anxious thought like 'What if something bad happens?' or 'I can't handle this,' it feels true. It feels urgent. But it's just a thought—a mental event, not a fact about reality.",
      },
      {
        type: "tip",
        body: "Thoughts = Mental events, not facts. Anxious thoughts feel true, but they're just thoughts.",
      },
      {
        type: "text",
        body: "The problem isn't the thought itself—it's believing the thought. When you believe 'I can't handle this,' you act as if it's true. When you see it as just a thought, you can respond differently.",
      },
      {
        type: "text",
        body: "You don't have to believe every thought. You don't have to act on every thought. You can notice a thought, recognize it as a mental event, and choose how to respond.",
      },
      {
        type: "tip",
        body: "You don't have to believe every thought. Notice it, recognize it as a mental event, choose your response.",
      },
      {
        type: "text",
        body: "Practice this: When you notice an anxious thought, say to yourself: 'That's a thought, not a fact.' 'My mind is producing that thought, but it doesn't mean it's true.' 'I can have this thought and still take action.'",
      },
      {
        type: "text",
        body: "Thoughts come and go. They're temporary. They don't define you. They don't control you. They're just mental events passing through your awareness.",
      },
      {
        type: "tip",
        body: "Thoughts come and go. They're temporary mental events. They don't define you or control you.",
      },
      {
        type: "text",
        body: "The more you practice seeing thoughts as events, the less power they have. You can notice them without getting caught in them. You can have anxious thoughts without being controlled by them.",
      },
      {
        type: "text",
        body: "Remember: Your mind produces thoughts. That's what minds do. But you don't have to believe them all. You can see them as events and choose how to respond.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 2. Emotions as Weather
   *
   * Format: Card lesson
   * Focus: Understanding emotions as temporary weather patterns
   */
  new_relationship_with_mind_emotions_as_weather: {
    id: "new_relationship_with_mind_emotions_as_weather",
    moduleId: "new_relationship_with_mind",
    title: "Emotions as Weather",
    goal: "Understand emotions as temporary weather patterns, not permanent states",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Emotions are like weather. They come and go. They change. They're temporary. Just like you can't control the weather, you can't always control your emotions—but you can learn to live with them.",
      },
      {
        type: "text",
        body: "When it's raining, you don't think 'It will rain forever.' You know it's temporary. You might not like it, but you know it will pass. Emotions are the same—they're temporary weather patterns in your inner world.",
      },
      {
        type: "tip",
        body: "Emotions = Weather patterns. They come and go. They're temporary, not permanent.",
      },
      {
        type: "text",
        body: "Anxiety is like a storm. It's intense. It feels overwhelming. But like a storm, it passes. It doesn't last forever. You can wait it out, or you can learn to be with it.",
      },
      {
        type: "text",
        body: "Just like you don't identify with the weather—you don't think 'I am the rain'—you don't have to identify with your emotions. You can feel anxious without being anxiety. You can feel sad without being sadness.",
      },
      {
        type: "tip",
        body: "You don't have to identify with emotions. You can feel anxious without being anxiety. Emotions are weather, not you.",
      },
      {
        type: "text",
        body: "Weather doesn't define the day—it's just part of it. Emotions don't define you—they're just part of your experience. You can have anxious weather and still live your life.",
      },
      {
        type: "text",
        body: "Practice this: When you feel intense emotion, remind yourself: 'This is weather. It's temporary. It will pass.' 'I can feel this and still take action.' 'This emotion doesn't define me.'",
      },
      {
        type: "tip",
        body: "Practice = Remind yourself emotions are weather. They're temporary. They don't define you.",
      },
      {
        type: "text",
        body: "The more you see emotions as weather, the less you fight them. You don't try to stop the rain—you just wait for it to pass. You don't try to eliminate anxiety—you just let it be weather.",
      },
      {
        type: "text",
        body: "Remember: Emotions are weather. They come and go. They're temporary. You can feel them without being controlled by them. You can have anxious weather and still live your life.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 3. You as the Context, Not the Content
   *
   * Format: Card lesson
   * Focus: Understanding that you are the awareness, not the thoughts and emotions
   */
  new_relationship_with_mind_context_not_content: {
    id: "new_relationship_with_mind_context_not_content",
    moduleId: "new_relationship_with_mind",
    title: "You as the Context, Not the Content",
    goal: "Understand that you are the awareness, not the thoughts and emotions",
    format: "card",
    cards: [
      {
        type: "text",
        body: "You are not your thoughts. You are not your emotions. You are the awareness that notices thoughts and emotions. You are the context, not the content.",
      },
      {
        type: "text",
        body: "Think about it: You can notice a thought. That means there's a 'you' that's noticing. You can observe an emotion. That means there's a 'you' that's observing. You are the awareness, not what you're aware of.",
      },
      {
        type: "tip",
        body: "You = The awareness that notices. You are not your thoughts or emotions—you're the one noticing them.",
      },
      {
        type: "text",
        body: "When you identify with thoughts and emotions—'I am anxious' or 'I am my thoughts'—you get caught in them. When you see yourself as the awareness, you can observe them without being controlled by them.",
      },
      {
        type: "text",
        body: "The content changes: Thoughts come and go. Emotions come and go. But the context—the awareness—remains. You are the stable ground, not the passing weather.",
      },
      {
        type: "tip",
        body: "Content = Thoughts and emotions (changing). Context = Awareness (stable). You are the context.",
      },
      {
        type: "text",
        body: "This doesn't mean you ignore thoughts and emotions. It means you relate to them differently. You notice them. You can respond to them. But you don't have to be them.",
      },
      {
        type: "text",
        body: "Practice this: When you notice a thought or emotion, remind yourself: 'I am the awareness noticing this. This is content. I am the context.' 'I can observe this without being it.'",
      },
      {
        type: "tip",
        body: "Practice = Remind yourself you are the awareness. You observe thoughts and emotions, but you're not them.",
      },
      {
        type: "text",
        body: "The more you practice seeing yourself as the context, the more freedom you have. You can have anxious thoughts without being anxious. You can feel anxiety without being anxiety. You are the awareness, not the content.",
      },
      {
        type: "text",
        body: "Remember: You are the context, not the content. You are the awareness that notices thoughts and emotions. This perspective gives you freedom and choice.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 4. Practicing a New Relationship
   *
   * Format: Practice lesson
   * Focus: Experiential practice in relating to thoughts and emotions differently
   */
  new_relationship_with_mind_practicing: {
    id: "new_relationship_with_mind_practicing",
    moduleId: "new_relationship_with_mind",
    title: "Practicing a New Relationship",
    goal: "Practice relating to thoughts and emotions as events and weather",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Let's practice a new relationship with your mind. We'll practice seeing thoughts as events, emotions as weather, and yourself as the awareness.",
      },
      {
        t: "instruction",
        body: "First, let's practice with thoughts. Notice a thought that comes up—any thought. Now, practice seeing it as a mental event, not a fact. Say to yourself: 'That's a thought, not a fact.'",
      },
      { t: "timer", seconds: 30, label: "Practice seeing thoughts as events" },
      {
        t: "instruction",
        body: "Now, notice another thought. Practice not believing it automatically. Practice recognizing it as a mental event that you can observe. 'I can have this thought without believing it.'",
      },
      { t: "timer", seconds: 30, label: "Practice not believing thoughts automatically" },
      {
        t: "instruction",
        body: "Next, let's practice with emotions. Notice any emotion you're feeling right now. Practice seeing it as weather—temporary, changing, not permanent. 'This emotion is weather. It will pass.'",
      },
      { t: "timer", seconds: 30, label: "Practice seeing emotions as weather" },
      {
        t: "instruction",
        body: "Now, practice not identifying with the emotion. You can feel it without being it. 'I feel this emotion, but I am not this emotion. It's weather, not me.'",
      },
      { t: "timer", seconds: 30, label: "Practice not identifying with emotions" },
      {
        t: "instruction",
        body: "Finally, let's practice seeing yourself as the awareness. Notice that you can observe your thoughts and emotions. That means there's a 'you' that's observing. You are the awareness, not the content.",
      },
      { t: "timer", seconds: 45, label: "Practice seeing yourself as awareness" },
      {
        t: "instruction",
        body: "Practice this perspective: 'I am the context, not the content. I am the awareness noticing thoughts and emotions. I can observe them without being controlled by them.'",
      },
      { t: "timer", seconds: 30, label: "Practice the perspective" },
      {
        t: "instruction",
        body: "Remember: Thoughts are events. Emotions are weather. You are the awareness. This new relationship gives you freedom and choice.",
      },
      {
        t: "instruction",
        body: "The more you practice this relationship, the more natural it becomes. You can have anxious thoughts and emotions without being controlled by them. You are the awareness, not the content.",
      },
      {
        t: "check",
        prompt: "I can practice seeing thoughts as events, emotions as weather, and myself as the awareness.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * 5. Your New Relationship With Your Mind
   *
   * Format: Journal lesson
   * Focus: Reflecting on and integrating the new relationship with your mind
   */
  new_relationship_with_mind_reflecting: {
    id: "new_relationship_with_mind_reflecting",
    moduleId: "new_relationship_with_mind",
    title: "Your New Relationship With Your Mind",
    goal: "Reflect on and integrate your new relationship with your mind",
    format: "journal",
    fields: [
      {
        id: "thoughts_as_events",
        label: "How does seeing thoughts as events, not truths, change your relationship with anxious thoughts?",
        kind: "longText",
      },
      {
        id: "emotions_as_weather",
        label: "How does seeing emotions as weather change how you relate to anxiety and other difficult emotions?",
        kind: "longText",
      },
      {
        id: "context_not_content",
        label: "What does it mean to you to be the context (awareness) rather than the content (thoughts/emotions)?",
        kind: "longText",
      },
      {
        id: "freedom",
        label: "How does this new relationship give you more freedom and choice in how you respond to anxiety?",
        kind: "longText",
      },
      {
        id: "practice_reminder",
        label: "Write a reminder you can use to practice this new relationship (e.g., 'Thoughts are events, emotions are weather, I am the awareness').",
        kind: "shortText",
      },
      {
        id: "integration",
        label: "How will you integrate this new relationship into your daily life? What will you practice?",
        kind: "longText",
      },
    ],
    commitment: { text: "Finish" },
  },
}

