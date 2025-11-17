import { ILessonConfig } from "@/types/lessons/ILessonConfig"

/**
 * Special Cases module lessons
 */
export const SPECIAL_CASES_LESSONS: Record<string, ILessonConfig> = {
  spec_social_media: {
    id: "spec_social_media",
    moduleId: "special_cases",
    title: "Social Media Boundaries",
    goal: "Prevent doom-scroll/contact",
    estMinutes: 18,
    format: "practice",
    steps: [
      // FOUNDATION: The neuroscience of social media stalking
      {
        t: "instruction",
        body: "Every time you check their social media, your brain releases dopamine in anticipation—then crashes when you see them living their life without you. You're literally addicting yourself to your own heartbreak.",
      },
      {
        t: "instruction",
        body: "This isn't weakness—it's neurology. Social media companies spend billions engineering 'variable ratio reinforcement schedules'—the same mechanism that makes slot machines addictive. Sometimes you see nothing, sometimes you see them with someone new. The uncertainty keeps you hooked.",
      },
      {
        t: "instruction",
        body: "Research shows that checking an ex's social media extends breakup recovery by an average of 6 months. Every check reactivates your attachment system, flooding you with the same stress hormones as the initial breakup.",
      },

      // PERSONAL ASSESSMENT
      {
        t: "instruction",
        body: "Let's be honest about your current patterns. No judgment—awareness is the first step to change.",
      },
      {
        t: "textInput",
        prompt: "How many times did you check their profiles yesterday? (Be real)",
        placeholder: "e.g., '15+ times'",
      },
      {
        t: "textInput",
        prompt: "What triggers the checking? (time of day, feeling, thought?)",
        placeholder: "e.g., 'lonely at night, first thing in morning'",
      },

      // THE CYCLE EXPLAINED
      {
        t: "instruction",
        body: "Here's the cycle: Feel bad → Check their profile → Feel worse → Need to check again to 'fix' the bad feeling → Repeat. Each check strengthens the neural pathway. You're training your brain that the solution to missing them is... looking at them.",
      },
      {
        t: "instruction",
        body: "The cruelest part? Social media shows a curated version of their life. You're comparing your internal pain to their external highlight reel. They might be crying in their car after posting that happy photo.",
      },

      // SOMATIC AWARENESS
      {
        t: "instruction",
        body: "Think about the last time you checked their profile. What happened in your body? Racing heart? Sick stomach? Chest pain? That's your nervous system screaming: 'This is hurting us!'",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Recall the physical sensation",
      },

      // THE STRATEGIC APPROACH
      {
        t: "instruction",
        body: "We're going to create multiple barriers between you and their profile. Not because you're weak, but because your brain is doing exactly what it evolved to do—seek connection with your attachment figure. We need to outsmart it.",
      },

      // BARRIER 1: The immediate block
      {
        t: "instruction",
        body: "First barrier: Block or unfollow on EVERYTHING. Not just Instagram—LinkedIn, Spotify, Venmo, gaming platforms, fitness apps. If it has a social component, they need to be blocked. This isn't petty—it's protective.",
      },
      {
        t: "check",
        prompt: "I will block/unfollow on ALL platforms within 24 hours",
      },

      // BARRIER 2: Close the loopholes
      {
        t: "instruction",
        body: "Now the loopholes: Their friends, family, new partner (if applicable). You don't need to block them, but mute/unfollow. Also mute keywords like their name, workplace, favorite places. Create a digital world where they don't exist.",
      },
      {
        t: "textInput",
        prompt: "List 3-5 accounts or keywords you need to mute:",
        placeholder: "e.g., 'their sister, best friend, favorite restaurant'",
      },

      // BARRIER 3: Make it physically harder
      {
        t: "instruction",
        body: "Log out of all social media apps. Delete them from your phone if possible. If you must keep them, bury them in a folder labeled 'DON'T' on the last screen. Every extra tap is a chance for your prefrontal cortex to intervene.",
      },
      {
        t: "instruction",
        body: "For computer: Use website blockers (Cold Turkey, Freedom, BlockSite). Set them to block during your vulnerable times. Yes, you can override them, but that pause might be enough to stop you.",
      },

      // BARRIER 4: Accountability system
      {
        t: "instruction",
        body: "Tell someone about this. Give them permission to check in. Or use apps like Moment or Screen Time that track your usage. Shame thrives in secrecy—bring this pattern into the light.",
      },
      {
        t: "textInput",
        prompt: "Who will you tell about your social media boundaries?",
        placeholder: "e.g., 'best friend Sarah'",
      },

      // THE REPLACEMENT STRATEGY
      {
        t: "instruction",
        body: "Your brain needs something to do instead. When you feel the urge to check, you need a ready replacement that gives a small dopamine hit without the destruction.",
      },
      {
        t: "instruction",
        body: "Options that work:\n• Text a friend (connection without them)\n• Watch a saved funny video (dopamine without pain)\n• Do 20 jumping jacks (physical reset)\n• Play Wordle or similar (cognitive engagement)\n• Look at photos of puppies (oxytocin boost)",
      },
      {
        t: "textInput",
        prompt: "What's your go-to replacement activity?",
        placeholder: "e.g., 'text my group chat'",
      },

      // DEALING WITH INFORMATION DIETS
      {
        t: "instruction",
        body: "You might worry: 'What if I miss something important?' Here's the truth: If it's truly important, you'll hear about it. The cost of maybe missing news is nothing compared to the cost of daily retraumatization.",
      },
      {
        t: "instruction",
        body: "Tell your close friends: 'I've unfollowed my ex for my mental health. If there's something I truly need to know for safety or practical reasons, please tell me. Otherwise, I don't want updates.' Most people will respect this.",
      },

      // THE EXTINCTION BURST WARNING
      {
        t: "instruction",
        body: "Warning: When you first stop checking, the urge will get STRONGER for 3-7 days. This is called an extinction burst—your brain's last-ditch effort to get its fix. If you can survive this week, the urges will dramatically decrease.",
      },
      {
        t: "check",
        prompt: "I understand the urges will intensify before they improve",
      },

      // RELAPSE PLANNING
      {
        t: "instruction",
        body: "If you slip and check their profile, don't spiral. It's data, not failure. Ask: What triggered it? What feeling was I trying to fix? How did it actually make me feel? Each slip can teach you about your patterns.",
      },

      // THE LONG GAME
      {
        t: "instruction",
        body: "In 30 days of no checking, your brain will start to rewire. In 60 days, the automatic urge will fade. In 90 days, you might go whole days without thinking about their profile. This is neuroplasticity in action.",
      },
      {
        t: "instruction",
        body: "You're not just avoiding pain—you're reclaiming your attention, your time, your emotional energy. Every day you don't check, you're choosing your healing over your habit.",
      },

      // COMMITMENT
      {
        t: "check",
        prompt: "I commit to 30 days of no checking, with accountability",
      },
    ],
    haptics: true,
    commitment: {
      text: "Finish",
      duration: "week",
    },
  },
  spec_milestones: {
    id: "spec_milestones",
    moduleId: "special_cases",
    title: "Anniversary/Trigger Calendar",
    goal: "Pre-plan hard dates",
    estMinutes: 16,
    format: "practice",
    steps: [
      // FOUNDATION: Why dates hit so hard
      {
        t: "instruction",
        body: "Your brain has a temporal map of your relationship. It knows your anniversary, their birthday, the day you met—even if you're not consciously tracking. These dates will ambush you with grief if you don't prepare.",
      },
      {
        t: "instruction",
        body: "This is called 'anniversary reactions' in psychology. Your hippocampus (memory center) and amygdala (emotion center) encode significant dates with emotional markers. As dates approach, your body starts responding before your conscious mind catches up.",
      },
      {
        t: "instruction",
        body: "Research on grief shows that anticipating difficult dates and planning for them reduces their impact by 40-60%. You're not giving the dates power—you're taking power back by preparing.",
      },

      // IDENTIFY THE MINEFIELD
      {
        t: "instruction",
        body: "Let's map your emotional minefield. We'll identify dates that might trigger you, then create specific plans for each. This isn't catastrophizing—it's strategic emotional preparation.",
      },

      // CATEGORY 1: The obvious ones
      {
        t: "instruction",
        body: "First, the obvious triggers. What are the big dates? Anniversary of relationship, first date, breakup date, their birthday, Valentine's Day while you were together?",
      },
      {
        t: "textInput",
        prompt: "List 3-5 major trigger dates:",
        placeholder: "e.g., 'June 15 - anniversary, Dec 3 - their birthday'",
      },

      // CATEGORY 2: The sneaky ones
      {
        t: "instruction",
        body: "Now the sneaky triggers—dates that seem innocent but carry emotional weight. The concert you had tickets for. The trip you were planning. The holiday you spent with their family. The 'would have been' dates.",
      },
      {
        t: "textInput",
        prompt: "What less obvious dates might trigger you?",
        placeholder: "e.g., 'May 20 - concert we were going to'",
      },

      // CATEGORY 3: Seasonal/cyclical
      {
        t: "instruction",
        body: "Consider seasonal triggers too. 'This time last year we were...' Summer if you vacationed together. December if you spent holidays together. Spring if that's when you fell in love. Your body remembers seasons.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Identify your seasonal triggers",
      },

      // THE PRE-ANNIVERSARY ACTIVATION
      {
        t: "instruction",
        body: "Here's what most people don't know: Anniversary reactions usually start 1-2 weeks BEFORE the actual date. You might feel increasingly anxious, sad, or irritable without knowing why. Your body is preparing for the emotional impact.",
      },
      {
        t: "instruction",
        body: "This means your planning needs to include the run-up, not just the day itself. We'll create a 'buffer zone' around each major date.",
      },

      // STRATEGY 1: The week before protocol
      {
        t: "instruction",
        body: "For major trigger dates, here's your week-before protocol:\n\n1. Mark calendar 7 days before: 'Trigger week starting'\n2. Increase self-care (extra sleep, good food, movement)\n3. Limit stressors (don't schedule hard things)\n4. Tell support system the date is approaching\n5. Have therapy or friend check-in scheduled",
      },
      {
        t: "check",
        prompt: "I'll implement week-before protocols for major dates",
      },

      // STRATEGY 2: Day-of planning
      {
        t: "instruction",
        body: "For the actual trigger date, you need a full day plan. Not a distraction—a ritual that honors your feelings while keeping you safe. Think: container for grief, not avoidance of grief.",
      },
      {
        t: "instruction",
        body: "Effective day-of plans include:\n\n• Morning: Gentle wake-up, favorite breakfast, journal about feelings\n• Midday: Planned activity (hike, museum, volunteering—something engaging)\n• Afternoon: Connection (friend visit, therapy, support group)\n• Evening: Comfort ritual (bath, favorite movie, early bed)\n• Emergency: On-call friend who knows today is hard",
      },

      // CREATE YOUR FIRST PLAN
      {
        t: "instruction",
        body: "Let's create a plan for your next trigger date. What's coming up first?",
      },
      {
        t: "textInput",
        prompt: "Next trigger date and what it is:",
        placeholder: "e.g., 'March 3 - would've been 2 years'",
      },
      {
        t: "textInput",
        prompt: "Your day-of plan (3-4 specific activities):",
        placeholder:
          "e.g., 'Morning yoga, lunch with mom, paint in afternoon, movie with roommate'",
      },

      // THE RECLAIMING STRATEGY
      {
        t: "instruction",
        body: "Long-term, you want to reclaim these dates. This year might be about survival. Next year, you could create new associations. Their birthday becomes your annual 'celebrate my freedom' day. Your anniversary becomes your 'self-love ritual' day.",
      },
      {
        t: "instruction",
        body: "You're not erasing the past—you're layering new meaning on top. The dates will always carry some weight, but they don't have to knock you down.",
      },

      // HANDLING SURPRISE TRIGGERS
      {
        t: "instruction",
        body: "Some triggers you can't predict—a song, a smell, someone who looks like them. For surprise triggers, have a pocket plan:\n\n1. Name it: 'I'm triggered'\n2. Ground: 5 things I see, 4 I hear, 3 I touch\n3. Breathe: 3 physiological sighs\n4. Move: Change physical position/location\n5. Connect: Text someone 'Having a moment'",
      },
      {
        t: "check",
        prompt: "I'll practice the pocket plan for surprise triggers",
      },

      // THE CALENDAR SYSTEM
      {
        t: "instruction",
        body: "Put all of this in your actual calendar now. Set reminders for buffer weeks. Schedule the activities. Book the friend dates. Having it in your calendar makes it real and reduces decision fatigue when you're vulnerable.",
      },

      // NORMALIZE THE DIFFICULTY
      {
        t: "instruction",
        body: "These dates might be hard for years. That's not failure—it's love. The depth of your grief reflects the depth of your attachment. Be gentle with yourself. Healing isn't about not feeling; it's about feeling safely.",
      },

      // COMMITMENT
      {
        t: "check",
        prompt: "I've identified my trigger dates and will plan for at least 3",
      },
    ],
    haptics: true,
    commitment: {
      text: "Finish",
      duration: "week",
    },
  },
  spec_substance_risk: {
    id: "spec_substance_risk",
    moduleId: "special_cases",
    title: "Substance Risk Check",
    goal: "Safer coping choices",
    estMinutes: 6,
    format: "journal",
    fields: [
      {
        name: "risk_context",
        kind: "text",
        label:
          "Be honest: Are you using substances to numb feelings? After a breakup, it's common to reach for alcohol, drugs, or other substances to escape. But substances suppress your nervous system's ability to process grief, which means the feelings come back stronger later. Notice your patterns without judgment",
      },
      {
        name: "risk",
        kind: "slider",
        label: "Current risk level (0-10)",
        min: 0,
        max: 10,
      },
      {
        name: "alternatives",
        kind: "longText",
        label:
          "Sober soothers list (What can you do instead? Examples: cold water on face, breath work, call a friend, go for a walk, listen to music, journal, take a shower. These regulate your nervous system without suppressing it. Have 3-5 options ready)",
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_coworker_ex: {
    id: "spec_coworker_ex",
    moduleId: "special_cases",
    title: "If You Work Together",
    goal: "Professional & safe contact plan",
    estMinutes: 6,
    format: "builder",
    sections: [
      {
        title:
          "Rules: Create clear boundaries (Working with an ex is uniquely challenging. You can't go no-contact, but you can create strict boundaries. Every interaction can trigger your attachment system. These rules protect you while maintaining professionalism)",
        items: [
          { label: "Work-only channels", kind: "check" },
          { label: "No off-hours contact", kind: "check" },
          { label: "Escalation path", kind: "shortText" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_shared_custody: {
    id: "spec_shared_custody",
    moduleId: "special_cases",
    title: "Shared Custody Communication",
    goal: "Low-conflict co-parenting",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Communication rules: Protect your healing while co-parenting (Co-parenting requires contact, but you can structure it to minimize attachment activation. Using a parenting app creates a buffer—it's not personal, it's logistical. Sticking to child-related topics prevents emotional entanglement. Brief, factual communication protects both of you)",
        items: [
          { label: "Use parenting app", kind: "check" },
          { label: "Stick to child-related topics", kind: "check" },
          { label: "Keep it brief and factual", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_long_distance: {
    id: "spec_long_distance",
    moduleId: "special_cases",
    title: "Long-Distance Breakup",
    goal: "Navigate distance-specific challenges",
    estMinutes: 5,
    format: "journal",
    fields: [
      {
        name: "challenges",
        kind: "longText",
        label:
          "What are the distance-specific challenges? (Long-distance breakups have unique challenges: less closure, fewer shared physical spaces, digital-only contact, time zone differences making contact easier/harder. What specific challenges are you facing?)",
      },
      {
        name: "strategies",
        kind: "longText",
        label:
          "How will you handle them? (What boundaries will you set? Examples: Block on all platforms, delete shared digital spaces, create new routines that don't involve waiting for their messages, focus on local connections. What will work for your situation?)",
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_mutual_friends: {
    id: "spec_mutual_friends",
    moduleId: "special_cases",
    title: "Navigating Mutual Friends",
    goal: "Handle shared social circles",
    estMinutes: 15,
    format: "practice",
    steps: [
      // FOUNDATION: Why mutual friends complicate everything
      {
        t: "instruction",
        body: "Mutual friends are emotional landmines. They're living bridges to your ex—carrying information, triggering memories, forcing impossible choices. Your nervous system treats them as partial connections to your ex, keeping you activated.",
      },
      {
        t: "instruction",
        body: "Research shows that maintaining mutual friendships post-breakup extends healing time by 35% on average. Every mention of your ex, every group event you skip, every divided loyalty reopens the wound.",
      },
      {
        t: "instruction",
        body: "But here's the complexity: Some of these friendships matter to you independent of your ex. You shouldn't have to lose your entire social world. We need a strategy that protects your healing while preserving valuable connections.",
      },

      // CATEGORIZE YOUR FRIENDSHIPS
      {
        t: "instruction",
        body: "Not all mutual friends are equal. Let's categorize them so you can make strategic decisions about each relationship.",
      },
      {
        t: "instruction",
        body: "Category 1: 'Switzerland Friends'\nThese friends genuinely want to stay neutral. They won't pick sides, won't carry information, respect boundaries. They're safe but need clear guidelines.",
      },
      {
        t: "textInput",
        prompt: "Who are your Switzerland friends?",
        placeholder: "e.g., 'Mark, Lisa - genuinely neutral'",
      },

      {
        t: "instruction",
        body: "Category 2: 'Their Friends Who Became Yours'\nYou met them through your ex, but developed independent friendships. These are complicated—they might default to your ex's 'side' but still care about you.",
      },
      {
        t: "textInput",
        prompt: "Which friends fit this category?",
        placeholder: "e.g., 'ex's college friends I got close to'",
      },

      {
        t: "instruction",
        body: "Category 3: 'Information Highways'\nThese friends can't help but share information. They'll tell you about your ex, tell your ex about you. They mean well but they're dangerous to your healing.",
      },
      {
        t: "textInput",
        prompt: "Who are the information highways?",
        placeholder: "e.g., 'Jessica - loves gossip, can't keep boundaries'",
      },

      {
        t: "instruction",
        body: "Category 4: 'The Inner Circle'\nYour ride-or-die friends who happened to know your ex. These friendships predate or transcend the relationship. They're yours, period.",
      },
      {
        t: "textInput",
        prompt: "Who's in your inner circle?",
        placeholder: "e.g., 'Best friend Sam, college roommate Alex'",
      },

      // SETTING BOUNDARIES WITH EACH CATEGORY
      {
        t: "instruction",
        body: "Now we'll create specific boundaries for each category. These aren't ultimatums—they're requests that protect your healing while respecting the friendship.",
      },

      // SWITZERLAND FRIENDS PROTOCOL
      {
        t: "instruction",
        body: "For Switzerland Friends:\n\n'I value our friendship and want to maintain it. To help me heal, I need: 1) No updates about [ex's name] unless it's safety-related, 2) No carrying messages between us, 3) Separate hangouts for now—not group events with both of us.'",
      },
      {
        t: "check",
        prompt: "I'll set these boundaries with Switzerland friends",
      },

      // COMPLICATED FRIENDS PROTOCOL
      {
        t: "instruction",
        body: "For 'Their Friends Who Became Yours':\n\n'I understand you were [ex's] friend first. I care about our friendship but understand if you need space. If we continue hanging out, I need us to not discuss [ex] and I'll do the same. Can we try that?'",
      },

      // INFORMATION HIGHWAY PROTOCOL
      {
        t: "instruction",
        body: "For Information Highways:\n\nThese friends might need a temporary break. 'I need some space while I heal. It's not about you—I just need to focus on myself without updates about [ex]. Let's reconnect in a few months.'",
      },
      {
        t: "check",
        prompt: "I'll take breaks from information highway friends",
      },

      // INNER CIRCLE PROTOCOL
      {
        t: "instruction",
        body: "For Inner Circle:\n\n'You're my person and I need you through this. Please don't feel like you have to avoid mentioning [ex] entirely, but I need you on my team. No advocating for them, no pushing reconciliation, no updates unless I ask.'",
      },

      // THE INFORMATION DIET
      {
        t: "instruction",
        body: "Create an explicit information diet. Tell all mutual friends:\n\n'For my healing, I don't want updates about [ex] - not who they're dating, how they're doing, what they said about me, nothing. If there's something I NEED to know for safety or practical reasons, tell me. Otherwise, I'm on an information diet.'",
      },
      {
        t: "textInput",
        prompt: "Write your information diet statement:",
        placeholder: "e.g., 'No updates about ex unless safety-related'",
      },

      // GROUP EVENTS STRATEGY
      {
        t: "instruction",
        body: "Group events are the worst. Here's your strategy:\n\n1. You have the right to ask who's invited\n2. You can decline without explanation\n3. You can ask hosts for separate invites\n4. You can leave if they show up unexpectedly\n5. You can host your own alternate events",
      },
      {
        t: "instruction",
        body: "Script for hosts: 'I'd love to come, but I need to know if [ex] will be there. If so, I'll sit this one out but would love to see you separately.'",
      },

      // THE SOCIAL MEDIA MINEFIELD
      {
        t: "instruction",
        body: "Mutual friends on social media create constant triggers:\n• Mute friends who post pictures with your ex\n• Leave group chats that include your ex\n• Create an inner circle group chat without them\n• Unfollow (not unfriend) people who can't respect boundaries",
      },
      {
        t: "check",
        prompt: "I'll adjust social media to protect myself",
      },

      // HANDLING BOUNDARY VIOLATIONS
      {
        t: "instruction",
        body: "When someone violates your boundaries:\n\n1st violation: 'Remember, I asked not to hear about [ex].'\n2nd violation: 'I need you to respect my boundary about this.'\n3rd violation: 'I need a break from our friendship.'\n\nYou're not being difficult—you're protecting your healing.",
      },

      // THE FLYING MONKEY PHENOMENON
      {
        t: "instruction",
        body: "Watch for 'flying monkeys'—friends who carry messages from your ex or advocate for reconciliation. They might say they're 'just trying to help' but they're interfering with your healing. Shut it down immediately.",
      },
      {
        t: "instruction",
        body: "Response to flying monkeys: 'I know you mean well, but [ex] and I need to handle this separately. Please don't carry messages or try to mediate. It's not helpful.'",
      },

      // BUILDING NEW CONNECTIONS
      {
        t: "instruction",
        body: "While navigating mutual friends, actively build new friendships:\n• Join activities your ex isn't part of\n• Reconnect with old friends from before\n• Make friends through work, hobbies, classes\n• Create a social life that's entirely yours",
      },
      {
        t: "textInput",
        prompt: "One new social activity you'll try:",
        placeholder: "e.g., 'Join running club'",
      },

      // THE GRIEF OF LOST FRIENDSHIPS
      {
        t: "instruction",
        body: "Some friendships won't survive the breakup. That's a secondary loss that deserves grief too. You're not just losing your ex—you're losing dinner parties, game nights, that easy social circle. It's okay to mourn this.",
      },
      {
        t: "timer",
        seconds: 30,
        label: "Acknowledge any friendship grief",
      },

      // TIME AND PATIENCE
      {
        t: "instruction",
        body: "In 6-12 months, some of these dynamics will settle. Friends will adjust to the new reality. You might be able to relax some boundaries. But right now, in acute grief, you need protection more than you need to be accommodating.",
      },

      // COMMITMENT
      {
        t: "check",
        prompt: "I'll set clear boundaries with mutual friends within the next week",
      },
    ],
    haptics: true,
    commitment: {
      text: "Finish",
      duration: "week",
    },
  },
  spec_financial_entanglements: {
    id: "spec_financial_entanglements",
    moduleId: "special_cases",
    title: "Financial Entanglements",
    goal: "Handle shared finances",
    estMinutes: 5,
    format: "builder",
    sections: [
      {
        title:
          "Financial separation: Cut financial ties (Shared finances create ongoing connection and potential conflict. Separating finances is practical, but it's also emotional—it's a concrete step toward independence. This protects you financially and supports your healing)",
        items: [
          { label: "Separate accounts", kind: "check" },
          { label: "Close joint accounts", kind: "check" },
          { label: "Document agreements", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_abuse_safety: {
    id: "spec_abuse_safety",
    moduleId: "special_cases",
    title: "Safety Planning",
    goal: "Create a safety plan if needed",
    estMinutes: 6,
    format: "builder",
    sections: [
      {
        title:
          "Safety measures: Your safety comes first (If you're experiencing abuse or feel unsafe, your priority is protection, not healing. A safety plan prepares you for emergencies. Have it ready before you need it. If you're in immediate danger, call emergency services. This plan is for ongoing safety)",
        items: [
          { label: "Emergency contacts", kind: "contact", source: "phonebook" },
          { label: "Safe location", kind: "shortText" },
          { label: "Document incidents", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
  spec_high_conflict_breakup: {
    id: "spec_high_conflict_breakup",
    moduleId: "special_cases",
    title: "High-Conflict Breakup",
    goal: "Manage breakups with high conflict or manipulation",
    estMinutes: 7,
    format: "builder",
    sections: [
      {
        title:
          "Safety measures: Protect yourself from manipulation (High-conflict breakups involve manipulation, gaslighting, or attempts to control. Your attachment system is especially vulnerable here—they know your triggers. These measures create boundaries and documentation. You're not being dramatic—you're being safe)",
        items: [
          { label: "Emergency contacts", kind: "contact", source: "phonebook" },
          { label: "Document all interactions", kind: "check" },
          {
            label: "Safe communication method",
            kind: "picker",
            options: ["email only", "text only", "through lawyer", "no contact"],
          },
        ],
        minRequired: 2,
      },
      {
        title:
          "Protection strategies: Cut all access points (Manipulative people will use any access point to re-engage. Blocking on all platforms, changing passwords, and informing your support system creates multiple layers of protection. Consider legal protection if needed—your safety matters)",
        items: [
          { label: "Block on all platforms", kind: "check" },
          { label: "Change passwords", kind: "check" },
          { label: "Inform trusted friends/family", kind: "check" },
          { label: "Consider restraining order if needed", kind: "check" },
        ],
        minRequired: 2,
      },
    ],
    commitment: { text: "Finish" },
  },
}
