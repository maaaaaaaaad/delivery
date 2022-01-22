import React from 'react'
import { DEFAULT_STORE_IMAGE } from '../../common/constatns'
import { IStore } from '../../common/interfaces/entites.interface'
import { useNavigate } from 'react-router-dom'

interface Prop {
  store: IStore
}

const LoadStores: React.FC<Prop> = ({ store }) => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(
      {
        pathname: '/store',
        search: `?detail=${store.name}`,
      },
      {
        state: {
          store,
        },
      },
    )
  }

  return (
    <div key={store.id}>
      <div className="ml-2 font relative">
        <article
          onClick={onClick}
          style={{
            backgroundImage: `url(${
              store.coverImage ? store.coverImage : DEFAULT_STORE_IMAGE
            })`,
          }}
          className="bg-gray-700 bg-cover bg-center mb-3 px-16 py-28 rounded-lg shadow-2xl cursor-pointer"
        />
        <article className="absolute left-2 top-2">
          {store.isPromotion && (
            <>
              <span className="text-green-500">PROMOTION STORE</span>
              <span className="ml-2 text-white">{store.promotionPeriod}</span>
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
              <h3 className="text-xl font-bold text-green-500">{store.name}</h3>
            ) : (
              <h3 className="text-xl font-bold">{store.name}</h3>
            )}
            <h3>{store.address}</h3>
          </article>
        </article>
      </div>
    </div>
  )
}

export default LoadStores
