import React from 'react'
import { Helmet } from 'react-helmet-async'
import Empty from '../components/block/empty'
import { useQuery } from '@apollo/client'
import { GET_ALL_STORES } from '../graphql/queries/queries'
import { GetAllStores } from '../graphql/interfaces/output.interface'
import { IStore } from '../common/interfaces/entites.interface'

const Stores = () => {
  const { data, loading, error } = useQuery<GetAllStores>(GET_ALL_STORES, {
    variables: {
      input: {
        page: 1,
      },
    },
  })

  return (
    <section className="p-5">
      <Helmet>
        <title>STORES | DELIVERY</title>
      </Helmet>
      <Empty />
      <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
        {!loading &&
          !error &&
          data &&
          data.getAllStore.stores.map((store: IStore) => {
            return (
              <div key={store.id}>
                <div className="ml-2 font relative">
                  <article
                    style={{ backgroundImage: `url(${store.coverImage})` }}
                    className="bg-red-500 bg-cover bg-center mb-3 px-16 py-28 rounded-lg shadow-2xl"
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
                      <h3 className="text-xl font-bold">{store.name}</h3>
                      <h3>{store.address}</h3>
                    </article>
                  </article>
                </div>
              </div>
            )
          })}
      </main>
    </section>
  )
}
export default Stores
