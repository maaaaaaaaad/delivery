import React from 'react'
import { useReactiveVar } from '@apollo/client'
import LoggedInRouter from './routers/LoggedInRouter'
import LoggedOutRouter from './routers/LoggedOutRouter'
import { isLoggedInVar } from './apollo'

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar)

  return (
    <section className="App">
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </section>
  )
}

export default App
