import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import NotFound from '../pages/404'

const LoggedOutRouter = () => {
  return (
    <section>
      <Routes>
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default LoggedOutRouter
