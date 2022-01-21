import { gql } from '@apollo/client'

export const STORE_FRAGMENT = gql`
  fragment StoreParts on StoreEntity {
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
`
