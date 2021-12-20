import { gql } from '@apollo/client'

export const USER_STATE_GET_NICKNAME = gql`
  query userState {
    userState {
      nickname
    }
  }
`
