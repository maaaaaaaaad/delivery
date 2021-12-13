import React from 'react'
import { isLoggedInVar } from '../apollo'
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/users/token.constant'

const LoggedInRouter = () => {
  const onClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
    isLoggedInVar(false)
  }

  return (
    <section>
      <h1>LoggedInRouter!</h1>
      <button onClick={onClick}>click!</button>
    </section>
  )
}

export default LoggedInRouter
