import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, enumType, makeSchema, objectType } from 'nexus'
import { InteractionType, RoleType, StatusType } from 'nexus-prisma'
import {
    DepositCreateInput,
    DepositObject,
    InteractionObject,
    PassportObject,
    ProductObject,
    RoleCreateInput,
    RoleObject,
    createDeposit,
    createRole,
    deposits,
    roleByUid,
    roles
} from './models'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
    name: 'Query',
    definition(t) {
        roles(t)
        roleByUid(t)
        deposits(t)
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        createRole(t)
        createDeposit(t)
    }
})

export const schema = makeSchema({
    types: [
        Query,
        Mutation,
        DateTime,
        DepositObject,
        DepositCreateInput,
        InteractionObject,
        PassportObject,
        ProductObject,
        RoleObject,
        RoleCreateInput,
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
