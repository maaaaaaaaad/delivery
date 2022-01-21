import React, { useEffect } from 'react'
import Empty from '../components/block/empty'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const [_, query] = window.location.search.split('?query=')
    if (!query) {
      navigate('/', {
        replace: true,
      })
    }
  }, [])

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
