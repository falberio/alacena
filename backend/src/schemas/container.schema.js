// src/schemas/container.schema.js

import { z } from 'zod'

const CreateContainerSchema = z.object({
  code: z.string().min(1).max(50),
  typeId: z.string().uuid(),
  locationId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
})

const UpdateContainerSchema = z.object({
  locationId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
}).strict()

const FilterContainerSchema = z.object({
  typeId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

export {
  CreateContainerSchema,
  UpdateContainerSchema,
  FilterContainerSchema,
}
