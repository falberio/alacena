// src/schemas/reserve.schema.js
// Validación de datos para el modelo Reserve usando Zod

import { z } from 'zod'

// Enum para estados de reserva (debe coincidir con schema.prisma)
const ReserveStatusEnum = z.enum(['ACTIVE', 'CONSUMED', 'EXPIRED', 'WASTED'])

// Schema para crear una reserva
const CreateReserveSchema = z.object({
  itemId: z.string().uuid('itemId debe ser un UUID válido'),
  batchId: z.string().uuid('batchId debe ser un UUID válido').optional(),
  locationId: z.string().uuid('locationId debe ser un UUID válido').optional(),
  containerId: z.string().uuid('containerId debe ser un UUID válido').optional(),
  
  // Medidas: se puede usar una o varias
  netWeight_g: z.number().int().positive('netWeight debe ser positivo').optional(),
  netVolume_ml: z.number().int().positive('netVolume debe ser positivo').optional(),
  unitCount: z.number().int().positive('unitCount debe ser positivo').optional(),
  
  // Pesas (opcional)
  grossWeight_g: z.number().int().positive().optional(),
  tareWeight_g: z.number().int().positive().optional(),
  
  // Fechas
  bestBefore: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
})

// Schema para actualizar una reserva (todo es opcional)
const UpdateReserveSchema = z.object({
  status: ReserveStatusEnum.optional(),
  locationId: z.string().uuid().optional(),
  containerId: z.string().uuid().optional(),
  netWeight_g: z.number().int().positive().optional(),
  netVolume_ml: z.number().int().positive().optional(),
  unitCount: z.number().int().positive().optional(),
  grossWeight_g: z.number().int().positive().optional(),
  tareWeight_g: z.number().int().positive().optional(),
  bestBefore: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
}).strict() // No permite campos extra

// Schema para filtrar reservas (query params)
const FilterReserveSchema = z.object({
  status: ReserveStatusEnum.optional(),
  itemId: z.string().uuid().optional(),
  locationId: z.string().uuid().optional(),
  limit: z.coerce.number().int().positive().default(50),
  offset: z.coerce.number().int().nonnegative().default(0),
})

export {
  CreateReserveSchema,
  UpdateReserveSchema,
  FilterReserveSchema,
  ReserveStatusEnum,
}
