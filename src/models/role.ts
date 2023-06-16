import { inputObjectType, objectType } from 'nexus'
import { Role } from 'nexus-prisma'

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
