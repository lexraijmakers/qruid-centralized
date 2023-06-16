import { objectType } from 'nexus'
import { Product } from 'nexus-prisma'

export const ProductObject = objectType({
    name: Product.$name,
    description: Product.$description,
    definition(t) {
        t.field(Product.id)
        t.field(Product.qruid)
        t.field(Product.passport)
        t.field(Product.passportId)
        t.field(Product.status)
        t.field(Product.deposit)
        t.field(Product.depositId)
        t.field(Product.interactions)
    }
})
