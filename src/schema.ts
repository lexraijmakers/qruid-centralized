import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, enumType, makeSchema, objectType } from 'nexus'
import { InteractionType, RoleType, StatusType } from 'nexus-prisma'
import {
    DepositCreateInput,
    DepositObject,
    createDeposit,
    deleteDeposit,
    deposits
} from './models/deposit'
import { InteractionCreateInput, InteractionObject, createInteraction } from './models/interaction'
import {
    PassportCreateInput,
    PassportObject,
    createPassport,
    deletePassport,
    passports
} from './models/passport'
import {
    ProductCreateInput,
    ProductObject,
    createProduct,
    deleteProduct,
    productByQruid,
    products
} from './models/product'
import {
    RoleCreateInput,
    RoleObject,
    createRole,
    deleteRole,
    roleByUid,
    roles
} from './models/role'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
    name: 'Query',
    definition(t) {
        roles(t)
        roleByUid(t)
        deposits(t)
        passports(t)
        productByQruid(t)
        products(t)
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        createRole(t)
        createDeposit(t)
        createPassport(t)
        createProduct(t)
        createInteraction(t)
        deleteDeposit(t)
        deletePassport(t)
        deleteProduct(t)
        deleteRole(t)
    }
})

export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        DateTime,
        DepositObject,
        DepositCreateInput,
        PassportObject,
        PassportCreateInput,
        RoleObject,
        RoleCreateInput,
        ProductObject,
        ProductCreateInput,
        InteractionObject,
        InteractionCreateInput,
        enumType(RoleType),
        enumType(InteractionType),
        enumType(StatusType)
    ],
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
