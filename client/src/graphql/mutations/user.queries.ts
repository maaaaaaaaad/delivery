import { gql } from '@apollo/client'

export const USER_STATE = gql`
  query userState {
    userState {
      accountId
      email
      role
      createAt
      nickname
    }
  }
`
