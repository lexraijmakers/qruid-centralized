import { arg, inputObjectType, nonNull, objectType } from 'nexus'
import { Deposit } from 'nexus-prisma'
import { ObjectDefinitionBlock } from 'nexus/dist/core'
import { Context } from '../context'

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

export const createDeposit = (t: ObjectDefinitionBlock<'Mutation'>) => {
    t.nonNull.field('createDeposit', {
        type: Deposit.$name,
        args: {
            data: nonNull(
                arg({
                    type: `${Deposit.$name}CreateInput`
                })
            )
        },
        resolve: (_, args, context: Context) => {
            return context.prisma.deposit.create({
                data: {
                    ...args.data
                }
            })
        }
    })
}

export const deposits = (t: ObjectDefinitionBlock<'Query'>) => {
    t.nonNull.list.nonNull.field('deposits', {
        type: Deposit.$name,
        resolve: (_, __, context: Context) => {
            return context.prisma.deposit.findMany()
        }
    })
}
