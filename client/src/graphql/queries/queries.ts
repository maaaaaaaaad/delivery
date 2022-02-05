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
      avatarImage
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

export const GET_ONE_CATEGORY = gql`
  ${STORE_FRAGMENT}
  query getOneCategory($page: Float, $name: String!) {
    getOneCategory(input: { page: $page, name: $name }) {
      access
      errorMessage
      totalPages
      resultCount
      category {
        id
        name
        coverImage
        storeCount
        stores {
          ...StoreParts
          category {
            name
            coverImage
          }
        }
      }
    }
  }
`

export const GET_MY_STORES = gql`
  ${STORE_FRAGMENT}
  query getMyStores {
    getMyStores {
      access
      errorMessage
      stores {
        ...StoreParts
        category {
          name
          coverImage
        }
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
        category {
          name
          coverImage
        }
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
