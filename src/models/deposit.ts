import { inputObjectType, objectType } from 'nexus'
import { Deposit } from 'nexus-prisma'

export const DepositObject = objectType({
    name: Deposit.$name,
    description: Deposit.$description,
    definition(t) {
        t.field(Deposit.id)
        t.field(Deposit.gtin)
        t.field(Deposit.amount)
        t.field(Deposit.Product)
    }
})

export const DepositCreateInput = inputObjectType({
    name: `${Deposit.$name}CreateInput`,
    definition(t) {
        t.field(Deposit.gtin)
        t.field(Deposit.amount)
    }
})
