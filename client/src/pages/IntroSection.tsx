import React, { useState } from 'react'
import JoinModal from '../modals/Join.modal'
import { isLoggedInVar, me } from '../apollo'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES_STORES } from '../graphql/mutations/user.queries'
import StoresSlider from '../components/slider/stores.slider'
import { IStore } from '../common/interfaces/entites.interface'

const IntroSection = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES_STORES, {
    variables: {
      input: { page: 1 },
    },
  })

  const [onModal, setOnModal] = useState<boolean>(false)

  const onOpenSignModal = () => {
    setOnModal((onModal) => !onModal)
  }

  return (
    <section className="intro text-white w-full h-screen snap-start">
      {onModal && <JoinModal onOpenSignModal={onOpenSignModal} />}
      <div className="overlay center flex-col">
        <div>
          {!loading && !error && data && (
            <section className="center">
              {data.getAllStore.stores.map((store: IStore) => (
                <StoresSlider key={store.id} store={store} />
              ))}
            </section>
          )}
        </div>
        <h1 className="text-5xl font-bold mb-5">
          <span className="text-green-500 font">DELIVERY</span>
          <span className="text-3xl ml-3">by MAD</span>
        </h1>
        <div>
          {isLoggedInVar() && me() ? (
            <div>
              <Link
                to={`me/${me()!.nickname}`}
                className="text-2xl text-blue-200 underline"
              >
                {me()!.nickname}
              </Link>
            </div>
          ) : (
            <button onClick={onOpenSignModal} className="utilBtn">
              JOIN
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
