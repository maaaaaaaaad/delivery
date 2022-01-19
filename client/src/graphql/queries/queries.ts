import { gql } from '@apollo/client'

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
  query getAllStores($page: Float) {
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
        promotionPeriod
        category {
          name
          coverImage
        }
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
