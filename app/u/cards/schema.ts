import { z } from 'zod'

export const createSchema = z.object({
  client_id: z.string(),
  hours: z.number().refine((value) => value !== 0, {
    message: 'Size cannot be zero',
  }),
  hours_left: z.number(),
  is_active: z.boolean().default(true),
  price: z.number(),
})

export const deleteSchema = z.object({
  card_id: z.string(),
})

export const updateSchema = z.object({
  card_id: z.string(),
  hours: z.number(),
  hours_left: z.number(),
  price: z.number(),
})
