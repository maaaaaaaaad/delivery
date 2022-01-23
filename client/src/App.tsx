import React from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import Header from './pages/Header'
import { useQuery } from '@apollo/client'
import { USER_STATE } from './graphql/queries/queries'
import Routers from './routes/Routers'
import { isLoggedInVar, me } from './apollo'
import { UserStateOutput } from './graphql/interfaces/output.interface'
import { HELMET_TITLE } from './common/constatns'

const App = () => {
  const { data, loading } = useQuery<UserStateOutput>(USER_STATE)

  if (isLoggedInVar() && !loading && data) {
    me(data.userState)
  }

  return (
    <BrowserRouter>
      <Helmet>
        <title>HOME | {HELMET_TITLE}</title>
      </Helmet>
      <Header />
      <Routers />
    </BrowserRouter>
  )
}

export default App
