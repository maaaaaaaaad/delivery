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

export const LOGIN_ACCOUNT = gql`
  mutation loginAccount($accountId: String!, $password: String!) {
    loginAccount(input: { accountId: $accountId, password: $password }) {
      access
      access_token
      errorMessage
      user {
        accountId
        email
        nickname
        role
        createAt
        updateAt
      }
    }
  }
`

export const EDIT_PROFILE = gql`
  mutation editProfile($password: String, $email: String, $nickname: String) {
    editProfile(
      input: { password: $password, email: $email, nickname: $nickname }
    ) {
      access
      errorMessage
      user {
        accountId
        email
        nickname
        role
        createAt
        updateAt
      }
    }
  }
`

export const CREATE_STORE = gql`
  mutation createStore(
    $name: String!
    $address: String!
    $categoryName: String!
    $coverImage: String
  ) {
    createStore(
      input: {
        name: $name
        address: $address
        categoryName: $categoryName
        coverImage: $coverImage
      }
    ) {
      access
      errorMessage
    }
  }
`
