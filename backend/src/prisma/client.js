// src/prisma/client.js
// Singleton del cliente Prisma para toda la app

require('dotenv/config')
const { PrismaClient } = require('@prisma/client')

// Instancia única del cliente (reutilizada en toda la app)
// Configuración específica para Vercel serverless
const prisma = global.prisma || new PrismaClient({
  log: ['error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

module.exports = prisma
