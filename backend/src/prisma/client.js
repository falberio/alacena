// src/prisma/client.js
// Singleton del cliente Prisma para toda la app

require('dotenv/config')
const { PrismaClient } = require('@prisma/client')

// Instancia única del cliente (reutilizada en toda la app)
// Conexión directa a PostgreSQL sin adapter (más compatible con Vercel)
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

module.exports = prisma
