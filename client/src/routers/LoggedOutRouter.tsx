import React from 'react'
import { isLoggedInVar } from '../apollo'

const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true)
  }

  return (
    <section>
      <h1>LoggedOutRouter!</h1>
      <button onClick={onClick}>click!</button>
    </section>
  )
}

export default LoggedOutRouter
