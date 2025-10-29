export default interface INoContactData {
  lastContacted: number // date
  timesContacted: number
  currentGoal: NoContactGoal
}

enum NoContactGoal {
  OneDay,
  OneWeek,
  TwoWeeks,
  OneMonth,
  TwoMonths,
  ThreeMonths,
  FourMonths,
  FiveMonths,
  SixMonths,
  OneYear,
}

export { NoContactGoal }
