import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * No Contact module lessons
 */
export const NO_CONTACT_LESSONS: Record<string, ILessonConfig> = {
  d13_nc_principles: {
    id: "d13_nc_principles",
    moduleId: "no_contact",
    title: "Why No Contact Works",
    goal: "Understand the science and psychology of NC",
    estMinutes: 16,
    format: "card",
    cards: [
      // HOOK: Why this matters
      {
        type: "text",
        body: "No contact isn't punishment. It's not about 'winning' the breakup or making them miss you. It's a clinical intervention based on neuroscience and attachment theory.",
      },
      {
        type: "text",
        body: "Understanding WHY it works makes it easier to follow. Let's break down the science.",
      },

      // NEUROSCIENCE: Dopamine
      {
        type: "text",
        body: "THE DOPAMINE TRAP\n\nEvery time you contact them—or even think about contacting them—your brain releases dopamine. This is the 'wanting' chemical, the same one involved in addiction.",
      },
      {
        type: "text",
        body: "When they respond, you get a dopamine spike. When they don't, you get a crash. This creates what's called 'intermittent reinforcement'—the most powerful form of behavioral conditioning.",
      },
      {
        type: "tip",
        body: "Intermittent reinforcement is why slot machines are addictive. You never know when you'll 'win,' so you keep trying. Contact with an ex works the same way.",
      },
      {
        type: "text",
        body: "Every contact resets this cycle. You're re-hooking yourself into the dopamine loop. No contact breaks the cycle, allowing your brain chemistry to rebalance.",
      },

      // NEUROSCIENCE: Neural pathways
      {
        type: "text",
        body: "THE NEURAL PATHWAY PROBLEM\n\nYour brain has built strong neural pathways connecting 'problem' → 'contact them.' These pathways were formed through repetition during your relationship.",
      },
      {
        type: "text",
        body: "Feeling lonely? The pathway says: text them. Feeling anxious? The pathway says: check their social media. Feeling happy? The pathway says: share it with them.",
      },
      {
        type: "tip",
        body: "Neural pathways are like trails through a forest. The more you walk them, the more defined they become. The less you walk them, the more they fade.",
      },
      {
        type: "text",
        body: "No contact allows these pathways to weaken. New pathways form: Feeling lonely → call a friend. Feeling anxious → use grounding techniques. You're literally rewiring your brain.",
      },

      // ATTACHMENT: Deactivation
      {
        type: "text",
        body: "THE ATTACHMENT SYSTEM\n\nYour attachment system is activated right now. This is an ancient survival mechanism that treats separation from an attachment figure as danger.",
      },
      {
        type: "text",
        body: "When activated, your nervous system floods with stress hormones. You feel panic, obsessive thinking, and intense urges to reunite. This isn't weakness—it's biology.",
      },
      {
        type: "tip",
        body: "Contact keeps the attachment system activated. Even 'closure' conversations or 'being friends' prevent your nervous system from deactivating and beginning to heal.",
      },
      {
        type: "text",
        body: "No contact allows the attachment system to gradually deactivate. This typically takes 60-90 days of ZERO contact. Yes, zero. Partial contact keeps the system revved.",
      },

      // PSYCHOLOGY: Idealization
      {
        type: "text",
        body: "THE IDEALIZATION EFFECT\n\nYour brain has a negativity bias for your current situation and a positivity bias for the past. You're remembering the highlights, not the full reality.",
      },
      {
        type: "text",
        body: "Contact feeds idealization. Every interaction gives you new material to analyze, new hope to cling to. You stay in fantasy rather than processing reality.",
      },
      {
        type: "tip",
        body: "Distance provides perspective. Without new data, your brain eventually starts processing the full picture—including why the relationship actually ended.",
      },

      // PRACTICAL: What happens with contact
      {
        type: "text",
        body: "WHAT HAPPENS WHEN YOU BREAK NC\n\nEven one text resets significant progress:\n\n• Dopamine cycle restarts\n• Neural pathways strengthen\n• Attachment system reactivates\n• Healing timeline extends\n• Self-trust erodes",
      },
      {
        type: "text",
        body: "This isn't judgment—it's information. If you break NC, you're not 'back to zero,' but you are back to 'rewiring interrupted.' The faster you return to NC, the less setback you experience.",
      },

      // SPECIAL CASES
      {
        type: "text",
        body: "WHAT ABOUT CLOSURE?\n\nClosure comes from within, not from them. What you want from a closure conversation—understanding, validation, an apology—they usually can't give you.",
      },
      {
        type: "tip",
        body: "Most 'closure' conversations leave you feeling worse. They provide new information to ruminate on rather than the peace you're seeking.",
      },
      {
        type: "text",
        body: "Real closure happens when you accept that you may never fully understand their choices, and that's okay. You can still move forward.",
      },

      // MODIFIED NC
      {
        type: "text",
        body: "WHEN NC ISN'T POSSIBLE\n\nCo-parenting, work relationships, or shared leases may require contact. In these cases, use 'modified no contact':\n\n• Communication only about logistics\n• Keep it brief, factual, boring\n• No emotional topics\n• Set boundaries on method/timing",
      },
      {
        type: "tip",
        body: "Think of it as 'gray rock'—you're neutral and uninteresting. You're not cutting them out of your life, but you're removing the emotional charge from interactions.",
      },

      // TIMELINE
      {
        type: "text",
        body: "HOW LONG?\n\nMost experts recommend 60-90 days minimum for attachment system deactivation. But healing isn't linear—it depends on relationship length, attachment style, and whether you're doing active healing work.",
      },
      {
        type: "text",
        body: "The real question isn't 'how long?' but 'what will tell me I'm ready?' Signs:\n• Thinking about them doesn't disrupt your day\n• You can see the relationship realistically\n• You're not hoping for reconciliation\n• Contact wouldn't be driven by attachment",
      },
      {
        type: "tip",
        body: "If you're using NC to manipulate them into coming back, it won't work—and it will hurt more. NC is for YOUR healing, not relationship strategy.",
      },

      // INTEGRATION
      {
        type: "text",
        body: "No contact is an act of self-respect. You're prioritizing your healing over temporary comfort. You're choosing your future self over your current pain.",
      },
      {
        type: "text",
        body: "It will be hard. Some days will feel impossible. But every day of NC is progress, even if it doesn't feel like it. Your brain is healing, your nervous system is resetting, and your sense of self is returning.",
      },
    ],
    commitment: {
      text: "Finish",
    },
  },
  d13_block_filters: {
    id: "d13_block_filters",
    moduleId: "no_contact",
    title: "Block & Filter Walkthrough",
    goal: "Close top contact routes",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Phone: Remove easy access (Every time you see their number or name, it triggers your attachment system. Blocking removes this automatic activation)\n\nTo block: Open Contacts → Find their name → Scroll down → 'Block this Caller' → Confirm\nTo silence unknown: Settings → Phone → 'Silence Unknown Callers'",
        items: [
          {
            label: "Blocked their number",
            kind: "check",
          },
          {
            label: "Silenced unknown callers",
            kind: "check",
          },
        ],
        minRequired: 1,
      },
      {
        title:
          "Social: Reduce digital triggers (Social media is designed to keep you checking. Muting/unfollowing removes them from your feed without the drama of blocking publicly)",
        items: [
          { label: "Mute stories 30d", kind: "check" },
          { label: "Unfollow or restrict", kind: "check" },
        ],
      },
    ],
  },
  d14_message_unsent: {
    id: "d14_message_unsent",
    moduleId: "no_contact",
    title: "Message I Won't Send",
    goal: "Process unsent communications",
    estMinutes: 6,
    format: "journal",
    template: "unsent_letter",
    fields: [
      {
        name: "opener",
        kind: "longText",
        label:
          "If I could say anything… (Write what you want to tell them. Don't censor—this is for you, not them. Get it all out)",
      },
      {
        name: "truth",
        kind: "longText",
        label:
          "What's true for me (What are the real feelings underneath? What do you need to acknowledge for yourself?)",
      },
      {
        name: "closure",
        kind: "longText",
        label:
          "What I'm choosing next (How will you move forward? What are you committing to? This is where you take your power back)",
      },
    ],
    commitment: { text: "Finish" },
  },
  d15_trigger_map: {
    id: "d15_trigger_map",
    moduleId: "no_contact",
    title: "Trigger Map",
    goal: "Know when/why urges spike",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "map",
        kind: "longText",
        label:
          "Times/places/people that spike urges (Be specific: What time of day? Which locations? Which people or situations? Patterns help you prepare)",
      },
      {
        name: "move",
        kind: "shortText",
        label:
          "One change to move a trigger out of sight (What's one concrete thing you can change? Examples: Change your route, delete an app, avoid a certain time/place)",
      },
    ],
    commitment: { text: "Finish" },
  },
  d15_relapse_plan: {
    id: "d15_relapse_plan",
    moduleId: "no_contact",
    title: "If I Slip…",
    goal: "Pre-commit non-shame reset steps",
    estMinutes: 18,
    format: "practice",
    steps: [
      // HOOK: Why this matters
      {
        t: "instruction",
        body: "If you break no contact, shame will try to take over. But here's what's actually true: having a plan ready removes decision-making when you're activated—which is when you're most vulnerable to shame spirals.",
      },
      {
        t: "instruction",
        body: "This isn't about perfection. It's about harm reduction. One slip doesn't erase your progress—but how you respond to it determines how much it sets you back.",
      },

      // FOUNDATION: The science of breaking NC
      {
        t: "instruction",
        body: "If you break no contact, here's what's happening in your brain and body:",
      },
      {
        t: "instruction",
        body: "Dopamine cycle reactivates: Your brain releases dopamine when you contact them, creating the same addictive pattern you're trying to break. This isn't weakness—it's neurochemistry.",
      },
      {
        t: "instruction",
        body: "Neural pathways strengthen: Every contact reinforces the 'problem → contact them' pathway. Your brain literally strengthens these connections, making future urges stronger.",
      },
      {
        t: "instruction",
        body: "Attachment system reactivates: Your nervous system treats separation as danger. Contact keeps this survival system activated, preventing the 60-90 day deactivation process from completing.",
      },
      {
        t: "instruction",
        body: "Shame compounds the damage: Research shows shame activates the same brain regions as physical pain. Shaming yourself after breaking NC creates a double wound—the contact itself AND the self-criticism.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Take this in—this is information, not judgment",
      },

      // PERSONAL CONNECTION: Recognizing warning signs
      {
        t: "instruction",
        body: "Urges don't appear out of nowhere. They build. Learning to recognize your early warning signs gives you time to intervene before you're fully activated.",
      },
      {
        t: "instruction",
        body: "Common patterns include: emotional triggers (loneliness, anxiety, anger, even happiness), physical sensations (restlessness, tightness in chest, racing heart), cognitive patterns ('just one text won't hurt'), and time-based patterns (certain times of day, anniversaries).",
      },
      {
        t: "textInput",
        prompt: "What are your physical warning signs when an urge is building?",
        placeholder: "e.g., 'restlessness, tight chest, racing thoughts'",
      },
      {
        t: "textInput",
        prompt: "What times or situations make urges spike for you?",
        placeholder: "e.g., 'lonely at night, first thing in morning, weekends'",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Notice: awareness of your patterns is already progress",
      },

      // IMMEDIATE PROTOCOL: The first 15 minutes
      {
        t: "instruction",
        body: "If you break NC, the first 15 minutes are critical. This is when shame wants to take over. Having a pre-committed protocol removes decision-making when your prefrontal cortex (rational brain) is offline.",
      },
      {
        t: "instruction",
        body: "Why this works: Your activated nervous system can't make good decisions. Pre-planning bypasses this. Shame thrives in isolation—reaching out immediately breaks the shame cycle. Regulation before reflection—you need to calm your nervous system before you can process what happened.",
      },
      {
        t: "instruction",
        body: "Step 1: Regulate your nervous system. Choose one technique that works for you when you're activated.",
      },
      {
        t: "check",
        prompt: "I will use 4-7-8 breathing (4 rounds) to regulate",
      },
      {
        t: "check",
        prompt: "I will use box breathing (5 minutes) to regulate",
      },
      {
        t: "check",
        prompt: "I will use physiological sigh (3 rounds) to regulate",
      },
      {
        t: "check",
        prompt: "I will use cold water on face/wrists to regulate",
      },
      {
        t: "instruction",
        body: "Step 2: Reach out to support immediately. Don't isolate. Shame wants you alone—connection breaks the cycle.",
      },
      {
        t: "textInput",
        prompt: "Who is your primary support person? (Name or relationship)",
        placeholder: "e.g., 'Sarah, my best friend' or 'My therapist'",
      },
      {
        t: "instruction",
        body: "Step 3: Self-compassion statement. Write what you'll tell yourself after a slip—something that acknowledges the struggle without shame.",
      },
      {
        t: "textInput",
        prompt: "My self-compassion statement after a slip:",
        placeholder: "e.g., 'This is hard, and I'm human. I'll return to NC now.'",
      },
      {
        t: "instruction",
        body: "Step 4: Re-commit to NC. This is a reset, not a failure. The faster you return to NC, the less setback you experience.",
      },
      {
        t: "check",
        prompt: "I commit to returning to NC immediately after any slip",
      },

      // 24-HOUR RECOVERY WINDOW
      {
        t: "instruction",
        body: "After the immediate reset, the next 24 hours matter. This is when your brain wants to ruminate, analyze, and shame-spiral. Having a plan prevents this.",
      },
      {
        t: "instruction",
        body: "What NOT to do: Don't analyze their response (or lack of response) endlessly. Don't check their social media to see if they saw your message. Don't plan what you'll say next. Don't shame yourself for 'being weak.'",
      },
      {
        t: "instruction",
        body: "What TO do: Acknowledge what happened without judgment. Understand the trigger that led to it. Learn what you needed in that moment (connection? validation? distraction?). Identify alternative ways to meet that need next time.",
      },
      {
        t: "textInput",
        prompt: "If I break NC, I will NOT:",
        placeholder: "e.g., 'check social media, reread messages, shame myself'",
      },
      {
        t: "textInput",
        prompt: "Instead, I will:",
        placeholder: "e.g., 'journal about triggers, call support person, do grounding exercise'",
      },
      {
        t: "textInput",
        prompt: "What I needed in that moment (that I can meet differently next time):",
        placeholder: "e.g., 'connection, validation, distraction from pain'",
      },

      // SUPPORT SYSTEM
      {
        t: "instruction",
        body: "When you break NC, shame wants you to isolate. Having support people pre-identified removes the barrier of 'who do I call?' when you're activated.",
      },
      {
        t: "instruction",
        body: "Research shows that social support is one of the strongest predictors of recovery success. You don't have to do this alone.",
      },
      {
        t: "instruction",
        body: "Your support person should be: someone who won't shame you, someone who understands this is hard, someone available when you need them, someone who can help you regulate, not just vent.",
      },
      {
        t: "textInput",
        prompt: "Backup support person (if primary isn't available):",
        placeholder: "e.g., 'My sister' or 'Crisis text line: 741741'",
      },
      {
        t: "check",
        prompt: "I will communicate my NC plan to my support person so they know how to help",
      },

      // REFRAMING: Neuroplasticity and progress
      {
        t: "instruction",
        body: "Here's what's actually true about breaking NC:",
      },
      {
        t: "instruction",
        body: "Your brain is still rewiring. One contact doesn't erase weeks of progress—it interrupts it, but the new pathways you've been building are still there.",
      },
      {
        t: "instruction",
        body: "Slips are data, not failure. They show you where you're vulnerable, what triggers you, and what needs aren't being met. This is valuable information.",
      },
      {
        t: "instruction",
        body: "Recovery isn't linear. Research on addiction recovery shows that slips are part of the process for most people. What matters is how quickly you return to the practice.",
      },
      {
        t: "instruction",
        body: "Self-compassion accelerates healing. Studies show that self-compassion after a setback leads to faster recovery than self-criticism. Shame keeps you stuck; compassion helps you move forward.",
      },
      {
        t: "instruction",
        body: "Every attempt builds resilience. Each time you choose NC again after a slip, you're strengthening your ability to choose differently. This is neuroplasticity in action.",
      },
      {
        t: "timer",
        seconds: 45,
        label: "Let this settle: you're not broken, you're human",
      },
      {
        t: "textInput",
        prompt: "One thing I'm learning about myself through this process:",
        placeholder: "e.g., 'I need connection when I'm lonely, and I can find it elsewhere'",
      },

      // FINAL COMMITMENT
      {
        t: "instruction",
        body: "After a slip, the most important thing is how quickly you return to no contact. Research shows that the 'return time'—how long it takes you to recommit—is more predictive of long-term success than the slip itself.",
      },
      {
        t: "instruction",
        body: "This isn't about being perfect. It's about the practice of returning. Every return to NC is progress. Every day of NC after a slip is healing. Your brain is changing, even when it doesn't feel like it.",
      },
      {
        t: "check",
        prompt: "I commit to using my reset protocol without shame",
      },
      {
        t: "check",
        prompt: "I commit to reaching out for support, not isolating",
      },
      {
        t: "instruction",
        body: "You have a plan. You understand what happens. You know how to respond. This is harm reduction, not perfection. You've got this.",
      },
    ],
    commitment: { text: "Finish" },
  },
  nc_urge_plan: {
    id: "nc_urge_plan",
    moduleId: "no_contact",
    title: "Urge Response Plan",
    goal: "Create a plan for when urges hit",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "When urge hits: Pre-planned response (Urges peak in 60-90 seconds. Having a plan ready removes decision-making when you're activated. This creates space between urge and action)",
        items: [
          { label: "Wait 90 seconds", kind: "check" },
          { label: "Text support person", kind: "check" },
          { label: "Do grounding exercise", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  nc_digital_cleanup: {
    id: "nc_digital_cleanup",
    moduleId: "no_contact",
    title: "Digital Cleanup",
    goal: "Remove digital reminders",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Actions: Remove digital triggers (Every photo, message, or social media post is a potential trigger. Removing these reduces automatic activation of your attachment system. You don't need to delete forever—archiving works too)",
        items: [
          { label: "Delete old photos", kind: "check" },
          { label: "Archive messages", kind: "check" },
          { label: "Remove from social media", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  nc_physical_cleanup: {
    id: "nc_physical_cleanup",
    moduleId: "no_contact",
    title: "Physical Space Cleanup",
    goal: "Remove physical reminders",
    estMinutes: 4,
    format: "builder",
    sections: [
      {
        title:
          "Items to remove: Clear your environment (Physical objects trigger memories and activate your attachment system. You don't need to throw everything away—boxing works. The goal is removing daily triggers)",
        items: [
          { label: "Gifts and mementos", kind: "check" },
          { label: "Clothing or items", kind: "check" },
          { label: "Photos and cards", kind: "check" },
        ],
        minRequired: 1,
      },
    ],
    commitment: { text: "Finish" },
  },
  nc_boundary_communication: {
    id: "nc_boundary_communication",
    moduleId: "no_contact",
    title: "Boundary Communication",
    goal: "Learn to communicate boundaries clearly",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "boundary",
        kind: "longText",
        label:
          "What boundary do you need to set? (Be specific: What behavior needs to stop? What do you need? Examples: 'I need you to stop texting me,' 'I'm not ready to be friends')",
      },
      {
        name: "message",
        kind: "longText",
        label:
          "How will you communicate it? (Keep it brief, clear, and firm. No explanations or justifications needed. Example: 'I need space to heal. Please don't contact me.' You don't owe them a long explanation)",
      },
    ],
    commitment: { text: "Finish" },
  },
}
