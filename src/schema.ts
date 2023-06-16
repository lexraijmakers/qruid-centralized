import { DateTimeResolver } from 'graphql-scalars'
import { arg, asNexusMethod, inputObjectType, makeSchema, nonNull, objectType } from 'nexus'
import { Product } from 'nexus-prisma'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allProducts', {
            type: Product.$name,
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.product.findMany()
            }
        })
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.nonNull.field('activateProduct', {
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
                        has_deposit: args.data.deposit_amount > 0,
                        brand_id: args.data.brand_id,
                        deposit_amount: args.data.deposit_amount
                    }
                })
            }
        })
    }
})

const ProductObject = objectType({
    name: Product.$name,
    description: Product.$description,
    definition(t) {
        t.field(Product.id)
        t.field(Product.qruid)
        t.field(Product.has_deposit)
        t.field(Product.brand_id)
        t.field(Product.date_of_activation)
        t.field(Product.deposit_amount)
        t.field(Product.customer_id)
        t.field(Product.retailer_id)
        t.field(Product.passport_definition)
        t.field(Product.date_of_return)
    }
})

const ProductCreateInput = inputObjectType({
    name: `${Product.$name}CreateInput`,
    definition(t) {
        t.field(Product.qruid)
        t.field(Product.brand_id)
        t.field(Product.deposit_amount)
    }
})

export const schema = makeSchema({
    types: [Query, Mutation, ProductObject, ProductCreateInput, DateTime],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma'
            }
        ]
    }
})
