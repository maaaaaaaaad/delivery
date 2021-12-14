import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@apollo/client'
import { GET_USER_SELF } from '../graphQl/query.gql'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../pages/Header'
import Markets from '../pages/client/Markets'
import NotFound from '../pages/404'

const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(GET_USER_SELF)

  if (!data || loading || error) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  const {
    userState: { nickname, role },
  } = data

  const clientRoutes = <Route path="/" element={<Markets />} />

  return (
    <BrowserRouter>
      <Helmet>
        <title>Home | {nickname}</title>
      </Helmet>
      <Header />
      <Routes>
        {role === 'client' && clientRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LoggedInRouter
