import { DateTimeResolver } from 'graphql-scalars'
import { arg, asNexusMethod, enumType, makeSchema, nonNull, objectType, stringArg } from 'nexus'
import { InteractionType, Role, RoleType, StatusType } from 'nexus-prisma'
import { Context } from './context'
import {
    DepositCreateInput,
    DepositObject,
    InteractionObject,
    PassportObject,
    ProductObject,
    RoleCreateInput,
    RoleObject
} from './models'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allRoles', {
            type: Role.$name,
            resolve: (_, __, context: Context) => {
                return context.prisma.role.findMany()
            }
        })
        t.nonNull.field('getRoleByUid', {
            type: Role.$name,
            args: { uid: stringArg() },
            resolve: (_, args, context: Context) => {
                return context.prisma.role.findUniqueOrThrow({
                    where: { uid: args?.uid || '' }
                })
            }
        })
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.nonNull.field('createRole', {
            type: Role.$name,
            args: {
                data: nonNull(
                    arg({
                        type: `${Role.$name}CreateInput`
                    })
                )
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.role.create({
                    data: {
                        ...args.data
                    }
                })
            }
        })
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
