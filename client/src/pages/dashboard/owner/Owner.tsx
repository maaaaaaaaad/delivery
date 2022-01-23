import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_STORES } from '../../../graphql/queries/queries'
import { GetMyStores } from '../../../graphql/interfaces/output.interface'
import LoadStores from '../../../components/store/LoadStores'
import { IStore } from '../../../common/interfaces/entites.interface'
import { me } from '../../../apollo'
import { Helmet } from 'react-helmet-async'
import defaultAvatar from '../../../images/defaultImg.png'
import Avatar from '../../../components/images/avatar'

const Owner = () => {
  const user = me()

  const { loading, error, data } = useQuery<GetMyStores>(GET_MY_STORES)

  return (
    <section>
      <Helmet>
        <title>{user.nickname} | STORES</title>
      </Helmet>
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
    </section>
  )
}

export default Owner
