import { inputObjectType, objectType } from 'nexus'
import { Passport } from 'nexus-prisma'

export const PassportObject = objectType({
    name: Passport.$name,
    description: Passport.$description,
    definition(t) {
        t.field(Passport.id)
        t.field(Passport.uid)
        t.field(Passport.name)
        t.field(Passport.definition)
        t.field(Passport.brand)
        t.field(Passport.brandId)
        t.field(Passport.Product)
    }
})

export const PassportCreateInput = inputObjectType({
    name: `${Passport.$name}CreateInput`,
    definition(t) {
        t.field(Passport.uid)
        t.field(Passport.name)
        t.field(Passport.definition)
        t.field(Passport.brand)
        t.field(Passport.brandId)
    }
})
