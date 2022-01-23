import React from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_STORE_IMAGE, HELMET_TITLE } from '../common/constatns'
import { IStore } from '../common/interfaces/entites.interface'
import { Helmet } from 'react-helmet-async'

const StoreDetail = () => {
  const location = useLocation()
  const store: IStore = location.state.store

  return (
    <section>
      <Helmet>
        <title>
          {store.name} | {HELMET_TITLE}
        </title>
      </Helmet>
      <main className="font">
        <article
          style={{
            backgroundImage: `url(${store.coverImage ?? DEFAULT_STORE_IMAGE})`,
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

        <div className="p-24 md:grid grid-cols-2 gap-x-5 gap-y-10">
          {store.menu.map((food, index) => (
            <div key={index}>
              <article
                style={{
                  backgroundImage: `url(${
                    food.image !== 'No img' ? food.image : DEFAULT_STORE_IMAGE
                  })`,
                }}
                className="hover:text-green-500 bg-center bg-cover px-12 py-28
                rounded-lg text-white text-shadow-md cursor-pointer h-full"
              >
                <h1 className="text-3xl">{food.name}</h1>
                <h3 className="text-lg">
                  {food.description.length > 40
                    ? food.description.slice(0, 40) + ' ...'
                    : food.description.slice(0, 40)}
                </h3>
                <h3 className="text-lg">Price: {food.price}</h3>
                {food.options && (
                  <h3 className="text-lg">
                    Option count: {food.options?.length}
                  </h3>
                )}
              </article>
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}

export default StoreDetail
