import React from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_STORE_IMAGE } from '../common/constatns'
import { IStore } from '../common/interfaces/entites.interface'

const StoreDetail = () => {
  const location = useLocation()
  const store: IStore = location.state.store

  return (
    <section>
      <main className="font">
        <article
          style={{
            backgroundImage: `url(${
              store.coverImage ? store.coverImage : DEFAULT_STORE_IMAGE
            })`,
          }}
          className="bg-gray-700 bg-cover bg-center px-16 py-72"
        />

        <div className="flex items-center w-screen center py-8 shadow-2xl">
          <article
            className="bg-cover bg-center p-2 rounded-full w-24 h-24"
            style={{
              backgroundImage: `url(${store.category.coverImage})`,
            }}
          />

          <article className="title ml-4">
            {store.isPromotion ? (
              <h3 className="font-bold text-green-500 text-4xl">
                {store.name}
              </h3>
            ) : (
              <h3 className="font-bold text-4xl">{store.name}</h3>
            )}
            <h3 className="text-xl">{store.address}</h3>
          </article>
        </div>

        <div className="p-24 grid grid-cols-2 gap-x-5 gap-y-10">
          {store.menu.map((food, index) => (
            <div key={index}>
              <article
                style={{ backgroundImage: `url(${DEFAULT_STORE_IMAGE})` }}
                className="bg-center bg-cover"
              />
              <h1>{food.name}</h1>
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}

export default StoreDetail
