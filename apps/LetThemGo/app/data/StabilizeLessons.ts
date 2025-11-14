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
    estMinutes: 4,
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
    commitment: { text: "Add 3 contacts", duration: "today" },
    checkIn: { mood: true, urge: true },
    gating: { minHoursBeforeNext: 12 },
  },
  d1_ground_name5: {
    id: "d1_ground_name5",
    moduleId: "stabilize",
    title: "Name 5 Things",
    goal: "Interrupt spirals with sensory grounding",
    estMinutes: 15,
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
    commitment: { text: "Use 5-4-3-2-1" },
  },
  d1_sleep_triage: {
    id: "d1_sleep_triage",
    moduleId: "stabilize",
    title: "Sleep Triage Tonight",
    goal: "Set up a same-day sleep rescue",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Environment: Signal safety to your nervous system (Your body needs darkness to produce melatonin—blue light from phones suppresses this)",
        items: [
          { label: "Dim lights 2h before bed", kind: "check" },
          { label: "Phone charges outside bedroom", kind: "check" },
        ],
        minRequired: 1,
      },
      {
        title:
          "Routine: Create predictability (The goal isn't perfect sleep—it's slightly better sleep. Even 20% improvement helps your nervous system reset)",
        items: [
          { label: "Set target lights-out", kind: "datetime" },
          {
            label: "Choose a wind-down activity",
            kind: "picker",
            options: ["read", "shower", "stretch", "audio"],
          },
        ],
      },
    ],
    commitment: { text: "Lights out" },
  },
  d2_panic_edu: {
    id: "d2_panic_edu",
    moduleId: "stabilize",
    title: "Why Your Brain Is Loud",
    goal: "Normalize breakup panic and reduce fear of feelings",
    estMinutes: 15,
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
    commitment: { text: "Label alarm 3×", duration: "today" },
    checkIn: { mood: true, urge: true },
  },
  d2_crisis_plan: {
    id: "d2_crisis_plan",
    moduleId: "stabilize",
    title: "Personal SOS Plan",
    goal: "Create a written stepwise crisis plan",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Contacts: People who can anchor you (Research shows that social support is one of the strongest predictors of recovery. Have these ready before crisis hits)",
        items: [
          { label: "Add primary support", kind: "contact", source: "phonebook" },
          { label: "Add backup support", kind: "contact", source: "phonebook" },
        ],
        minRequired: 1,
      },
      {
        title:
          "First Aid: Immediate regulation tools (These activate your parasympathetic nervous system—your body's brake pedal. Use them when panic feels overwhelming)",
        items: [
          { label: "3-minute breath reset", kind: "check" },
          { label: "Step outside / cold water", kind: "check" },
        ],
      },
    ],
    commitment: { text: "Pin SOS" },
  },
  d3_contact_risk_scan: {
    id: "d3_contact_risk_scan",
    moduleId: "stabilize",
    title: "Contact Risk Scan",
    goal: "Identify top relapse triggers",
    estMinutes: 12,
    format: "journal",
    fields: [
      {
        name: "understanding",
        kind: "longText",
        label:
          "First, let's understand why contact feels so urgent. Your brain treats your ex like a drug—literally. What specific feeling does contact promise to fix? (loneliness, anxiety, emptiness, fear?)",
        minWords: 15,
      },
      {
        name: "physical_cues",
        kind: "longText",
        label:
          "What physical sensations arise right before you want to reach out? (chest tightness, stomach drop, skin crawling, restlessness?)",
        minWords: 10,
      },
      {
        name: "triggers",
        kind: "longText",
        label:
          "What are your top 3 contact triggers? Be specific: certain times (late night, Sunday mornings)? Places (your apartment, their neighborhood)? States (after drinking, when lonely)?",
        minWords: 20,
      },
      {
        name: "routes",
        kind: "longText",
        label:
          "How do you typically initiate contact? List all routes: direct text, Instagram story views, 'accidental' calls, mutual friends, checking their Spotify?",
        minWords: 15,
      },
      {
        name: "justifications",
        kind: "longText",
        label:
          "What stories does your brain tell to justify contact? ('Just to check they're okay,' 'For closure,' 'To return their things,' 'They might have changed')",
        minWords: 15,
      },
      {
        name: "aftermath",
        kind: "longText",
        label:
          "What typically happens AFTER you make contact? How do you feel 2 hours later? 24 hours later? (Be honest about the crash)",
        minWords: 20,
      },
      {
        name: "risk",
        kind: "slider",
        label: "Current contact urge intensity (0 = no urge, 10 = overwhelming)",
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
    commitment: { text: "Remove 3 cues" },
  },
  d3_meal_anchor: {
    id: "d3_meal_anchor",
    moduleId: "stabilize",
    title: "Fuel the System",
    goal: "Stabilize appetite/energy",
    estMinutes: 3,
    format: "builder",
    sections: [
      {
        title:
          "Today's anchors: Protein + carb combos stabilize blood sugar (When your blood sugar crashes, your nervous system interprets it as more stress. Regular meals prevent this cascade)",
        items: [
          { label: "Breakfast protein+carb", kind: "check" },
          { label: "Lunch protein+carb", kind: "check" },
          { label: "Dinner protein+carb", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Eat 3 anchors", duration: "today" },
  },
  d3_support_ping: {
    id: "d3_support_ping",
    moduleId: "stabilize",
    title: "Text a Safe Person",
    goal: "Activate support, not the ex",
    estMinutes: 4,
    format: "journal",
    fields: [
      {
        name: "recipient",
        kind: "shortText",
        label:
          "Who will you text? (Choose someone safe—not the ex, not someone who will minimize your pain)",
      },
      {
        name: "message",
        kind: "longText",
        label:
          "Draft your message (Keep it simple: 'Having a hard day. Could use some support.' You can use this verbatim)",
      },
    ],
    commitment: { text: "Send text" },
  },
  stabilize_breath_anchor: {
    id: "stabilize_breath_anchor",
    moduleId: "stabilize",
    title: "Breath Anchor Practice",
    goal: "Create a reliable calming anchor",
    estMinutes: 18,
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
        seconds: 45,
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
        seconds: 30,
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
    commitment: { text: "Use anchor 3×" },
  },
  d11_soothe_kit: {
    id: "d11_soothe_kit",
    moduleId: "stabilize",
    title: "Self-Soothe Kit",
    goal: "Build secure self-soothing options",
    estMinutes: 3,
    format: "builder",
    sections: [
      {
        title:
          "Kit Items: Tools for regulation (Self-soothing uses your five senses to signal safety. When you're activated, sensory input can help ground you in the present moment)",
        items: [
          { label: "Breath tool", kind: "check" },
          { label: "Soothing scent", kind: "check" },
          { label: "Comfort object", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Place kit items" },
  },
}
