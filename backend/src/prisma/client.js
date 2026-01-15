// src/prisma/client.js
// Singleton del cliente Prisma para toda la app

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Crear pool de conexiones con configuración de Supabase
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Supabase usa certificados autofirmados
})

// Crear adapter de PostgreSQL para Prisma v7
const adapter = new PrismaPg(pool)

// Instancia única del cliente (reutilizada en toda la app)
const prisma = new PrismaClient({ adapter })

export default prisma
