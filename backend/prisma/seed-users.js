// prisma/seed-users.js
// Script para crear usuarios de prueba

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    try {
        // Crear usuario admin de prueba
        const adminPassword = await bcrypt.hash('admin123', 10)
        const admin = await prisma.user.upsert({
            where: { email: 'admin@alacena.local' },
            update: {},
            create: {
                email: 'admin@alacena.local',
                name: 'Administrador',
                passwordHash: adminPassword,
                role: 'admin',
            },
        })

        // Crear usuario regular de prueba
        const userPassword = await bcrypt.hash('user123', 10)
        const user = await prisma.user.upsert({
            where: { email: 'user@alacena.local' },
            update: {},
            create: {
                email: 'user@alacena.local',
                name: 'Usuario Regular',
                passwordHash: userPassword,
                role: 'user',
            },
        })

        console.log('✅ Usuarios creados/actualizados:')
        console.log(`  - ${admin.email} (admin) con contraseña: admin123`)
        console.log(`  - ${user.email} (user) con contraseña: user123`)
    } catch (e) {
        console.error('❌ Error:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
