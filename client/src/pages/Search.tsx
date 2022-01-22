import React, { useEffect } from 'react'
import Empty from '../components/block/empty'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_SEARCH_STORES } from '../graphql/queries/queries'
import { IStore } from '../common/interfaces/entites.interface'
import LoadStores from '../components/store/LoadStores'

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [getSearchResult, { loading, error, data }] =
    useLazyQuery(GET_SEARCH_STORES)

  useEffect(() => {
    const [_, query] = location.search.split('?query=')

    if (!query) {
      return navigate('/', {
        replace: true,
      })
    }

    getSearchResult({
      variables: {
        page: 1,
        keyword: query,
      },
    }).then()
  }, [navigate, location])

  return (
    <section className="p-5">
      <Helmet>
        <title>Search | {HELMET_TITLE}</title>
      </Helmet>
      <Empty />
      <main className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10 px-32">
        {!loading &&
          !error &&
          data &&
          data.searchStore.stores.map((store: IStore) => {
            return <LoadStores key={store.id} store={store} />
          })}
      </main>
    </section>
  )
}

export default Search
