import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Evidence-Based Relapse Recovery Lessons
 *
 * These lessons are grounded in:
 * - Marlatt & Gordon's Relapse Prevention Model (1985)
 * - Abstinence Violation Effect (AVE) cognitive restructuring
 * - Kristin Neff's Self-Compassion research (2023)
 * - Acceptance and Commitment Therapy (ACT) principles
 * - Urge Surfing / Mindfulness-Based Relapse Prevention (MBRP)
 * - Polyvagal Theory and nervous system regulation
 * - Future Self-Continuity research (Hershfield et al.)
 *
 * Each lesson has a distinct therapeutic approach to avoid repetition
 * and maximize effectiveness for different user needs.
 */

export const RELAPSE_LESSONS: Record<string, ILessonConfig> = {
  mini_repair_relapse: {
    id: "mini_repair_relapse",
    moduleId: "mini_interventions",
    title: "2-Minute Repair",
    goal: "Stabilize after contact/slip",
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

  /**
   * LESSON: Self-Compassion Reset
   *
   * Therapeutic approach: Kristin Neff's Self-Compassion Model
   * - Self-kindness vs self-judgment
   * - Common humanity vs isolation
   * - Mindfulness vs over-identification
   *
   * Distinct from other lessons: Focuses on the relational aspect of speaking
   * to yourself as you would a friend. Uses physical grounding (hand on heart)
   * and explicit common humanity framing.
   */
  relapse_self_compassion: {
    id: "relapse_self_compassion",
    moduleId: "mini_interventions",
    title: "Self-Compassion Reset",
    goal: "Counter the abstinence violation effect with self-kindness",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Research shows that how you respond to a slip matters more than the slip itself. Self-criticism actually increases the likelihood of further slips. Self-compassion does the opposite—it helps you get back on track.",
      },
      {
        t: "instruction",
        body: "Place one hand on your chest. This simple touch activates your body's caregiving system—the same neural circuits that respond to being comforted by someone who cares about you. Keep your hand there as you continue.",
      },
      {
        t: "instruction",
        body: "Acknowledge this moment honestly: 'This is hard. I'm struggling right now.' Not minimizing, not dramatizing—just recognizing what is.",
      },
      { t: "timer", seconds: 30, label: "Notice the feeling of your hand on your chest" },
      {
        t: "instruction",
        body: "Now remind yourself: millions of people struggle with this exact challenge. You're not uniquely flawed—you're experiencing something deeply human. Breaking contact is one of the hardest things people do.",
      },
      {
        t: "instruction",
        body: "Ask yourself: What would I say to a close friend who just texted their ex after weeks of no contact? When you continue to the next step, say those words to yourself, silently or aloud.",
      },
      { t: "timer", seconds: 45, label: "Speak to yourself as you would a friend" },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "check",
        prompt: "I can offer myself the same kindness I'd offer a friend.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Understanding the Slip
   *
   * Therapeutic approach: Marlatt's Abstinence Violation Effect (AVE)
   * - Reframe slip as learning data, not character flaw
   * - Understand the difference between lapse and relapse
   * - Cognitive restructuring of black-and-white thinking
   *
   * Distinct from other lessons: Educational/psychoeducation focus.
   * Provides a concrete framework for understanding what happened
   * and interrupting the shame spiral with knowledge.
   */
  relapse_understanding: {
    id: "relapse_understanding",
    moduleId: "mini_interventions",
    title: "Understanding the Slip",
    goal: "Use knowledge to interrupt the shame spiral",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When people break a commitment, they often experience what psychologists call the 'Abstinence Violation Effect'—a wave of guilt and shame that whispers 'you've failed completely.' This reaction, not the slip itself, is what often leads to giving up.",
      },
      {
        t: "instruction",
        body: "Here's what the research shows: a lapse (one contact) is not the same as a relapse (returning to old patterns). The single biggest predictor of whether a lapse becomes a relapse is whether you blame your character or the situation.",
      },
      { t: "breath", pattern: "box", rounds: 2 },
      {
        t: "instruction",
        body: "Let's look at this slip as data, not judgment. In the next step, you'll have time to think about what happened in the hours before you made contact. Were you tired? Lonely? Had something triggered old memories?",
      },
      { t: "timer", seconds: 45, label: "Identify what led to this moment" },
      {
        t: "instruction",
        body: "These situational factors don't excuse the slip—but they explain it. And explanations are actionable. Next time you notice those conditions building, you can intervene earlier.",
      },
      {
        t: "check",
        prompt: "I can see this as information about my high-risk situations.",
      },
      {
        t: "instruction",
        body: "The researchers who study this found that people who view slips as 'mistakes in learning' rather than 'proof of weakness' are far more likely to succeed long-term. You're building a skill—and skills involve practice, including imperfect practice.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Reconnect to Your Values
   *
   * Therapeutic approach: Acceptance and Commitment Therapy (ACT)
   * - Values clarification
   * - Committed action despite discomfort
   * - Defusion from self-critical thoughts
   *
   * Distinct from other lessons: Focuses on WHY you're doing this—
   * connecting to deeper values rather than just avoiding pain.
   * Uses ACT's emphasis on values-driven behavior.
   */
  relapse_values: {
    id: "relapse_values",
    moduleId: "mini_interventions",
    title: "Reconnect to Your Values",
    goal: "Ground your recovery in what matters most",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "You chose no contact for reasons that mattered to you. This slip doesn't change those reasons—they're still true. Let's reconnect with what you're actually committed to beneath the surface.",
      },
      {
        t: "instruction",
        body: "Think beyond 'getting over' this person. What kind of person do you want to become? What kind of life do you want to build? What values are you living toward—self-respect, peace, growth, authenticity? Take the next step when you're ready to reflect on this.",
      },
      { t: "timer", seconds: 60, label: "Connect with your deeper why" },
      {
        t: "instruction",
        body: "Values aren't goals you achieve—they're directions you move toward. Even after this slip, you can choose to take your next step in that direction. The slip was one moment; your values are ongoing.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Consider: What would someone who truly valued [your value] do right now, in this moment after a slip? Not someone perfect—someone committed despite imperfection.",
      },
      { t: "timer", seconds: 30, label: "Let that answer emerge" },
      {
        t: "check",
        prompt: "I'm choosing to take my next action based on my values, not my shame.",
      },
      {
        t: "instruction",
        body: "Research on behavior change shows that people who connect to their values—rather than focusing only on what they're avoiding—are more resilient after setbacks. Your values haven't changed. Your next action can reflect them.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Body Reset
   *
   * Therapeutic approach: Polyvagal Theory / Somatic Regulation
   * - Activating the ventral vagal (social engagement) system
   * - Physical discharge of stress energy
   * - Interoceptive awareness
   *
   * Distinct from other lessons: Purely body-based, minimal cognitive content.
   * For users who are too activated to think clearly and need to
   * regulate their nervous system first.
   */
  relapse_somatic: {
    id: "relapse_somatic",
    moduleId: "mini_interventions",
    title: "Body Reset",
    goal: "Regulate your nervous system through physical awareness",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Your nervous system is probably activated right now—heart racing, tension in your body, maybe a pit in your stomach. This is your body's stress response, and it's running the show. Before we can think clearly, we need to help your body feel safer.",
      },
      {
        t: "instruction",
        body: "If you can, stand up. When you continue to the next step, shake your hands vigorously—let your wrists go loose. This simple movement helps discharge some of the stress energy your body is holding.",
      },
      { t: "timer", seconds: 15, label: "Shake out your hands" },
      {
        t: "instruction",
        body: "Next, you'll roll your shoulders slowly—up toward your ears, back, and down. Do this three times during the timer. Your shoulders often hold tension you're not even aware of.",
      },
      { t: "timer", seconds: 20, label: "Roll your shoulders slowly" },
      {
        t: "instruction",
        body: "Sit or stand comfortably. Place both feet flat on the ground. Feel the floor beneath you—the pressure, the temperature, the stability. You are supported.",
      },
      { t: "breath", pattern: "physiological", rounds: 4 },
      {
        t: "instruction",
        body: "In the next step, scan from your head down to your toes. Where do you notice tension? Just notice—don't try to fix it. Awareness itself begins to shift things.",
      },
      { t: "timer", seconds: 45, label: "Scan your body with curiosity" },
      {
        t: "instruction",
        body: "Breathe into any tight areas. Imagine your breath flowing to that spot. As you exhale, let gravity do the work—let the tension soften, even just slightly.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Mapping What Happened
   *
   * Therapeutic approach: Marlatt's High-Risk Situation Analysis
   * - Functional analysis of the relapse chain
   * - Identifying triggers, warning signs, and decision points
   * - Building a "relapse road map" for prevention
   *
   * Distinct from other lessons: Analytical and future-prevention focused.
   * Helps users understand the chain of events that led to the slip
   * so they can intervene earlier next time.
   */
  relapse_chain_analysis: {
    id: "relapse_chain_analysis",
    moduleId: "mini_interventions",
    title: "Mapping What Happened",
    goal: "Understand the chain of events to prevent future slips",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Relapse researchers have found that slips don't happen out of nowhere—they follow a chain of events. By mapping this chain, you can identify earlier warning signs and create 'off-ramps' for next time.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Let's work backward from the moment of contact. In the next step, reflect on: What were you doing immediately before you reached out? Where were you? What time was it? Were you alone?",
      },
      { t: "timer", seconds: 30, label: "Recall the immediate moment before" },
      {
        t: "instruction",
        body: "Now go back further—an hour or two before. During the next step, consider: What was your emotional state? Were you feeling lonely, bored, anxious, nostalgic? Had something triggered memories of them?",
      },
      { t: "timer", seconds: 30, label: "Identify your emotional state" },
      {
        t: "instruction",
        body: "Go back even further—earlier that day or the night before. During the next step, ask yourself: Were you tired? Had you been isolating? Skipped meals or self-care? Had you been ruminating about them?",
      },
      { t: "timer", seconds: 30, label: "Look for earlier warning signs" },
      {
        t: "instruction",
        body: "You've just mapped your high-risk chain: life circumstances → emotional state → immediate trigger → contact. Somewhere in that chain, there was a point where a different choice was still possible.",
      },
      {
        t: "check",
        prompt: "I can identify at least one point in the chain where I could intervene next time.",
      },
      {
        t: "instruction",
        body: "This isn't about blame—it's about building an early warning system. Next time you notice the beginning of that chain (fatigue, isolation, a specific trigger), that's your cue to use a coping skill before the urge peaks.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Your Future Self
   *
   * Therapeutic approach: Future Self-Continuity research
   * - Hershfield's work on connecting with future self
   * - Visualization of best possible self
   * - Identity-based motivation
   *
   * Distinct from other lessons: Forward-looking rather than processing
   * the past. Uses visualization and temporal perspective-taking
   * to create motivation through connection to future identity.
   */
  relapse_future_self: {
    id: "relapse_future_self",
    moduleId: "mini_interventions",
    title: "Message From Your Future",
    goal: "Connect with who you're becoming",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Research shows that people who feel connected to their future selves make better decisions in the present. When your future self feels real—not like a stranger—you're more likely to act in ways that benefit them.",
      },
      {
        t: "instruction",
        body: "Close your eyes and imagine yourself six months from now. You've been building new patterns. You've gotten through hard days. In the next step, visualize: What does your morning feel like? What's different about how you carry yourself?",
      },
      { t: "timer", seconds: 60, label: "Visualize your future self in detail" },
      {
        t: "instruction",
        body: "This future version of you knows that today happened. They know you slipped. And they also know what you did next—how you got back up. In the next step, listen: What would they want to tell you right now?",
      },
      { t: "timer", seconds: 45, label: "Listen for their message" },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "Here's something the research reveals: feeling similar to your future self can actually reduce motivation, because there's no gap to close. The fact that you're not there yet is exactly why taking action matters.",
      },
      {
        t: "check",
        prompt: "I can act now in a way that helps my future self.",
      },
      {
        t: "instruction",
        body: "Your future self is built one choice at a time. This moment—right now—is one of those choices. Not the only one, but a real one.",
      },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Counting Real Progress
   *
   * Therapeutic approach: Self-efficacy enhancement
   * - Bandura's work on self-efficacy
   * - Evidence-based reflection on actual progress
   * - Countering all-or-nothing thinking with data
   *
   * Distinct from other lessons: Concrete, specific, evidence-focused.
   * For users who respond to data and tangible proof rather than
   * emotional or somatic approaches.
   */
  relapse_progress: {
    id: "relapse_progress",
    moduleId: "mini_interventions",
    title: "Counting Real Progress",
    goal: "See the evidence of your growth",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Your mind is probably doing something called 'all-or-nothing thinking' right now—telling you that this slip erased everything. Let's look at actual evidence instead of feelings about evidence.",
      },
      {
        t: "instruction",
        body: "How many days of no contact did you have before this? That's not zero now. Those days existed. Whatever coping skills you used during those days—you still have them. Take a moment in the next step to acknowledge that.",
      },
      { t: "timer", seconds: 30, label: "Acknowledge your streak" },
      {
        t: "instruction",
        body: "In the next step, think of one moment in the past few weeks when you felt an urge to reach out and didn't. What did you do instead? That's a skill you demonstrated. You own that.",
      },
      { t: "timer", seconds: 30, label: "Recall one time you resisted" },
      { t: "breath", pattern: "box", rounds: 2 },
      {
        t: "instruction",
        body: "Self-efficacy—your belief that you can succeed—is built on evidence. Not perfection, but evidence. You have evidence. One slip doesn't delete it; it just adds complexity to the story.",
      },
      {
        t: "check",
        prompt: "I can acknowledge my real progress alongside this setback.",
      },
      {
        t: "instruction",
        body: "The research is clear: people who can hold both truths—'I slipped' and 'I've also grown'—are more resilient than those who collapse into either denial or despair.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Radical Acceptance
   *
   * Therapeutic approach: DBT Radical Acceptance
   * - Accepting reality as it is, not as we wish it were
   * - Reducing suffering caused by fighting reality
   * - Moving from 'why' to 'what now'
   *
   * Distinct from other lessons: Focuses specifically on acceptance
   * as a prerequisite to change. For users stuck in rumination
   * or self-punishment loops.
   */
  relapse_acceptance: {
    id: "relapse_acceptance",
    moduleId: "mini_interventions",
    title: "Radical Acceptance",
    goal: "Stop fighting what already happened",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Radical acceptance doesn't mean approving of what happened or giving up. It means stopping the war with reality. You contacted them. That's done. The energy you spend wishing it hadn't happened is energy that can't go toward what's next.",
      },
      {
        t: "instruction",
        body: "Notice if there's a part of you that keeps replaying it, arguing with it, punishing yourself for it. That's your mind trying to change something that can't be changed. It's exhausting, and it doesn't work.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "instruction",
        body: "In the next step, try saying this silently or aloud: 'I reached out to them. This happened. I can't undo it.' Feel the difference between that and 'I can't believe I did that' or 'I'm so stupid.'",
      },
      { t: "timer", seconds: 30, label: "Practice stating the fact without judgment" },
      {
        t: "instruction",
        body: "Acceptance creates space. When you stop fighting what is, you have room to choose what's next. This isn't resignation—it's clearing the ground so you can build something new.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "check",
        prompt: "I accept that this happened. I'm ready to focus on what's next.",
      },
      {
        t: "instruction",
        body: "From this place of acceptance, your next choice becomes clearer. Not clouded by shame or denial, just honest: what do you want to do now?",
      },
      { t: "timer", seconds: 30, label: "Let clarity emerge" },
    ],
    commitment: { text: "Finish" },
  },

  /**
   * LESSON: Immediate Recommitment
   *
   * Therapeutic approach: Behavioral Activation / Implementation Intentions
   * - Concrete action planning
   * - Reducing the gap between intention and behavior
   * - Environmental modification
   *
   * Distinct from other lessons: Entirely action-focused. Minimal
   * processing, maximum momentum. For users who need to DO
   * something rather than feel something.
   */
  relapse_action: {
    id: "relapse_action",
    moduleId: "mini_interventions",
    title: "Immediate Recommitment",
    goal: "Take concrete action right now",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "The best time to recommit is immediately after a slip—not tomorrow, not when you feel ready, but now. Research on behavior change shows that the faster you take a concrete action, the more likely you are to get back on track.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "First: recommit out loud. When you continue to the next step, say 'I am continuing my no-contact commitment, starting this moment.' Speaking it makes it real in a way that thinking it doesn't.",
      },
      { t: "timer", seconds: 10, label: "Say your recommitment aloud" },
      {
        t: "instruction",
        body: "Second: take one environmental action during the next step. Delete the message thread. Block their number (again, if needed). Log out of the app where you contacted them. Move your phone to another room. Do something physical that makes the next slip harder.",
      },
      { t: "timer", seconds: 45, label: "Take one concrete action" },
      {
        t: "check",
        prompt: "I've taken at least one concrete action to support my recommitment.",
      },
      {
        t: "instruction",
        body: "Third: tell someone. Text a friend, call a family member, post in a support group. 'I slipped today and I'm recommitting.' Accountability isn't about shame—it's about not doing this alone.",
      },
      {
        t: "instruction",
        body: "You've stabilized. You've recommitted. You've taken action. That's not nothing—that's everything. This moment right here is you getting back up.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
    ],
    commitment: { text: "Finish" },
  },
}

// Array of all relapse lesson IDs for random selection
export const RELAPSE_LESSON_IDS = Object.keys(RELAPSE_LESSONS)

/**
 * LESSON DIFFERENTIATION SUMMARY
 *
 * Each lesson now has a distinct therapeutic approach:
 *
 * 1. mini_repair_relapse - Quick stabilization (unchanged)
 * 2. relapse_self_compassion - Neff's self-compassion (kindness, common humanity)
 * 3. relapse_understanding - Marlatt's AVE psychoeducation (lapse vs relapse)
 * 4. relapse_values - ACT values clarification (why you're doing this)
 * 5. relapse_somatic - Polyvagal body regulation (nervous system reset)
 * 6. relapse_chain_analysis - Marlatt's high-risk situation mapping (prevention-focused)
 * 7. relapse_future_self - Future self-continuity research (temporal connection)
 * 8. relapse_progress - Self-efficacy / evidence-based (data over feelings)
 * 9. relapse_acceptance - DBT radical acceptance (stop fighting reality)
 * 10. relapse_action - Behavioral activation (concrete immediate steps)
 *
 * KEY IMPROVEMENTS:
 * - Removed generic platitudes
 * - Added research citations/grounding in instructions
 * - Each lesson has distinct structure (not all: instruction → breath → timer)
 * - Affirmations reworded as capabilities, not forced feelings
 * - Timer steps have specific, actionable purposes
 * - Replaced neuroscience lesson with accurate AVE psychoeducation
 * - Added chain analysis lesson for understanding what led to the slip
 * - Reduced repetitive breathing across lessons
 */
