import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_STORES } from '../../../graphql/queries/queries'
import { GetMyStores } from '../../../graphql/interfaces/output.interface'
import LoadStores from '../../../components/store/LoadStores'
import { IStore } from '../../../common/interfaces/entites.interface'

const Owner = () => {
  const { loading, error, data } = useQuery<GetMyStores>(GET_MY_STORES)

  return (
    <section>
      <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 px-32">
        {!loading &&
          !error &&
          data &&
          data.getMyStores.stores.map((store: IStore) => {
            return <LoadStores key={store.id} store={store} />
          })}
      </main>
    </section>
  )
}

export default Owner
