export enum BadgeType {
  LETTER_TO_MYSELF = "letterToMyself",
  MY_STUFF = "myStuff",
}
export interface IBadgeData {
  shouldShow: boolean
  timestamp: number // When the badge was set
  badgeType?: BadgeType
}
