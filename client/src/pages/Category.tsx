import React from 'react'
import Empty from '../components/block/empty'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ONE_CATEGORY } from '../graphql/queries/queries'
import { IStore } from '../common/interfaces/entites.interface'
import LoadStores from '../components/store/LoadStores'

const Category = () => {
  const params = useParams()

  const { loading, error, data } = useQuery(GET_ONE_CATEGORY, {
    variables: {
      page: 1,
      name: params.name,
    },
  })

  !loading && !error && data && console.log(data.getOneCategory)

  return (
    <section>
      <Empty />
      <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 px-32">
        {!loading &&
          !error &&
          data &&
          data.getOneCategory.category.stores.map((store: IStore) => {
            return <LoadStores key={store.id} store={store} />
          })}
      </main>
    </section>
  )
}

export default Category
