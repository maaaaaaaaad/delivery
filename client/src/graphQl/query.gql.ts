import { gql } from '@apollo/client'

export const GET_USER_SELF = gql`
  query getUserSelf {
    userState {
      accountId
      email
      nickname
      role
    }
  }
`
