import { arg, inputObjectType, nonNull, objectType } from 'nexus'
import { Interaction } from 'nexus-prisma'
import { ObjectDefinitionBlock } from 'nexus/dist/core'
import { Context } from '../context'

export const InteractionObject = objectType({
    name: Interaction.$name,
    description: Interaction.$description,
    definition(t) {
        t.field(Interaction.type)
        t.field(Interaction.description)
        t.field(Interaction.date)
        t.field(Interaction.role)
    }
})

export const InteractionCreateInput = inputObjectType({
    name: `${Interaction.$name}CreateInput`,
    definition(t) {
        t.field(Interaction.type)
        t.field(Interaction.description)
        t.nonNull.string('roleUid')
        t.nonNull.string('productQruid')
    }
})

export const createInteraction = (t: ObjectDefinitionBlock<'Mutation'>) => {
    t.nonNull.field('createInteraction', {
        type: Interaction.$name,
        args: {
            data: nonNull(
                arg({
                    type: `${Interaction.$name}CreateInput`
                })
            )
        },
        resolve: (_, args, context: Context) => {
            return context.prisma.interaction.create({
                data: {
                    product: { connect: { qruid: args.data.productQruid } },
                    role: { connect: { uid: args.data.roleUid } },
                    type: args.data.type,
                    description: args.data.description
                }
            })
        }
    })
}
