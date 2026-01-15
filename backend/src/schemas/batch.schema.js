// src/schemas/batch.schema.js

import { z } from 'zod'

const CreateBatchSchema = z.object({
  code: z.string().min(1).max(50).optional(),
  itemId: z.string().uuid(),
  bestBefore: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
})

const UpdateBatchSchema = z.object({
  bestBefore: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
}).strict()

const FilterBatchSchema = z.object({
  itemId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

export {
  CreateBatchSchema,
  UpdateBatchSchema,
  FilterBatchSchema,
}
