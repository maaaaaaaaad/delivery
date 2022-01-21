import React from 'react'
import Empty from '../components/block/empty'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'

const Search = () => {
  const [_, query] = window.location.search.split('?query=')
  const getQuery = query.replace(/%20/g, ' ')

  console.log()
  return (
    <section>
      <Helmet>
        <title>
          {getQuery} | {HELMET_TITLE}
        </title>
      </Helmet>
      <Empty />
      Search {getQuery}
    </section>
  )
}

export default Search
