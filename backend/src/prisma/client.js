// src/prisma/client.js
// Singleton del cliente Prisma para toda la app

import 'dotenv/config'
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import adapterPkg from '@prisma/adapter-pg'
const { PrismaPg } = adapterPkg
import pgPkg from 'pg'
const { Pool } = pgPkg

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
