import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.ProductCreateInput[] = [
    {
        qruid: '66000ad5b60c4a747627779b4791328e',
        brand_id: 'New Optimist',
        deposit_amount: 0,
        has_deposit: true
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const user = await prisma.product.create({
            data: u
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
