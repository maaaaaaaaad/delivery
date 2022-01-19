import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Empty from '../components/block/empty'
import { useQuery } from '@apollo/client'
import { GET_ALL_STORES } from '../graphql/queries/queries'
import { GetAllStores } from '../graphql/interfaces/output.interface'
import { IStore } from '../common/interfaces/entites.interface'
import { DEFAULT_STORE_IMAGE, HELMET_TITLE } from '../common/constatns'

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
            return (
              <div key={store.id}>
                <div className="ml-2 font relative">
                  <article
                    style={{
                      backgroundImage: `url(${
                        store.coverImage
                          ? store.coverImage
                          : DEFAULT_STORE_IMAGE
                      })`,
                    }}
                    className="bg-gray-700 bg-cover bg-center mb-3 px-16 py-28 rounded-lg shadow-2xl"
                  />
                  <article className="absolute left-2 top-2">
                    {store.isPromotion && (
                      <>
                        <span className="text-green-500">PROMOTION STORE</span>
                        <span className="ml-2 text-white">
                          {store.promotionPeriod}
                        </span>
                      </>
                    )}
                  </article>
                  <article className="flex items-center">
                    <article
                      className="bg-cover bg-center p-2 rounded-full w-8 h-8"
                      style={{
                        backgroundImage: `url(${store.category.coverImage})`,
                      }}
                    />
                    <article className="ml-2">
                      {store.isPromotion ? (
                        <h3 className="text-xl font-bold text-green-500">
                          {store.name}
                        </h3>
                      ) : (
                        <h3 className="text-xl font-bold">{store.name}</h3>
                      )}
                      <h3>{store.address}</h3>
                    </article>
                  </article>
                </div>
              </div>
            )
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
