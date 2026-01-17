// src/schemas/menuItem.schema.js

const { z } = require('zod')

const CreateMenuItemSchema = z.object({
  name: z.string().min(1).max(200),
  itemId: z.string().uuid(),
  section: z.string().max(100).optional(),
  isActive: z.boolean().default(true).optional(),
  notes: z.string().max(500).optional(),
})

const UpdateMenuItemSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  section: z.string().max(100).optional(),
  isActive: z.boolean().optional(),
  notes: z.string().max(500).optional(),
}).strict()

const FilterMenuItemSchema = z.object({
  section: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

module.exports = {
  CreateMenuItemSchema,
  UpdateMenuItemSchema,
  FilterMenuItemSchema,
}
