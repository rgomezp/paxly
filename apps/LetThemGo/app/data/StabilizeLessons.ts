import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Stabilize module lessons
 */
export const STABILIZE_LESSONS: Record<string, ILessonConfig> = {
  d1_stabilize_intro: {
    id: "d1_stabilize_intro",
    moduleId: "stabilize",
    title: "Lower the Volume",
    goal: "Reduce panic 10–20% and create safety nets",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Right now, your nervous system is in overdrive. Breakups yank away predictability, and your brain fires alarms trying to regain certainty.",
      },
      {
        type: "text",
        body: "This panic isn't a flaw—it's your attachment system responding to loss. Your body is treating this separation as a threat, flooding you with stress hormones.",
      },
      {
        type: "tip",
        body: "The key insight: This is an alarm, not the truth. The intensity will pass. Your job right now is to lower the volume, not solve everything.",
      },
      {
        type: "text",
        body: "We're going to build immediate safety nets: grounding techniques, support contacts, and crisis protocols. These aren't permanent solutions—they're life rafts for right now.",
      },
      {
        type: "text",
        body: "You don't need to feel better immediately. You just need to feel 10-20% more stable. That's enough to start making clearer choices.",
      },
      {
        type: "tip",
        body: "When panic hits, say: 'This is my nervous system responding to loss. It's intense, and it will pass. I have tools.'",
      },
    ],
    commitment: { text: "Finish" },
    checkIn: { mood: true, urge: true },
    gating: { minHoursBeforeNext: 12 },
  },
  d1_ground_name5: {
    id: "d1_ground_name5",
    moduleId: "stabilize",
    title: "Name 5 Things",
    goal: "Interrupt spirals with sensory grounding",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "When panic hits, your consciousness gets pulled into mental loops—future catastrophes or past replays. Grounding brings you back to the physical present.",
      },
      {
        t: "instruction",
        body: "This works through dual awareness—you can't fully panic while simultaneously observing and naming your environment. It's neurologically impossible to be fully in a memory and fully present.",
      },
      {
        t: "instruction",
        body: "Research shows that naming what you perceive activates your left prefrontal cortex—the brain's 'interpreter.' This calms the right hemisphere's emotional activation.",
      },
      {
        t: "instruction",
        body: "Before we start: Where are you experiencing the most activation right now? Chest? Stomach? Head? Just notice without trying to change it.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Locate the sensation of activation",
      },
      {
        t: "instruction",
        body: "Now, look around slowly. Name 5 things you see—but be forensically specific. Not 'wall' but 'cream-colored wall with a hairline crack near the corner.'",
      },
      {
        t: "timer",
        seconds: 45,
        label: "Name 5 specific things you see",
      },
      {
        t: "instruction",
        body: "Good. Now 4 things you can physically feel. The pressure of your feet on the floor—is it even or uneven? The texture of your clothing—smooth, rough, tight, loose?",
      },
      {
        t: "timer",
        seconds: 40,
        label: "Notice 4 distinct physical sensations",
      },
      {
        t: "instruction",
        body: "Listen for 3 sounds. Include the subtle ones—the hum of electronics, distant traffic, your own breathing. Your nervous system is constantly monitoring these; making them conscious creates safety.",
      },
      {
        t: "timer",
        seconds: 35,
        label: "Identify 3 different sounds",
      },
      {
        t: "instruction",
        body: "2 things you can smell—even if subtle. The scent of your laundry detergent, coffee from this morning, the neutral smell of your space.",
      },
      {
        t: "timer",
        seconds: 25,
        label: "Notice 2 scents",
      },
      {
        t: "instruction",
        body: "1 thing you can taste. Even if it's just the taste of your own mouth. Metallic? Neutral? Coffee lingering?",
      },
      {
        t: "timer",
        seconds: 15,
        label: "Identify 1 taste",
      },
      {
        t: "instruction",
        body: "Now check: Has the activation in your body shifted at all? Even 10% different counts. You've just used sensory grounding to regulate your nervous system.",
      },
      {
        t: "textInput",
        prompt: "How has the sensation changed (if at all)?",
        placeholder: "e.g., 'less tight,' 'moved from chest to stomach,' 'same but quieter'",
      },
      {
        t: "instruction",
        body: "This technique works because trauma and panic disconnect us from our bodies and environment. Grounding reminds your nervous system: 'I'm here, now, and there's no immediate threat.'",
      },
      {
        t: "instruction",
        body: "Use 5-4-3-2-1 when: Your mind races to worst-case scenarios. You feel disconnected or 'floaty.' Contact urges spike. Before sleep to quiet mental loops.",
      },
      {
        t: "check",
        prompt: "I'll use 5-4-3-2-1 grounding when spirals start",
      },
      {
        t: "instruction",
        body: "Remember: The goal isn't to eliminate panic—it's to create enough regulation that you can make conscious choices rather than reactive ones.",
      },
    ],
    commitment: { text: "Finish" },
  },
  d1_sleep_triage: {
    id: "d1_sleep_triage",
    moduleId: "stabilize",
    title: "The Power of Sleep",
    goal: "Understand how sleep accelerates heartbreak healing",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Right now, your brain is working overtime processing loss. Every thought about your ex, every wave of panic, every moment of grief—your nervous system is trying to make sense of it all.",
      },
      {
        type: "text",
        body: "Sleep isn't just rest. During deep sleep, your brain performs critical repair work: consolidating memories, clearing metabolic waste, and regulating emotional circuits. This is when healing actually happens.",
      },
      {
        type: "text",
        body: "Research shows that sleep deprivation after emotional trauma makes recovery significantly harder. Without adequate sleep, your amygdala (fear center) becomes hyperactive, your prefrontal cortex (rational thinking) weakens, and emotional regulation becomes nearly impossible.",
      },
      {
        type: "tip",
        body: "Key insight: Sleep is when your brain processes and integrates the breakup. It's not avoiding the pain—it's actively working through it at a neurological level.",
      },
      {
        type: "text",
        body: "During REM sleep, your brain replays emotional experiences and weakens their intensity. This is why you might wake up feeling slightly different—your brain has been doing the work of emotional processing while you slept.",
      },
      {
        type: "text",
        body: "When you're sleep-deprived, cortisol stays elevated, making you more reactive, more anxious, and more likely to reach out to your ex. Good sleep lowers cortisol and increases your capacity to handle difficult emotions.",
      },
      {
        type: "qa",
        question: "How has your sleep been since the breakup?",
        options: [
          "Completely disrupted",
          "Trouble falling/staying asleep",
          "Sleeping but not rested",
          "Relatively normal",
        ],
      },
      {
        type: "text",
        body: "Sleep also supports neuroplasticity—your brain's ability to form new neural pathways. Every night you sleep well, you're literally rewiring your brain away from the attachment patterns that keep you stuck.",
      },
      {
        type: "text",
        body: "Your immune system needs sleep to function properly. Heartbreak creates physical stress, and without sleep, your body can't repair itself. This is why you might feel physically exhausted even when you're not doing much.",
      },
      {
        type: "tip",
        body: "The goal isn't perfect sleep—it's slightly better sleep. Even 20% improvement helps your nervous system reset. One good night can shift your entire next day.",
      },
      {
        type: "text",
        body: "Here's what helps: Create a dark, cool environment (your body needs darkness to produce melatonin). Charge your phone outside the bedroom (blue light suppresses sleep hormones). Set a consistent wind-down routine (read, shower, stretch, or listen to calming audio).",
      },
      {
        type: "text",
        body: "If your mind races at night, try this: Before bed, write down your racing thoughts on paper. This signals to your brain that you've captured them, so it doesn't need to keep replaying them. Your brain can let go because it knows the thoughts are stored.",
      },
      {
        type: "text",
        body: "Remember: Sleep is not a luxury during heartbreak—it's essential medicine. Every hour of quality sleep is an investment in your recovery. Your future self will thank you for prioritizing rest.",
      },
      {
        type: "tip",
        body: "Tonight, commit to one sleep improvement: dim lights 2 hours before bed, charge your phone outside the bedroom, or set a wind-down routine. Small changes compound into real healing.",
      },
    ],
    commitment: { text: "Finish" },
  },
  d2_panic_edu: {
    id: "d2_panic_edu",
    moduleId: "stabilize",
    title: "Why Your Brain Is Loud",
    goal: "Normalize breakup panic and reduce fear of feelings",
    format: "card",
    cards: [
      {
        type: "text",
        body: "Your brain is screaming right now because it's wired to treat separation as life-threatening. This isn't metaphorical—it's neurobiological reality.",
      },
      {
        type: "text",
        body: "When you were an infant, separation from caregivers meant death. Your attachment system developed to keep you close to safety. That same system is firing now, treating your ex like oxygen.",
      },
      {
        type: "text",
        body: "Three alarm systems are active simultaneously: Your amygdala (threat detector) sees unpredictability as danger. Your anterior cingulate cortex (pain center) processes emotional pain like physical injury. Your hypothalamus floods you with stress hormones.",
      },
      {
        type: "text",
        body: "Research shows that rejection activates the same brain regions as physical pain. When people say heartbreak 'hurts,' they're describing literal neural activation in pain centers.",
      },
      {
        type: "tip",
        body: "Take 30 seconds right now. Place your hand on your chest. Notice any tightness, aching, or pressure. This is your attachment system's physical signature.",
      },
      {
        type: "qa",
        question: "Where do you feel the panic most strongly in your body?",
        options: ["Chest/heart area", "Stomach/gut", "Throat/jaw", "All over"],
      },
      {
        type: "text",
        body: "Your nervous system has three states: Ventral vagal (safe/social), sympathetic (fight/flight), and dorsal vagal (freeze/shutdown). Breakups often trigger rapid cycling between all three.",
      },
      {
        type: "text",
        body: "The panic feels like truth because cortisol and adrenaline narrow your thinking. Your prefrontal cortex—the part that can see nuance and time—goes offline. Everything feels urgent and permanent.",
      },
      {
        type: "tip",
        body: "Key insight: Panic is data about your nervous system state, not data about reality. The alarm is real; what it's telling you isn't necessarily true.",
      },
      {
        type: "text",
        body: "Your brain is also experiencing dopamine withdrawal. Every text, call, or thought about your ex triggered dopamine. Now that supply is cut off, creating genuine withdrawal symptoms.",
      },
      {
        type: "text",
        body: "This is why contact urges feel so intense—your brain is seeking its dopamine fix. Intermittent reinforcement (unpredictable contact) makes this worse, creating addiction-like patterns.",
      },
      {
        type: "qa",
        question: "How would you describe your current panic level?",
        options: ["Overwhelming waves", "Constant background hum", "Sudden spikes", "Numbing fog"],
      },
      {
        type: "text",
        body: "Here's what helps: Name it. Studies show that labeling emotions ('This is panic') activates your prefrontal cortex and calms the amygdala. Say out loud: 'This is my attachment alarm.'",
      },
      {
        type: "text",
        body: "The intensity will decrease—not linearly, but it will. Your nervous system has plasticity. Every time you notice panic without acting on it, you're building new neural pathways.",
      },
      {
        type: "tip",
        body: "Progress looks like: Shorter panic waves. Faster recovery. More moments of clarity. Not the absence of pain, but increased capacity to be with it.",
      },
    ],
    commitment: { text: "Finish" },
    checkIn: { mood: true, urge: true },
  },
  d2_crisis_plan: {
    id: "d2_crisis_plan",
    moduleId: "stabilize",
    title: "Personal SOS Plan",
    goal: "Create a written stepwise crisis plan",
    format: "builder",
    sections: [
      {
        title:
          "Name the people who can anchor you when a crisis hits (research shows that social support is one of the strongest predictors of recovery)",
        items: [
          { label: "Add primary support", kind: "shortText" },
          { label: "Add secondary support", kind: "shortText" },
          { label: "Add backup support", kind: "shortText" },
        ],
      },
      {
        title: "What do these people mean to you (in 2-3 sentences)?",
        items: [
          { label: "Primary support meaning", kind: "shortText" },
          { label: "Secondary support meaning", kind: "shortText" },
          { label: "Backup support meaning", kind: "shortText" },
        ],
      },
    ],
    commitment: { text: "Finish" },
  },
  d3_contact_risk_scan: {
    id: "d3_contact_risk_scan",
    moduleId: "stabilize",
    title: "Contact Risk Scan",
    goal: "Identify top relapse triggers",
    format: "journal",
    fields: [
      {
        name: "understanding",
        kind: "longText",
        label:
          "First, let's understand why contact feels so urgent. Your brain treats your ex like a drug—literally.\n\nWhat specific feeling does contact promise to fix? (loneliness, anxiety, emptiness, fear?)",
      },
      {
        name: "physical_cues",
        kind: "longText",
        label:
          "What physical sensations arise right before you want to reach out? (chest tightness, stomach drop, skin crawling, restlessness?)\n\nName them.",
      },
      {
        name: "triggers",
        kind: "longText",
        label:
          "What are your top 3 contact triggers? Be specific: certain times (late night, Sunday mornings)? Places (your apartment, their neighborhood)? States (after drinking, when lonely)?",
      },
      {
        name: "routes",
        kind: "longText",
        label:
          "How do you typically initiate contact? List all routes: direct text, Instagram story views, 'accidental' calls, mutual friends, checking their Spotify?",
      },
      {
        name: "justifications",
        kind: "longText",
        label:
          "What stories does your brain tell to justify contact? ('Just to check they're okay,' 'For closure,' 'To return their things,' 'They might have changed')",
      },
      {
        name: "aftermath",
        kind: "longText",
        label:
          "What typically happens AFTER you make contact? How do you feel 2 hours later? 24 hours later? (Be honest)",
      },
      {
        name: "risk",
        kind: "slider",
        label: "Current contact urge intensity",
        min: 0,
        max: 10,
      },
      {
        name: "protection",
        kind: "longText",
        label:
          "What would need to change to drop this risk by 2 points? (block number, delete photos, tell a friend, remove apps?)",
        minWords: 15,
      },
    ],
    commitment: { text: "Finish" },
  },
  d3_meal_anchor: {
    id: "d3_meal_anchor",
    moduleId: "stabilize",
    title: "Fuel the System",
    goal: "Stabilize appetite/energy",
    format: "builder",
    sections: [
      {
        title:
          "Did you know:\n\nWhen your blood sugar crashes, your nervous system interprets it as more stress. Regular meals can prevent this cascade.\n\nToday's anchors:\n\nProtein + carb combos stabilize blood sugar.\n\nTake a second to think about how you've been eating lately.",
        items: [
          { label: "I've been eating regularly", kind: "check" },
          { label: "I could be doing better", kind: "check" },
        ],
      },
      {
        title: "What have you eaten today?",
        items: [
          { label: "Breakfast", kind: "shortText" },
          { label: "Lunch", kind: "shortText" },
          { label: "Dinner", kind: "shortText" },
        ],
      },
      {
        title:
          "Commit to one dietary improvement tomorrow:\n\n(Protein + carb combos are the best way to stabilize blood sugar)",
        items: [{ label: "e.g: eat a protein + carb combo for breakfast", kind: "shortText" }],
      },
    ],
    commitment: { text: "Finish" },
  },
  d3_support_ping: {
    id: "d3_support_ping",
    moduleId: "stabilize",
    title: "Text a Safe Person",
    goal: "Activate support, not the ex",
    format: "journal",
    fields: [
      {
        name: "recipient",
        kind: "shortText",
        label: "Who is someone you can text right now if you need support? Name them.",
      },
      {
        name: "message",
        kind: "longText",
        label: "Draft your message. Even if you don't send it, it's helpful to have it ready.",
      },
    ],
    commitment: { text: "Finish" },
  },
  stabilize_breath_anchor: {
    id: "stabilize_breath_anchor",
    moduleId: "stabilize",
    title: "Breath Anchor Practice",
    goal: "Create a reliable calming anchor",
    format: "practice",
    steps: [
      {
        t: "instruction",
        body: "Your breath is the only part of your autonomic nervous system you can consciously control. It's the bridge between your voluntary and involuntary systems.",
      },
      {
        t: "instruction",
        body: "When you're panicked, you breathe from your chest—quick, shallow breaths that signal danger. When safe, you breathe from your belly—slow, deep breaths that signal rest.",
      },
      {
        t: "instruction",
        body: "We're going to practice three evidence-based patterns. Each works differently: Physiological sighs reset CO2 levels. Box breathing balances your system. 4-7-8 activates deep parasympathetic response.",
      },
      {
        t: "instruction",
        body: "First, notice your current breathing. Don't change it yet. Is it shallow or deep? Fast or slow? Smooth or jagged? Place one hand on your chest, one on your belly.",
      },
      {
        t: "timer",
        seconds: 20,
        label: "Simply observe your natural breath pattern",
      },
      {
        t: "textInput",
        prompt: "Describe your current breathing in 2-3 words",
        placeholder: "e.g., 'shallow, quick, tight'",
      },
      {
        t: "instruction",
        body: "Now we'll try the physiological sigh—discovered by neuroscientists as the fastest way to calm your system. It's two inhales through the nose, followed by a long exhale through the mouth.",
      },
      {
        t: "instruction",
        body: "The double inhale reopens collapsed air sacs in your lungs. The long exhale activates your vagus nerve. This isn't relaxation—it's active nervous system regulation.",
      },
      { t: "breath", pattern: "physiological", rounds: 3 },
      {
        t: "timer",
        seconds: 15,
        label: "Notice any shifts in your body",
      },
      {
        t: "instruction",
        body: "Now let's try box breathing—used by Navy SEALs for rapid stabilization. Equal counts create balance: inhale 4, hold 4, exhale 4, hold 4.",
      },
      { t: "breath", pattern: "box", rounds: 4 },
      {
        t: "instruction",
        body: "Finally, 4-7-8 breathing. This pattern floods your system with oxygen while the extended exhale deeply activates parasympathetic response. Some people feel lightheaded—that's normal.",
      },
      { t: "breath", pattern: "4-7-8", rounds: 3 },
      {
        t: "textInput",
        prompt: "Which pattern felt most regulating for your body?",
        placeholder: "Physiological sigh, box, or 4-7-8",
      },
      {
        t: "instruction",
        body: "Your chosen pattern becomes your anchor. Use it when: contact urges spike, panic rises, before difficult conversations, or when you can't sleep.",
      },
      {
        t: "instruction",
        body: "Important: This isn't about feeling calm. It's about giving your nervous system a different input. You might still feel anxious—but with more space around it.",
      },
      {
        t: "check",
        prompt: "I'll practice my chosen breathing pattern 3 times today",
      },
      {
        t: "instruction",
        body: "Each time you practice, you're strengthening vagal tone—your nervous system's resilience. Think of it like building a muscle. Consistent practice creates lasting change.",
      },
    ],
    commitment: { text: "Finish" },
  },
  d11_soothe_kit: {
    id: "d11_soothe_kit",
    moduleId: "stabilize",
    title: "Self-Soothe Kit",
    goal: "Build secure self-soothing options",
    format: "builder",
    sections: [
      {
        title:
          "Understanding self-soothing:\n\nWhen you're activated, your nervous system is stuck in threat mode. Self-soothing uses sensory input to signal safety. Each sense can ground you in the present moment and help regulate your system",
        items: [{ label: "I understand how self-soothing works", kind: "check" }],
      },
      {
        title:
          "1. Sight: visual anchors that calm you.\n\nWhat do you see that brings comfort? Photos, nature, art, colors, textures, or specific objects",
        items: [
          { label: "Visual anchor 1", kind: "shortText", inputId: "sight_1" },
          { label: "Visual anchor 2", kind: "shortText", inputId: "sight_2" },
          { label: "Visual anchor 3", kind: "shortText", inputId: "sight_3" },
        ],
        minRequired: 2,
      },
      {
        title:
          "2. Sound: auditory tools for regulation.\n\nSounds can shift your nervous system state. Music, nature sounds, white noise, guided meditations, or even silence",
        items: [
          { label: "Soothing sound 1", kind: "shortText", inputId: "sound_1" },
          { label: "Soothing sound 2", kind: "shortText", inputId: "sound_2" },
          { label: "Soothing sound 3", kind: "shortText", inputId: "sound_3" },
        ],
        minRequired: 2,
      },
      {
        title:
          "3. Touch: physical comfort and grounding.\n\nTexture, temperature, pressure, and movement can regulate your system. Weighted blankets, soft fabrics, warm baths, holding objects, or gentle movement",
        items: [
          { label: "Touch tool 1", kind: "shortText", inputId: "touch_1" },
          { label: "Touch tool 2", kind: "shortText", inputId: "touch_2" },
          { label: "Touch tool 3", kind: "shortText", inputId: "touch_3" },
        ],
        minRequired: 2,
      },
      {
        title:
          "4. Smell: scent as a regulation tool.\n\nScents directly access your limbic system. Essential oils, candles, fresh air, coffee, familiar scents, or comforting aromas",
        items: [
          { label: "Soothing scent 1", kind: "shortText", inputId: "smell_1" },
          { label: "Soothing scent 2", kind: "shortText", inputId: "smell_2" },
        ],
        minRequired: 1,
      },
      {
        title:
          "5. Taste: comforting flavors.\n\nTaste can anchor you in the present. Warm tea, comforting foods, mints, or flavors that bring calm",
        items: [
          { label: "Comforting taste 1", kind: "shortText", inputId: "taste_1" },
          { label: "Comforting taste 2", kind: "shortText", inputId: "taste_2" },
        ],
        minRequired: 1,
      },
      {
        title:
          "6. Breath: your built-in regulation tool.\n\nYour breath is always available. Which breathing pattern works best for you?",
        items: [
          { label: "Physiological sigh (2 inhales, 1 long exhale)", kind: "check" },
          { label: "Box breathing (4-4-4-4)", kind: "check" },
          { label: "4-7-8 breathing", kind: "check" },
          { label: "Other breathing pattern", kind: "shortText", inputId: "breath_other" },
        ],
        minRequired: 1,
      },
      {
        title:
          "Make it accessible: Where will you keep reminders? (Your tools are only useful if you remember them. Where can you place reminders?)",
        items: [
          { label: "Phone note/reminder", kind: "check" },
          { label: "Physical reminder at home", kind: "check" },
          { label: "Set a daily check-in", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
}
