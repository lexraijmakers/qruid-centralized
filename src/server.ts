import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Context, createContext } from './context'
import { schema } from './schema'

const start = async () => {
    const server = new ApolloServer<Context>({ schema })

    const { url } = await startStandaloneServer(server, {
        context: createContext,
        listen: { port: 4000 }
    })

    console.log(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-nexus#using-the-graphql-api
  `)
}

start()
