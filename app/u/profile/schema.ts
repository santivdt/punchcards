import { z } from 'zod'

export const updateProfileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  id: z.string(),
})

export const createCardTypeSchema = z.object({
  hours: z.number().refine((data) => data !== 0, {
    message: 'Hours cannot be zero',
  }),
  price: z.number().refine((data) => data !== 0, {
    message: 'Price cannot be zero',
  }),
})

export const deleteSchema = z.object({
  id: z.string(),
})
