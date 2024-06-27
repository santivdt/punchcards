import { z } from 'zod'

export const createSchema = z.object({
  description: z.string(),
  duration: z
    .number()
    .min(0.5, { message: 'Duration must be greater than or equal to 0.5' }),
  card_id: z.string(),
  date: z.string(),
})

export const deleteSchema = z.object({
  hourId: z.string(),
  duration: z.number(),
  cardId: z.string(),
})

export const updateSchema = z.object({
  description: z.string(),
  duration: z
    .number()
    .min(0.5, { message: 'Duration must be greater than or equal to 0.5' }),
  hourId: z.string(),
  cardId: z.string(),
  date: z.string(),
})
