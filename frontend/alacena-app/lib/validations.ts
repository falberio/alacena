import { z } from 'zod'

export const LoginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const RegisterSchema = z.object({
    email: z.string().email('Email inválido'),
    name: z.string().optional(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
})

export const ItemSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    kind: z.enum(['PRODUCT', 'RECIPE']),
    code: z.string().optional(),
    category: z.string().optional(),
    notes: z.string().optional(),
})

export const LocationSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    kind: z.enum(['AREA', 'SECTION', 'SLOT']),
    code: z.string().optional(),
    sortIndex: z.number().int().default(0),
    notes: z.string().optional(),
})

export const ReserveSchema = z.object({
    itemId: z.string().min(1, 'Debe seleccionar un item'),
    locationId: z.string().optional(),
    status: z.enum(['ACTIVE', 'TRANSFORMED', 'CONSUMED', 'DISCARDED']),
    qty: z.number().int().optional(),
    unit: z.enum(['UNIT', 'GRAM', 'ML']),
    notes: z.string().optional(),
})

export const MenuItemSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    itemId: z.string().min(1, 'Debe seleccionar un item'),
    section: z.string().optional(),
    isActive: z.boolean().default(true),
    notes: z.string().optional(),
})

export type LoginInput = z.infer<typeof LoginSchema>
export type RegisterInput = z.infer<typeof RegisterSchema>
export type ItemInput = z.infer<typeof ItemSchema>
export type LocationInput = z.infer<typeof LocationSchema>
export type ReserveInput = z.infer<typeof ReserveSchema>
export type MenuItemInput = z.infer<typeof MenuItemSchema>
