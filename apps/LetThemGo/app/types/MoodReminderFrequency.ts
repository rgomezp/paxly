export enum MoodReminderFrequency {
  EVERY_HOUR = "every_hour",
  THREE_TIMES_DAY = "three_times_day",
  SIX_TIMES_DAY = "six_times_day",
  ONCE_DAY = "once_day",
}

export const MoodReminderFrequencyLabels: Record<MoodReminderFrequency, string> = {
  [MoodReminderFrequency.EVERY_HOUR]: "Every hour",
  [MoodReminderFrequency.THREE_TIMES_DAY]: "Three times a day",
  [MoodReminderFrequency.SIX_TIMES_DAY]: "Six times a day",
  [MoodReminderFrequency.ONCE_DAY]: "Once per day",
}

export const MoodReminderFrequencyShorthand: Record<MoodReminderFrequency, string> = {
  [MoodReminderFrequency.EVERY_HOUR]: "1x/hr",
  [MoodReminderFrequency.THREE_TIMES_DAY]: "3x/day",
  [MoodReminderFrequency.SIX_TIMES_DAY]: "6x/day",
  [MoodReminderFrequency.ONCE_DAY]: "1x/day",
}

