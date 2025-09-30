import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create default tags
    const defaultTags = [
        { name: 'Twitter' },
        { name: 'Youtube' },
        { name: 'Docs' },
        { name: 'Link' }
    ]

    console.log('Start seeding tags...')

    for (const tagData of defaultTags) {
        const tag = await prisma.tag.upsert({
            where: { name: tagData.name },
            update: {},
            create: tagData,
        })
        console.log(`Created tag: ${tag.name}`)
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })