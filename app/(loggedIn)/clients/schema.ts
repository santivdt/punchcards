import { z } from 'zod'

export const createSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export const deleteSchema = z.object({
  clientId: z.string(),
})

export const updateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  clientId: z.string(),
})
