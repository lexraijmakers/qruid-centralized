import { objectType } from 'nexus'
import { Interaction } from 'nexus-prisma'

export const InteractionObject = objectType({
    name: Interaction.$name,
    description: Interaction.$description,
    definition(t) {
        t.field(Interaction.id)
        t.field(Interaction.type)
        t.field(Interaction.date)
        t.field(Interaction.description)
        t.field(Interaction.role)
        t.field(Interaction.roleId)
        t.field(Interaction.Product)
        t.field(Interaction.productId)
    }
})
