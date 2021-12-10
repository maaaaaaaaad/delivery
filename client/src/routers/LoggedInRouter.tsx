import React from 'react'
import { isLoggedInVar } from '../apollo'

const LoggedInRouter = () => {
  const onClick = () => {
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
