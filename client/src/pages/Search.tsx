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

  const [getSearchResult, { loading, error, called }] =
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
    }).then((res) => console.log(res.data.searchStore.stores))
  }, [navigate, location])

  console.log(loading, error, called)

  return (
    <section>
      <Helmet>
        <title>Search | {HELMET_TITLE}</title>
      </Helmet>
      <Empty />
    </section>
  )
}

export default Search
