import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import { LOCALSTORAGE_TOKEN_KEY } from './constants/users/token.constant'
import { setContext } from '@apollo/client/link/context'

const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
export const isLoggedInVar = makeVar(Boolean(token))
const userToken = makeVar(token)

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      access_token: userToken() || '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
