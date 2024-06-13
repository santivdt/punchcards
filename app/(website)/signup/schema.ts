import { z } from 'zod'

export const createFeedbackSchema = z.object({ feedback: z.string() })
