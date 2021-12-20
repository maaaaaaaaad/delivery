import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import Header from '../pages/Header'
import { useQuery } from '@apollo/client'
import { USER_STATE } from '../graphql/mutations/user.queries'
import FormLoading from './loading/formLoading'
import Routers from '../routes/Routers'
import { isLoggedInVar, me } from '../apollo'

const App = () => {
  const { data, loading, error } = useQuery(USER_STATE)

  if (isLoggedInVar() && !loading) {
    me(data.userState)
  }

  return (
    <BrowserRouter>
      <Helmet>
        <title>HOME | DELIVERY</title>
      </Helmet>
      <Header />
      {loading ? (
        <FormLoading
          title={'Checking User'}
          description={'find user from server'}
          message={'please wait'}
        />
      ) : (
        <Routers />
      )}
    </BrowserRouter>
  )
}

export default App
