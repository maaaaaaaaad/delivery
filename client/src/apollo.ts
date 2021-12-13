import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'
import { LOCALSTORAGE_TOKEN_KEY } from './constants/users/token.constant'

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
export const isLoggedInVar = makeVar(Boolean(token))
const userToken = makeVar(token)

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read: (): boolean => isLoggedInVar(),
          },
          readToken: {
            read: () => userToken(),
          },
        },
      },
    },
  }),
})
