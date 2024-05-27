import { z } from 'zod'

export const updateSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  id: z.string(),
})
