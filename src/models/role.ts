import { arg, inputObjectType, nonNull, objectType } from 'nexus'
import { Role } from 'nexus-prisma'
import { ObjectDefinitionBlock, stringArg } from 'nexus/dist/core'
import { Context } from '../context'

export const RoleObject = objectType({
    name: Role.$name,
    description: Role.$description,
    definition(t) {
        t.field(Role.id)
        t.field(Role.type)
        t.field(Role.uid)
        t.field(Role.name)
        t.field(Role.description)
        t.field(Role.Interaction)
        t.field(Role.Passport)
    }
})

export const RoleCreateInput = inputObjectType({
    name: `${Role.$name}CreateInput`,
    definition(t) {
        t.field(Role.type)
        t.field(Role.uid)
        t.field(Role.name)
        t.field(Role.description)
    }
})

export const createRole = (t: ObjectDefinitionBlock<'Mutation'>) => {
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

export const roles = (t: ObjectDefinitionBlock<'Query'>) => {
    t.nonNull.list.nonNull.field('roles', {
        type: Role.$name,
        resolve: (_, __, context: Context) => {
            return context.prisma.role.findMany()
        }
    })
}

export const roleByUid = (t: ObjectDefinitionBlock<'Query'>) => {
    t.nonNull.field('roleByUid', {
        type: Role.$name,
        args: { uid: stringArg() },
        resolve: (_, args, context: Context) => {
            return context.prisma.role.findUniqueOrThrow({
                where: { uid: args?.uid || '' }
            })
        }
    })
}
