// src/schemas/item.schema.js

import { z } from 'zod'

const ItemKindEnum = z.enum(['PRODUCT', 'RECIPE'])
const UnitKindEnum = z.enum(['GRAM', 'ML', 'UNIT'])

const CreateItemSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(1).max(200),
  kind: ItemKindEnum,
  defaultUnit: UnitKindEnum,
  category: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
})

const UpdateItemSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  defaultUnit: UnitKindEnum.optional(),
  category: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
}).strict()

const FilterItemSchema = z.object({
  kind: ItemKindEnum.optional(),
  search: z.string().max(100).optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

export {
  CreateItemSchema,
  UpdateItemSchema,
  FilterItemSchema,
  ItemKindEnum,
  UnitKindEnum,
}
