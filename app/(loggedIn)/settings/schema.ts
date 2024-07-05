import { z } from 'zod'

export const updateProfileSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  id: z.string(),
  avatar: z.instanceof(File),
})

export const updateOrganisationSchema = z.object({
  id: z.string(),
  logo: z.instanceof(File),
  name: z.string(),
})

export const createOrganisationSchema = z.object({
  logo: z.instanceof(File),
  name: z.string(),
})

export const deleteSchema = z.object({
  id: z.string(),
})
