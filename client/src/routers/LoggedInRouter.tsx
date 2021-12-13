import React from 'react'
import { isLoggedInVar } from '../apollo'
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/users/token.constant'
import { Helmet } from 'react-helmet-async'

const LoggedInRouter = () => {
  const onClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
    isLoggedInVar(false)
  }

  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>LoggedInRouter!</h1>
      <button onClick={onClick}>click!</button>
    </section>
  )
}

export default LoggedInRouter
