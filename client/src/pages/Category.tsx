import React from 'react'
import Empty from '../components/block/empty'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ONE_CATEGORY } from '../graphql/queries/queries'

const Category = () => {
  const params = useParams()

  const { loading, error, data } = useQuery(GET_ONE_CATEGORY, {
    variables: {
      page: 1,
      name: params.name,
    },
  })

  !loading && !error && data && console.log(data.getOneCategory.category)

  return (
    <section>
      <Empty />
      Category
    </section>
  )
}

export default Category
