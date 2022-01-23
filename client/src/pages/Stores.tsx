import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Empty from '../components/block/empty'
import { useQuery } from '@apollo/client'
import { GET_ALL_STORES } from '../graphql/queries/queries'
import { GetAllStores } from '../graphql/interfaces/output.interface'
import { IStore } from '../common/interfaces/entites.interface'
import { HELMET_TITLE } from '../common/constatns'
import LoadStores from '../components/store/LoadStores'

const Stores = () => {
  const [page, setPage] = useState<number>(1)

  const { data, loading, error } = useQuery<GetAllStores>(GET_ALL_STORES, {
    variables: {
      page,
    },
  })

  const onNextPage = () => setPage((page) => page + 1)
  const onPrevPage = () => setPage((page) => page - 1)

  return (
    <section className="p-5">
      <Helmet>
        <title>STORES | {HELMET_TITLE}</title>
      </Helmet>
      <Empty />
      <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 px-32">
        {!loading &&
          !error &&
          data &&
          data.getAllStore.stores.map((store: IStore) => {
            return <LoadStores key={store.id} store={store} />
          })}
      </main>
      <div className="w-full text-center m-12">
        {page !== data?.getAllStore.totalPages ? (
          <button
            onClick={onNextPage}
            className="bg-green-500 px-5 py-2 rounded-lg"
          >
            <span className="text-white font-semibold">NEXT</span>
          </button>
        ) : (
          <div />
        )}

        {page > 1 ? (
          <button
            onClick={onPrevPage}
            className="bg-green-500 px-5 py-2 rounded-lg"
          >
            <span className="text-white font-semibold">PREV</span>
          </button>
        ) : (
          <div />
        )}

        <div>
          <h3 className="font-semibold p-2">
            {page} of {data?.getAllStore.totalPages}
          </h3>
        </div>
      </div>
    </section>
  )
}
export default Stores
