export type IFlags = {
  task_limit_free_users?: number
  promotion_active?: boolean
  leadup_slides?: boolean
}

export type IFeatureFlags = {
  flags?: IFlags
}

export const isFeatureFlags = (data: any): data is IFlags => {
  return (
    data.task_limit_free_users !== undefined ||
    data.promotion_active !== undefined ||
    data.leadup_slides !== undefined
  )
}
