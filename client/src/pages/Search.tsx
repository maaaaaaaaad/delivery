import React, { useEffect } from 'react'
import Empty from '../components/block/empty'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_SEARCH_STORES } from '../graphql/queries/queries'

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [getSearchResult, { loading, error, called, data }] =
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
    }).then((res) => console.log(res))
  }, [navigate, location])

  return (
    <section className="p-5">
      <Helmet>
        <title>Search | {HELMET_TITLE}</title>
      </Helmet>
      <Empty />
      <main>

      </main>
    </section>
  )
}

export default Search
