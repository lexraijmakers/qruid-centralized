import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Context, createContext } from './context'
import { schema } from './schema'

const start = async () => {
    const server = new ApolloServer<Context>({ schema })
    const port = Number.parseInt(process?.env?.PORT || '4000') || 4000

    const { url } = await startStandaloneServer(server, {
        context: createContext,
        listen: { port }
    })

    console.log(`🚀 Server ready at: ${url}`)
}

start()
