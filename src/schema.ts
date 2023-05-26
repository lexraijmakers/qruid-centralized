import { DateTimeResolver } from 'graphql-scalars'
import { arg, asNexusMethod, inputObjectType, makeSchema, nonNull, objectType } from 'nexus'
import { User } from 'nexus-prisma'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: User.$name,
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.user.findMany()
            }
        })
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.nonNull.field('signupUser', {
            type: User.$name,
            args: {
                data: nonNull(
                    arg({
                        type: 'UserCreateInput'
                    })
                )
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.user.create({
                    data: {
                        name: args.data.name,
                        email: args.data.email
                    }
                })
            }
        })
    }
})

const UserObject = objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
        t.field(User.id)
        t.field(User.name)
        t.field(User.email)
    }
})

const UserCreateInput = inputObjectType({
    name: 'UserCreateInput',
    definition(t) {
        t.field(User.name)
        t.field(User.email)
    }
})

export const schema = makeSchema({
    types: [Query, Mutation, UserObject, UserCreateInput, DateTime],
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
