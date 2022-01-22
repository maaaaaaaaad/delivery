import React, { useEffect } from 'react'
import Empty from '../components/block/empty'
import { useParams } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_ONE_CATEGORY } from '../graphql/queries/queries'

const Category = () => {
  const params = useParams()

  const [getOneCategory, { loading, data, error, called }] =
    useLazyQuery(GET_ONE_CATEGORY)

  useEffect(() => {
    const categoryParams = params.name

    if (!categoryParams) {
      return
    }

    getOneCategory({
      variables: {
        page: 1,
        name: categoryParams,
      },
    }).then((res) => console.log(res.data.getOneCategory.category))
  }, [])

  return (
    <section>
      <Empty />
      Category
    </section>
  )
}

export default Category
