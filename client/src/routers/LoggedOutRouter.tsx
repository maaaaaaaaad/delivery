import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const LoggedOutRouter = () => {
  return (
    <section>
      <Routes>
        <Route path="create-account" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </section>
  )
}

export default LoggedOutRouter
