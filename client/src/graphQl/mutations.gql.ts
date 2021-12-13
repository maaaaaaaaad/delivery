import { gql } from '@apollo/client'

export const USER_CREATE_ACCOUNT = gql`
  mutation createAccount(
    $accountId: String!
    $password: String!
    $email: String!
    $nickname: String!
    $role: String!
  ) {
    createAccount(
      input: {
        accountId: $accountId
        password: $password
        email: $email
        nickname: $nickname
        role: $role
      }
    ) {
      access
      errorMessage
    }
  }
`

export const USER_LOGIN = gql`
  mutation loginAccount($accountId: String!, $password: String!) {
    loginAccount(input: { accountId: $accountId, password: $password }) {
      access
      access_token
      errorMessage
    }
  }
`
