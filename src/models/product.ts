import { arg, inputObjectType, nonNull, objectType, stringArg } from 'nexus'
import { InteractionType, Product } from 'nexus-prisma'
import { ObjectDefinitionBlock } from 'nexus/dist/core'
import { Context } from '../context'

export const ProductObject = objectType({
    name: Product.$name,
    description: Product.$description,
    definition(t) {
        t.field(Product.qruid)
        t.field(Product.status)
        t.field(Product.passport)
        t.field(Product.deposit)
        t.field(Product.interactions)
    }
})

export const ProductCreateInput = inputObjectType({
    name: `${Product.$name}CreateInput`,
    definition(t) {
        t.field(Product.qruid)
        t.nonNull.string('passportUid')
        t.nonNull.string('depositGtin')
        t.nonNull.string('roleUid')
    }
})

export const createProduct = (t: ObjectDefinitionBlock<'Mutation'>) => {
    t.nonNull.field('createProduct', {
        type: Product.$name,
        args: {
            data: nonNull(
                arg({
                    type: `${Product.$name}CreateInput`
                })
            )
        },
        resolve: (_, args, context: Context) => {
            return context.prisma.product.create({
                data: {
                    qruid: args.data.qruid,
                    deposit: { connect: { gtin: args.data.depositGtin } },
                    passport: { connect: { uid: args.data.passportUid } },
                    interactions: {
                        create: {
                            role: { connect: { uid: args.data.roleUid } },
                            type: InteractionType.members[
                                InteractionType.members.indexOf('ACTIVATION')
                            ],
                            description: 'Product activated'
                        }
                    }
                }
            })
        }
    })
}

export const productByQruid = (t: ObjectDefinitionBlock<'Query'>) => {
    t.nonNull.field('productByQruid', {
        type: Product.$name,
        args: { qruid: stringArg() },
        resolve: (_, args, context: Context) => {
            return context.prisma.product.findUniqueOrThrow({
                where: { qruid: args?.qruid || '' }
            })
        }
    })
}
