import { z } from 'zod'

export const createSchema = z.object({
  description: z.string(),
  duration: z
    .number()
    .min(0.5)
    .refine((val) => val % 0.5 === 0, {
      message: 'Number bust me greater than 0.5 and divisible by 0.5',
    }),
  client_id: z.string(),
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
    .min(0.5)
    .refine((val) => val % 0.5 === 0, {
      message: 'Number bust me greater than 0.5 and divisible by 0.5',
    }),
  hourId: z.string(),
})
