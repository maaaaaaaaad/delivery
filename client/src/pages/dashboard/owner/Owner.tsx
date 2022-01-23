import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_STORES } from '../../../graphql/queries/queries'
import { GetMyStores } from '../../../graphql/interfaces/output.interface'
import LoadStores from '../../../components/store/LoadStores'
import { IStore } from '../../../common/interfaces/entites.interface'
import { me } from '../../../apollo'
import { Helmet } from 'react-helmet-async'
import defaultAvatar from '../../../images/defaultImg.png'
import Avatar from '../../../components/images/avatar'
import Empty from '../../../components/block/empty'

const Owner = () => {
  const user = me()

  const { loading, error, data } = useQuery<GetMyStores>(GET_MY_STORES)

  const [modal, setModal] = useState<boolean>(false)

  const onClickAddStore = () => {
    setModal((modal) => !modal)
  }

  return (
    <section className={`${modal && 'h-screen overflow-hidden'}`}>
      <Helmet>
        <title>{user.nickname} | STORES</title>
      </Helmet>

      <div>
        {modal && (
          <section className="absolute top-0 left-0 w-screen h-screen center bg-black bg-opacity-60 z-50">
            <div className="h-1/2 w-1/2 bg-white rounded-2xl center">
              <div className="w-full h-full">
                <article>CREATE NEW STORE</article>
                <form>
                  <input type="text" placeholder="Store name" />
                </form>
              </div>
            </div>
          </section>
        )}
        <Empty />
        <header className="w-full px-5 py-28 shadow-2xl center bg-gray-700">
          <div className="pb-5 center">
            <Avatar image={defaultAvatar} title={'default-avatar-image'} />

            <div>
              <article className="text-4xl font-bold mb-5">
                <span className="text-green-500">{user!.role}</span>
                <span className="ml-5 tracking-wide text-white">
                  {user!.nickname}
                </span>
              </article>

              <article className="text-2xl font-semibold">
                <span className="text-green-500">my stores</span>
                <span className="ml-5 tracking-wide text-white">
                  {data?.getMyStores?.stores.length}
                </span>
              </article>

              <article className="text-2xl font-semibold">
                <button onClick={onClickAddStore} className="utilBtn">
                  ADD STORE
                </button>
              </article>
            </div>
          </div>
        </header>
        <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 px-32">
          {!loading &&
            !error &&
            data &&
            data.getMyStores.stores.map((store: IStore) => {
              return <LoadStores key={store.id} store={store} />
            })}
        </main>
      </div>
    </section>
  )
}

export default Owner
