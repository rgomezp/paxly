import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Body Downshift module lessons
 */
export const BODY_DOWNSHIFT_LESSONS: Record<string, ILessonConfig> = {
  d4_breath_switch: {
    id: "d4_breath_switch",
    moduleId: "body_downshift",
    title: "Physiology First Switch",
    goal: "Reduce activation quickly",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When you're activated, your body is in fight-or-flight. Your breath is shallow and fast. You can't think your way out of this—you need to change your physiology first.",
      },
      {
        t: "instruction",
        body: "The physiological sigh is a rapid reset technique. It works by fully expanding your lungs, which activates your vagus nerve—the main pathway of your calming system.",
      },
      {
        t: "instruction",
        body: "Here's how: Breathe in through your nose. Then take a second, shorter inhale to fully fill your lungs. Exhale slowly through your mouth, making it longer than the inhale.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Notice any shift. Your heart rate might slow slightly. Your shoulders might drop. Even a small change signals your nervous system: 'We're safe enough to breathe slowly.'",
      },
      { t: "timer", seconds: 30, label: "Rest with the shift" },
      {
        t: "instruction",
        body: "This is your emergency brake. Use it anytime you feel panic rising or an urge to contact them. Two rounds can shift your state enough to make a clearer choice.",
      },
      {
        t: "check",
        prompt: "I can use physiological sigh when I need rapid regulation",
      },
    ],
    haptics: true,
    commitment: { text: "2 rounds" },
  },
  d4_cold_option: {
    id: "d4_cold_option",
    moduleId: "body_downshift",
    title: "Cold Option Menu",
    goal: "Offer fast body downshift options",
    estMinutes: 4,
    format: "card",
    cards: [
      {
        type: "text",
        body: "Cold water activates your mammalian diving reflex—an ancient survival mechanism that slows your heart rate and redirects blood flow. It's one of the fastest ways to shift your nervous system state.",
      },
      {
        type: "text",
        body: "When you're in fight-or-flight, your body is flooded with stress hormones. Cold water on your face or forearms sends a strong signal: 'This is not an emergency. We can slow down.'",
      },
      {
        type: "tip",
        body: "Options: Splash cold water on your face, hold wrists under cold tap, use a cold pack on your neck, or submerge your face in a bowl of cold water (if safe).",
      },
      {
        type: "text",
        body: "The effect is immediate but temporary—usually 30-60 seconds of regulation. Use it to create a window where you can make a clearer choice instead of reacting from activation.",
      },
      {
        type: "tip",
        body: "Keep a clean bowl or cold pack ready. When panic hits, you want tools immediately available, not something you have to search for.",
      },
    ],
    commitment: { text: "Pick 1 option" },
  },
  d4_shake_reset: {
    id: "d4_shake_reset",
    moduleId: "body_downshift",
    title: "Shake It Out",
    goal: "Discharge stress safely",
    estMinutes: 15,
    format: "practice",
    steps: [
      // FOUNDATION: The science of trapped activation
      {
        t: "instruction",
        body: "Your body right now is holding the physical residue of every stressful moment since the breakup. Every time you saw their name, every wave of panic, every sleepless night—it's all stored in your muscles.",
      },
      {
        t: "instruction",
        body: "Here's what happened: Each stress response released cortisol and adrenaline, preparing your muscles to fight or flee. But you didn't fight. You didn't run. You sat with it, pushed through, 'handled it maturely.'",
      },
      {
        t: "instruction",
        body: "Without discharge, that activation gets trapped. Your nervous system stays partially mobilized, like a car with the parking brake on while pressing the gas. This is why you feel simultaneously exhausted and wired.",
      },

      // EVOLUTIONARY CONTEXT
      {
        t: "instruction",
        body: "In nature, animals shake after escaping threat. Watch a gazelle after evading a lion—it shakes vigorously for 10-30 seconds, then returns to grazing. The shaking completes the stress cycle.",
      },
      {
        t: "instruction",
        body: "Humans have the same mechanism, but we suppress it. We've been socialized to 'keep it together,' to not show physical distress. But your body NEEDS this discharge.",
      },

      // PERSONAL RECOGNITION
      {
        t: "instruction",
        body: "Think about the last time you felt intense emotion about your ex. Where did that energy go? Did your muscles tense? Did you clench your fists? Hold your breath?",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Recall where you held that tension",
      },
      {
        t: "textInput",
        prompt: "Where do you typically hold stress in your body?",
        placeholder: "e.g., 'shoulders get tight, jaw clenches'",
      },

      // NORMALIZE THE PRACTICE
      {
        t: "instruction",
        body: "Shaking might feel silly or vulnerable. That's cultural conditioning. Your body's wisdom is older than social norms. Trust the intelligence that kept your ancestors alive.",
      },

      // PREPARATION
      {
        t: "instruction",
        body: "Stand with feet hip-width apart. Knees soft—not locked. This isn't exercise; it's release. There's no wrong way to shake. Your body knows how.",
      },
      {
        t: "check",
        prompt: "I'm standing with soft knees, ready to begin",
      },

      // PHASE 1: Gentle activation
      {
        t: "instruction",
        body: "Start small. Just bounce gently on your toes. Up and down, easy rhythm. This tells your nervous system: 'We're safe enough to move.'",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Gentle bouncing",
      },

      // PHASE 2: Arms and shoulders
      {
        t: "instruction",
        body: "Now add your arms. Let them be loose, floppy. Shake them like you're flicking water off your hands. Include your shoulders—let them bounce and jiggle.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Shake arms and shoulders",
      },

      // PHASE 3: Whole body
      {
        t: "instruction",
        body: "Let the shaking spread. Your whole body can shake now—legs, torso, head. Don't control it. Let it be messy, chaotic. This is your stress leaving your body.",
      },
      {
        t: "timer",
        seconds: 45,
        label: "Full body shake",
      },

      // PHASE 4: Organic wind-down
      {
        t: "instruction",
        body: "Start to slow the shaking naturally. Don't stop abruptly—let it taper off like a wave receding. Your body knows when it's discharged enough.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Gradually slow down",
      },

      // STILLNESS AND INTEGRATION
      {
        t: "instruction",
        body: "Stand still now. Feel your feet on the ground. Notice the sensation in your body—tingling, warmth, aliveness. This is what your body feels like without trapped activation.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Stand and feel the shift",
      },

      // SOMATIC CHECK-IN
      {
        t: "instruction",
        body: "Rate your physical tension now on a scale of 0-10. Compare it to before the shaking. Even a one-point drop is significant—that's trapped energy that left your system.",
      },
      {
        t: "textInput",
        prompt: "Tension level now? (0-10)",
        placeholder: "e.g., '4 (was 7 before)'",
      },

      // BREATH INTEGRATION
      {
        t: "instruction",
        body: "Take a few deep breaths to help your nervous system integrate this shift. You've just completed a stress cycle that might have been incomplete for days or weeks.",
      },
      {
        t: "breath",
        pattern: "physiological",
        rounds: 3,
      },

      // UNDERSTANDING THE MECHANISM
      {
        t: "instruction",
        body: "Here's what just happened neurologically: The shaking sent signals through your vagus nerve that the threat has passed. Your amygdala can downregulate. Your muscles can finally let go.",
      },
      {
        t: "instruction",
        body: "This isn't just stress relief—it's trauma prevention. Trapped activation, when chronic, becomes trauma. By discharging regularly, you're preventing stress from lodging in your body.",
      },

      // PRACTICAL PROTOCOL
      {
        t: "instruction",
        body: "Use shaking in these moments:\n\n• After crying or intense emotions\n• When you feel 'wound up' but can't name why\n• After difficult conversations or triggers\n• Before bed if you're holding the day's stress\n• Anytime your body feels like it WANTS to shake",
      },
      {
        t: "instruction",
        body: "Duration guide: 30 seconds minimum, 2 minutes maximum. Your body will know. Trust the wisdom that animals follow instinctively.",
      },

      // COMMITMENT
      {
        t: "check",
        prompt: "I commit to shaking after intense emotions this week",
      },
    ],
    haptics: true,
    commitment: {
      text: "Shake after big emotions",
      duration: "week",
    },
  },
  d5_urge_surf: {
    id: "d5_urge_surf",
    moduleId: "body_downshift",
    title: "Urge Surfing",
    goal: "Learn to ride urges without acting",
    estMinutes: 16,
    format: "practice",
    steps: [
      // FOUNDATION: What are urges?
      {
        t: "instruction",
        body: "Urges to contact your ex feel overwhelming because they ARE overwhelming—neurologically speaking.",
      },
      {
        t: "instruction",
        body: "When you think about contacting them, your brain releases dopamine in anticipation. It's the same system that drives craving in addiction.",
      },
      {
        t: "instruction",
        body: "Your brain thinks: 'If I just text them, I'll feel better.' And in the very short term, you might. But you're reinforcing the cycle, making the next urge stronger.",
      },

      // THE WAVE METAPHOR
      {
        t: "instruction",
        body: "Here's what research shows: Urges follow a predictable pattern. They rise, peak, and fall—like a wave.",
      },
      {
        t: "instruction",
        body: "The peak intensity usually lasts 60-90 seconds. Yes, seconds. It feels much longer because time distorts when you're in distress.",
      },
      {
        t: "instruction",
        body: "If you can ride the wave without acting, it WILL crest and fall. Every time you do this, you're rewiring your brain. You're teaching it: 'I can feel this and survive it.'",
      },

      // COMMON MISTAKES
      {
        t: "instruction",
        body: "Most people make one of two mistakes:\n\n1. They try to FIGHT the urge ('I shouldn't feel this!')\n2. They try to DISTRACT from it immediately\n\nBoth can work short-term, but they don't build the skill of being WITH discomfort.",
      },
      {
        t: "instruction",
        body: "Urge surfing is different. You're not fighting or fleeing. You're observing with curiosity, like a scientist studying a phenomenon.",
      },

      // SETUP: Current state assessment
      {
        t: "instruction",
        body: "Let's practice right now. First, check in: How strong is your urge to contact them at this moment?",
      },
      {
        t: "check",
        prompt: "Rate your current urge: 0 (none) to 10 (overwhelming)",
      },
      {
        t: "textInput",
        prompt: "What number? (0-10)",
        placeholder: "e.g., 7",
      },

      // SOMATIC AWARENESS
      {
        t: "instruction",
        body: "Now, instead of pushing the urge away, we're going to get curious about it. Where do you feel it in your body?",
      },
      {
        t: "instruction",
        body: "Common locations:\n• Chest (tightness, ache)\n• Stomach (churning, emptiness)\n• Throat (lump, constriction)\n• Hands (restlessness, reaching)\n• Head (spinning thoughts)",
      },
      { t: "timer", seconds: 30, label: "Locate the sensation" },
      {
        t: "textInput",
        prompt: "Where is it strongest?",
        placeholder: "e.g., 'tight chest and restless hands'",
      },

      // QUALITY EXPLORATION
      {
        t: "instruction",
        body: "Now describe the quality. Not the story ('I miss them'), but the physical sensation. Is it:\n\n• Hot or cold?\n• Sharp or dull?\n• Tight or loose?\n• Moving or still?\n• Heavy or light?",
      },
      { t: "timer", seconds: 45, label: "Observe the quality" },

      // THE SURF
      {
        t: "instruction",
        body: "Here comes the wave. For the next 90 seconds, you're going to stay with the urge without trying to change it or act on it.",
      },
      {
        t: "instruction",
        body: "Breathe naturally. Watch the sensation like you're watching clouds pass. Notice if it intensifies. Notice if it shifts location. Notice if it softens.",
      },
      {
        t: "instruction",
        body: "You might think: 'I can't do this.' That's a thought. Let it pass like everything else. Come back to the breath and the sensation.",
      },
      { t: "timer", seconds: 90, label: "Ride the wave" },

      // POST-SURF CHECK
      {
        t: "instruction",
        body: "You did it. You stayed with an uncomfortable feeling for 90 seconds without acting on it. That's the skill.",
      },
      {
        t: "check",
        prompt: "Check in: Rate your urge now (0-10)",
      },
      {
        t: "textInput",
        prompt: "What number now?",
        placeholder: "e.g., 5",
      },
      {
        t: "instruction",
        body: "Most people notice at least a small decrease. Even if it's still strong, you've proven you can be with it. That's progress.",
      },

      // REGULATION BREATH
      {
        t: "instruction",
        body: "Let's support your nervous system now with some regulating breaths. This signals safety to your body.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },

      // INTEGRATION: What you learned
      {
        t: "instruction",
        body: "Here's what just happened: You experienced an urge, didn't act on it, and it changed. This is evidence that urges are temporary.",
      },
      {
        t: "instruction",
        body: "Every time you surf an urge successfully, you're building:\n• Distress tolerance\n• Emotional regulation\n• Self-trust\n• Evidence that you can handle discomfort",
      },
      {
        t: "instruction",
        body: "The urge will come back. That's normal. But each time you practice, you're strengthening new neural pathways. You're literally changing your brain.",
      },

      // PROTOCOL FOR FUTURE
      {
        t: "instruction",
        body: "Use this protocol any time an urge hits:\n\n1. RATE: 0-10 intensity\n2. LOCATE: Where in your body?\n3. DESCRIBE: What's the quality?\n4. SURF: 90 seconds of observation\n5. BREATHE: 2-3 rounds to regulate\n6. RE-RATE: Notice the change",
      },
      {
        t: "check",
        prompt: "I commit to surfing urges >6/10 before any contact decision",
      },
    ],
    haptics: true,
    commitment: {
      text: "Surf >6/10",
      duration: "week",
    },
    checkIn: { urge: true },
  },
  d6_body_scan_basic: {
    id: "d6_body_scan_basic",
    moduleId: "body_downshift",
    title: "10-Point Body Scan",
    goal: "Increase interoceptive calm",
    estMinutes: 18,
    format: "practice",
    steps: [
      // FOUNDATION: What is interoception and why it matters
      {
        t: "instruction",
        body: "Your ability to sense what's happening inside your body is called interoception. It's your eighth sense—and after a breakup, it's often completely offline.",
      },
      {
        t: "instruction",
        body: "Here's why: When you're in emotional pain, your brain dampens internal signals to protect you. It's like turning down the volume on your body to avoid feeling the hurt.",
      },
      {
        t: "instruction",
        body: "But this disconnection has a cost. Research shows poor interoception correlates with anxiety, depression, and difficulty regulating emotions. You can't manage what you can't feel.",
      },

      // NEUROSCIENCE: The insula and emotional regulation
      {
        t: "instruction",
        body: "The insula—a brain region deep in your cerebral cortex—processes both physical sensations and emotions. When you practice body awareness, you're literally strengthening this bridge between body and feeling.",
      },
      {
        t: "instruction",
        body: "Studies using fMRI scans show that people with stronger interoceptive accuracy have better emotional regulation. They can identify feelings earlier and respond rather than react.",
      },

      // PERSONAL CONNECTION: Where are you right now?
      {
        t: "instruction",
        body: "Let's check your current interoceptive awareness. Can you feel your heartbeat without touching your chest? What about the temperature of your hands? The position of your tongue?",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Notice what you can and can't sense",
      },
      {
        t: "textInput",
        prompt: "What was easiest to sense? What was hardest?",
        placeholder: "e.g., 'Could feel hands were cold, couldn't sense heartbeat'",
      },

      // NORMALIZE: This is temporary
      {
        t: "instruction",
        body: "If you couldn't sense much, that's normal after trauma or loss. Your nervous system has been prioritizing survival over sensation. The good news: interoception is a skill you can rebuild.",
      },

      // THE PRACTICE: Setting up the scan
      {
        t: "instruction",
        body: "A body scan systematically directs attention through your body, reactivating those dulled pathways. We'll visit 10 points, spending about 20 seconds at each.",
      },
      {
        t: "instruction",
        body: "Important: You're not trying to relax or feel good. You're just noticing what IS. Tension is information. Numbness is information. Pain is information. We're building awareness, not forcing change.",
      },

      // Point 1: Crown
      {
        t: "instruction",
        body: "Start at the crown of your head—the very top. What do you notice? Pressure from air? Tingling? Warmth? Nothing? 'Nothing' is also a valid observation.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Crown of head",
      },

      // Point 2: Forehead and eyes
      {
        t: "instruction",
        body: "Move to your forehead and eyes. Common sensations: tension behind the eyes, furrowed brow, or a sense of 'holding.' This is where we often store cognitive stress.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Forehead and eyes",
      },

      // Point 3: Jaw
      {
        t: "instruction",
        body: "Now your jaw—a major tension holder. Are your teeth touching? Is your jaw clenched? The jaw connects to your fight response. Chronic clenching signals ongoing threat.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Jaw and mouth",
      },

      // Point 4: Throat
      {
        t: "instruction",
        body: "Focus on your throat. This area often holds unexpressed emotions—things you couldn't say, tears you couldn't cry. Notice any tightness, constriction, or 'lump.'",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Throat",
      },

      // Point 5: Chest/heart
      {
        t: "instruction",
        body: "Bring attention to your chest and heart space. This is often where grief lives—heaviness, aching, or emptiness. Whatever you find, just observe without trying to fix.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Chest and heart",
      },

      // Point 6: Belly
      {
        t: "instruction",
        body: "Move to your belly. The gut is your second brain—it has more neurons than your spinal cord. Notice: churning, butterflies, knots, or stillness? Your gut holds intuitive knowing.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Belly",
      },

      // Point 7: Lower back/hips
      {
        t: "instruction",
        body: "Focus on your lower back and hips. This area often stores fear and vulnerability. Notice any holding, pain, or disconnection. The psoas muscle here contracts during trauma.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Lower back and hips",
      },

      // Point 8: Thighs
      {
        t: "instruction",
        body: "Bring awareness to your thighs. These large muscles prepare you to run. Notice: tension, restlessness, or heaviness? They might be holding readiness for action.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Thighs",
      },

      // Point 9: Calves and shins
      {
        t: "instruction",
        body: "Move to your calves and shins. These muscles help you stand your ground or spring into action. Notice any tightness, aching, or energy.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Calves and shins",
      },

      // Point 10: Feet
      {
        t: "instruction",
        body: "Finally, your feet—your connection to the ground. Can you feel where they contact the floor? Temperature? Pressure? Your feet literally ground you in the present moment.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Feet",
      },

      // INTEGRATION: What did you discover?
      {
        t: "instruction",
        body: "Take a moment to sense your body as a whole now. You've just mapped your internal landscape. Some areas might feel more alive, others still numb. Both are okay.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Feel your whole body",
      },
      {
        t: "textInput",
        prompt: "Where did you notice the most sensation? Where the least?",
        placeholder: "e.g., 'Lots of jaw tension, couldn't feel my back'",
      },

      // THE SHIFT: What changed?
      {
        t: "instruction",
        body: "Compare how you feel now to when you started. Even subtle changes matter: feeling more 'in' your body, calmer, or just more aware. This is neuroplasticity in action.",
      },
      {
        t: "check",
        prompt: "I notice at least one small shift from before the scan",
      },

      // PRACTICAL APPLICATION
      {
        t: "instruction",
        body: "Use this scan in three key moments:\n\n1. When dissociating (feeling unreal or disconnected)\n2. Before important decisions (to access body wisdom)\n3. When stuck in rumination (to shift from thinking to sensing)",
      },
      {
        t: "instruction",
        body: "Pro tip: You don't always need all 10 points. Even scanning 3 points (head, heart, gut) for 30 seconds each can reconnect you to your body's intelligence.",
      },

      // COMMITMENT: Making it real
      {
        t: "instruction",
        body: "Your interoceptive accuracy improves with practice. Each scan strengthens the neural pathways between your insula and prefrontal cortex. You're literally rewiring for better emotional regulation.",
      },
      {
        t: "check",
        prompt: "I'll practice at least a 3-point scan (head/heart/gut) daily this week",
      },
    ],
    haptics: true,
    commitment: {
      text: "Daily 3-point scan",
      duration: "week",
    },
  },
  body_progressive_relaxation: {
    id: "body_progressive_relaxation",
    moduleId: "body_downshift",
    title: "Progressive Muscle Relaxation",
    goal: "Release physical tension systematically",
    estMinutes: 5,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Stress creates chronic muscle tension. You might not even notice it until you intentionally release it. Progressive muscle relaxation teaches you the difference between tension and relaxation.",
      },
      {
        t: "instruction",
        body: "The technique: Tense a muscle group for 5 seconds, then release. The contrast helps your nervous system recognize what relaxation actually feels like. It's like resetting your baseline.",
      },
      {
        t: "instruction",
        body: "Start with your feet. Tense them—curl your toes, flex your arches. Hold for 5 seconds, then release completely. Notice the difference between tension and release.",
      },
      { t: "timer", seconds: 15, label: "Feet: tense, hold, release" },
      {
        t: "instruction",
        body: "Move to your legs. Tense your thigh and calf muscles. Hold, then release. Notice the wave of relaxation.",
      },
      { t: "timer", seconds: 15, label: "Legs: tense, hold, release" },
      {
        t: "instruction",
        body: "Now your core—belly and lower back. Tense, hold, release. Feel the letting go.",
      },
      { t: "timer", seconds: 15, label: "Core: tense, hold, release" },
      {
        t: "instruction",
        body: "Finally, your arms and shoulders—often where we hold the most tension. Tense everything, hold, then let it all go.",
      },
      { t: "timer", seconds: 15, label: "Arms: tense, hold, release" },
      {
        t: "instruction",
        body: "Take a few regulating breaths. Notice how your whole body feels now—more relaxed, more spacious. This is what your body feels like without chronic tension.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Use this when you feel physically tense or before sleep. It's particularly helpful for releasing the tension you didn't realize you were holding.",
      },
    ],
    commitment: { text: "Practice muscle relaxation" },
  },
  body_walking_meditation: {
    id: "body_walking_meditation",
    moduleId: "body_downshift",
    title: "Walking Meditation",
    goal: "Ground through movement",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When you're stuck in your head, movement can help. Walking meditation combines physical activity with present-moment awareness. It's grounding because it uses your body and senses.",
      },
      {
        t: "instruction",
        body: "You don't need to walk slowly or formally. The practice is simply bringing attention to the act of walking—something you do automatically, but rarely notice.",
      },
      {
        t: "instruction",
        body: "Start walking at a comfortable pace. Notice each step: heel touches ground, weight shifts, ball of foot, then toe pushes off. Feel the rhythm of your gait.",
      },
      { t: "timer", seconds: 120, label: "Walk mindfully—feel each step" },
      {
        t: "instruction",
        body: "Expand your awareness. Notice your breath as you walk. Notice your surroundings—sights, sounds, air temperature. Notice your body—how your arms swing, your posture.",
      },
      { t: "timer", seconds: 120, label: "Continue walking with expanded awareness" },
      {
        t: "instruction",
        body: "If your mind wanders to thoughts about your ex or the breakup, gently return to the sensation of walking. Each return is the practice.",
      },
      {
        t: "instruction",
        body: "This is particularly helpful when you're ruminating or feeling restless. Movement + awareness = grounding. Use it anytime you need to shift out of your head and into your body.",
      },
    ],
    commitment: { text: "5-min walk" },
  },
  body_grounding_techniques: {
    id: "body_grounding_techniques",
    moduleId: "body_downshift",
    title: "Grounding Techniques Menu",
    goal: "Build a toolkit of grounding methods",
    estMinutes: 4,
    format: "card",
    cards: [
      {
        type: "text",
        body: "When you're activated, you're either in the past (ruminating) or the future (worrying). Grounding brings you back to the present moment using your five senses.",
      },
      {
        type: "text",
        body: "Grounding works because it activates your prefrontal cortex—the part of your brain that can observe and name things. This calms the amygdala's alarm by shifting your attention from threat to sensation.",
      },
      {
        type: "text",
        body: "Here are proven methods:\n\n• 5-4-3-2-1: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste\n• Cold water: Splash face or hold wrists under cold tap\n• Bare feet: Feel the floor, grass, or ground directly\n• Weighted object: Hold something with weight and notice its texture",
      },
      {
        type: "tip",
        body: "The key is using your senses to anchor in the present. When you're naming what you see or feel, you can't simultaneously be lost in anxious thoughts.",
      },
      {
        type: "text",
        body: "Practice 2-3 methods regularly so they become automatic. When panic hits, you want tools you can access without thinking. Muscle memory matters.",
      },
    ],
    commitment: { text: "2 methods" },
  },
  body_breath_variations: {
    id: "body_breath_variations",
    moduleId: "body_downshift",
    title: "Breath Variations Practice",
    goal: "Learn different breathing patterns",
    estMinutes: 5,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Different breathing patterns serve different purposes. Some are calming, some are energizing, some help with focus. Let's explore two proven patterns so you can find what works for you.",
      },
      {
        t: "instruction",
        body: "Box breathing creates a steady rhythm that calms your nervous system. It's used by Navy SEALs for stress regulation. The equal counts create predictability, which signals safety.",
      },
      {
        t: "instruction",
        body: "Try box breathing: 4 counts in, 4 hold, 4 out, 4 hold. Keep it smooth and steady.",
      },
      { t: "breath", pattern: "box", rounds: 3 },
      {
        t: "instruction",
        body: "Notice how that felt. Now try 4-7-8 breathing. This pattern emphasizes a longer exhale, which activates your parasympathetic system more strongly. The longer exhale signals your body to slow down.",
      },
      {
        t: "instruction",
        body: "4-7-8: 4 counts in, 7 hold, 8 out. Make the exhale longer than the inhale.",
      },
      { t: "breath", pattern: "4-7-8", rounds: 2 },
      {
        t: "instruction",
        body: "Which pattern felt better for you? There's no right answer—it's about what your body responds to. Some people prefer the steady rhythm of box breathing, others prefer the longer exhale of 4-7-8.",
      },
      {
        t: "textInput",
        prompt: "Which pattern felt better? (box or 4-7-8)",
        placeholder: "e.g., box",
      },
      {
        t: "instruction",
        body: "Use your preferred pattern when you need regulation. Having options gives you flexibility—use box breathing for steady calm, 4-7-8 when you need stronger downregulation.",
      },
    ],
    commitment: { text: "Use pattern 3×" },
  },
  body_tension_release: {
    id: "body_tension_release",
    moduleId: "body_downshift",
    title: "Tension Release Sequence",
    goal: "Release stored tension",
    estMinutes: 4,
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Stress creates tension in specific areas: shoulders, neck, jaw. This sequence targets those common holding patterns. Movement helps release what stretching alone might not.",
      },
      {
        t: "instruction",
        body: "Start with your shoulders—they often carry the weight of stress. Roll them back 5 times slowly, feeling the movement. Then roll them forward 5 times.",
      },
      { t: "timer", seconds: 30, label: "Shoulders: roll back and forward" },
      {
        t: "instruction",
        body: "Move to your neck. Gently turn your head side to side, slowly. Don't force it—just explore the range of motion. Notice any tight spots.",
      },
      { t: "timer", seconds: 30, label: "Neck: gentle side-to-side turns" },
      {
        t: "instruction",
        body: "Now your arms. Stretch them overhead, reaching up. Hold for a few seconds, feeling the stretch in your sides and shoulders. Then release and let them drop.",
      },
      { t: "timer", seconds: 30, label: "Arms: stretch overhead, hold, release" },
      {
        t: "instruction",
        body: "Take a few regulating breaths. Notice how your body feels now—more mobile, less constricted. This sequence helps release the tension you accumulate throughout the day.",
      },
      { t: "breath", pattern: "physiological", rounds: 2 },
      {
        t: "instruction",
        body: "Use this sequence when you feel physically tense, after long periods of sitting, or when stress is building in your body. It's a quick reset that your body understands.",
      },
    ],
    commitment: { text: "Do sequence" },
  },
}
