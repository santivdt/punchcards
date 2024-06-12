import { z } from 'zod'

export const updateProfileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  company: z.string(),
  id: z.string(),
  avatar: z.instanceof(File),
})

export const deleteSchema = z.object({
  id: z.string(),
})
