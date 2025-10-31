enum Activity {
  Exercise = "exercise",
  Meditation = "meditation",
  Yoga = "yoga",
  Reading = "reading",
  Writing = "writing",
  Painting = "painting",
  Cooking = "cooking",
  Cleaning = "cleaning",
  Driving = "driving",
  Working = "working",
  Gaming = "gaming",
  Socializing = "socializing",
  WatchingTV = "watching_tv",
  Music = "music",
  Nature = "nature",
  Studying = "studying",
  Shopping = "shopping",
  Traveling = "traveling",
  BedRotting = "bedrotting",
  Eating = "eating",
  DrinkingCoffee = "drinking_coffee",
  PetTime = "pet_time",
  Other = "other",
}

const ACTIVITY_TO_EMOJI: Record<Activity, string> = {
  [Activity.Exercise]: "🏃",
  [Activity.Meditation]: "🧘",
  [Activity.Yoga]: "🧘",
  [Activity.Reading]: "📚",
  [Activity.Writing]: "✍️",
  [Activity.Painting]: "🎨",
  [Activity.Cooking]: "👨‍🍳",
  [Activity.Cleaning]: "🧹",
  [Activity.Driving]: "🚗",
  [Activity.Working]: "💼",
  [Activity.Gaming]: "🎮",
  [Activity.Socializing]: "🗣️",
  [Activity.WatchingTV]: "📺",
  [Activity.Music]: "🎵",
  [Activity.Nature]: "🌿",
  [Activity.Studying]: "📝",
  [Activity.Shopping]: "🛍️",
  [Activity.Traveling]: "✈️",
  [Activity.BedRotting]: "🛏️",
  [Activity.Eating]: "🍽️",
  [Activity.DrinkingCoffee]: "☕",
  [Activity.PetTime]: "🐶",
  [Activity.Other]: "✨",
}

const ALL_ACTIVITIES: Activity[] = Object.values(Activity) as Activity[]

function activityToPhrase(activity: Activity): string {
  switch (activity) {
    case Activity.Exercise:
      return "exercising"
    case Activity.Meditation:
      return "meditating"
    case Activity.Yoga:
      return "doing yoga"
    case Activity.Reading:
      return "reading"
    case Activity.Writing:
      return "writing"
    case Activity.Painting:
      return "painting"
    case Activity.Cooking:
      return "cooking"
    case Activity.Cleaning:
      return "cleaning"
    case Activity.Driving:
      return "driving"
    case Activity.Working:
      return "working"
    case Activity.Gaming:
      return "gaming"
    case Activity.Socializing:
      return "socializing"
    case Activity.WatchingTV:
      return "watching TV"
    case Activity.Music:
      return "listening to music"
    case Activity.Nature:
      return "spending time in nature"
    case Activity.Studying:
      return "studying"
    case Activity.Shopping:
      return "shopping"
    case Activity.Traveling:
      return "traveling"
    case Activity.BedRotting:
      return "bed rotting"
    case Activity.Eating:
      return "eating"
    case Activity.DrinkingCoffee:
      return "drinking coffee"
    case Activity.PetTime:
      return "spending time with pets"
    case Activity.Other:
    default:
      return "something"
  }
}

export { Activity, ACTIVITY_TO_EMOJI, ALL_ACTIVITIES, activityToPhrase }
