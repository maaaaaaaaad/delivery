import React from 'react'
import Empty from '../components/block/empty'

const Search = () => {
  const [_, query] = window.location.search.split('?value=')

  console.log(query)
  return (
    <section>
      <Empty />
      Search {query}
    </section>
  )
}

export default Search
