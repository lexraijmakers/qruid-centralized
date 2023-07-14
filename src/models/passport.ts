import { arg, inputObjectType, nonNull, objectType, stringArg } from 'nexus'
import { Passport } from 'nexus-prisma'
import { ObjectDefinitionBlock } from 'nexus/dist/core'
import { Context } from '../context'

export const PassportObject = objectType({
    name: Passport.$name,
    description: Passport.$description,
    definition(t) {
        t.field(Passport.uid)
        t.field(Passport.name)
        t.field(Passport.definition)
        t.field(Passport.brand)
    }
})

export const PassportCreateInput = inputObjectType({
    name: `${Passport.$name}CreateInput`,
    definition(t) {
        t.field(Passport.uid)
        t.field(Passport.name)
        t.field(Passport.definition)
        t.nonNull.string('brandUid')
    }
})

export const createPassport = (t: ObjectDefinitionBlock<'Mutation'>) => {
    t.nonNull.field('createPassport', {
        type: Passport.$name,
        args: {
            data: nonNull(
                arg({
                    type: `${Passport.$name}CreateInput`
                })
            )
        },
        resolve: (_, args, context: Context) => {
            return context.prisma.passport.create({
                data: {
                    uid: args.data.uid,
                    name: args.data.name,
                    definition: args.data.definition,
                    brand: { connect: { uid: args.data.brandUid } }
                }
            })
        }
    })
}

export const passports = (t: ObjectDefinitionBlock<'Query'>) => {
    t.nonNull.list.nonNull.field('passports', {
        type: Passport.$name,
        resolve: (_, __, context: Context) => {
            return context.prisma.passport.findMany()
        }
    })
}

export const deletePassport = (t: ObjectDefinitionBlock<'Mutation'>) => {
    t.field('deletePassport', {
        type: Passport.$name,
        args: { uid: nonNull(stringArg()) },
        resolve: (_, args, context: Context) => {
            return context.prisma.passport.delete({
                where: { uid: args.uid }
            })
        }
    })
}
