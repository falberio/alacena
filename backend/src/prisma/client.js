// src/prisma/client.js
// Singleton del cliente Prisma para toda la app

require('dotenv/config')
const { PrismaClient } = require('@prisma/client')

// Instancia única del cliente (reutilizada en toda la app)
// Configuración específica para Vercel serverless
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

module.exports = prisma
