import { z } from 'zod'

export const createSchema = z.object({
  client_id: z.string(),
  hours: z
    .number()
    .min(10, { message: 'Hours must be at least 10' })
    .max(100, { message: 'Hours cannot exceed 100' }),
  hours_left: z.number(),
  is_active: z.boolean().default(true),
  price: z.number(),
  ends_at: z.string(),
})

export const deleteSchema = z.object({
  card_id: z.string(),
})

export const updateSchema = z.object({
  card_id: z.string(),
  hours: z.number().refine((value) => value !== 0, {
    message: 'Size cannot be zero',
  }),
  price: z.number(),
})
