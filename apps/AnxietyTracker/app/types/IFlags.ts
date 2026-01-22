export type IFlags = {
  task_limit_free_users?: number
  promotion_active?: boolean
  leadup_slides?: boolean
  testimonials_slide?: boolean
  show_rate_lesson_probability?: number
}

export type IFeatureFlags = {
  flags?: IFlags
}

export const isFeatureFlags = (data: any): data is IFlags => {
  return (
    data.task_limit_free_users !== undefined ||
    data.promotion_active !== undefined ||
    data.leadup_slides !== undefined ||
    data.show_rate_lesson_probability !== undefined ||
    data.testimonials_slide !== undefined
  )
}
