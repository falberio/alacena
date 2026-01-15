import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
    // Location
    const location = await prisma.location.upsert({
        where: { code: 'ALC' },
        update: {},
        create: { code: 'ALC', name: 'Alacena', kind: 'AREA' }
    })

    // Container Type
    const containerType = await prisma.containerType.upsert({
        where: { code: 'FR-750' },
        update: {},
        create: { code: 'FR-750', name: 'Frasco 750ml', nominalVolume_ml: 750 }
    })

    // Item (use unique code)
    const item = await prisma.item.upsert({
        where: { code: 'GIU-LENT' },
        update: {},
        create: { code: 'GIU-LENT', name: 'Guiso de lentejas', kind: 'RECIPE', defaultUnit: 'GRAM' }
    })

    // MenuItem - check if exists by name + itemId
    const existingMenuItem = await prisma.menuItem.findFirst({
        where: { 
            name: 'Guiso del día',
            itemId: item.id
        }
    })

    if (!existingMenuItem) {
        await prisma.menuItem.create({
            data: { 
                name: 'Guiso del día', 
                itemId: item.id, 
                section: 'Platos' 
            }
        })
    }

    console.log('Seed: datos iniciales insertados ✅')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
