import { gql } from '@apollo/client'
import { STORE_FRAGMENT } from '../fragments'

export const USER_STATE = gql`
  query userState {
    userState {
      accountId
      email
      role
      createAt
      updateAt
      nickname
    }
  }
`

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      access
      errorMessage
      categories {
        id

        name
        coverImage
        storeCount
      }
    }
  }
`

export const GET_ALL_STORES = gql`
  ${STORE_FRAGMENT}
  query getAllStores($page: Float) {
    getAllStore(input: { page: $page }) {
      access
      errorMessage
      totalPages
      resultCount
      stores {
        ...StoreParts
      }
    }
  }
`

export const GET_SEARCH_STORES = gql`
  ${STORE_FRAGMENT}
  query getSearchStores($page: Float, $keyword: String!) {
    searchStore(input: { page: $page, keyword: $keyword }) {
      access
      errorMessage
      totalPages
      resultCount
      stores {
        ...StoreParts
      }
    }
  }
`

export const GET_ALL_CATEGORIES_STORES = gql`
  query getAllCategoriesAndStores($page: Float) {
    getAllCategories {
      access
      errorMessage
      categories {
        id
        name
        coverImage
        storeCount
      }
    }
    getAllStore(input: { page: $page }) {
      access
      errorMessage
      totalPages
      resultCount
      stores {
        id
        name
        address
        coverImage
        isPromotion
        category {
          name
        }
      }
    }
  }
`
