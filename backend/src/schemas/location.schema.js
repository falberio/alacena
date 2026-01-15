// src/schemas/location.schema.js

import { z } from 'zod'

const LocationKindEnum = z.enum(['AREA', 'SECTION', 'POSITION'])

const CreateLocationSchema = z.object({
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(200),
  kind: LocationKindEnum,
  parentId: z.string().uuid().optional(),
  sortIndex: z.number().int().nonnegative().default(0),
  notes: z.string().max(500).optional(),
})

const UpdateLocationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  parentId: z.string().uuid().optional(),
  sortIndex: z.number().int().nonnegative().optional(),
  notes: z.string().max(500).optional(),
}).strict()

const FilterLocationSchema = z.object({
  kind: LocationKindEnum.optional(),
  parentId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

export {
  CreateLocationSchema,
  UpdateLocationSchema,
  FilterLocationSchema,
  LocationKindEnum,
}
