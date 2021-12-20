import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ACCESS_TOKEN } from './common/constatns'

const token = window.localStorage.getItem(ACCESS_TOKEN)
export const isLoggedInVar = makeVar(!!token)
export const authTokenVar = makeVar(token)
export const me = makeVar(null)

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
})

const authLink = setContext((_, { headers }) => {
  if (token) {
    return {
      headers: {
        ...headers,
        access_token: authTokenVar(),
      },
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      userState: {
        fields: {
          user: {
            read() {
              return me()
            },
          },
        },
      },
    },
  }),
})
