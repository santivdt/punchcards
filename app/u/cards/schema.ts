import { z } from 'zod'

export const createSchema = z.object({
  client_id: z.string(),
  hours: z.number(),
  hours_left: z.number(),
  is_active: z.boolean().default(true),
})

export const deleteSchema = z.object({
  card_id: z.string(),
})

export const updateSchema = z.object({
  card_id: z.string(),
  hours: z.number(),
  hours_left: z.number(),
})
