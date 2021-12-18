import { gql } from '@apollo/client'

export const CREATE_ACCOUNT = gql`
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
