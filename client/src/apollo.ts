import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

export const isLoggedInVar = makeVar(false)

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read: (): boolean => isLoggedInVar(),
          },
        },
      },
    },
  }),
})
