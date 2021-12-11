import React from 'react'
import { useReactiveVar } from '@apollo/client'
import LoggedInRouter from './routers/LoggedInRouter'
import LoggedOutRouter from './routers/LoggedOutRouter'
import { isLoggedInVar } from './apollo'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar)

  return (
    <section className="App">
      <BrowserRouter>
        {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
      </BrowserRouter>
    </section>
  )
}

export default App
