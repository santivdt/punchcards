import { z } from 'zod'

export const createCardTypeSchema = z.object({
  hours: z.number(),
  price: z.number(),
})
