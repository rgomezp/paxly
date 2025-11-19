/**
 * Stores text responses for lesson inputs.
 * Key format: `${lessonId}:${inputId}`
 * Value: the text content entered by the user
 */
export interface ILessonResponses {
  [key: string]: string // key is `${lessonId}:${inputId}`, value is the text
}
