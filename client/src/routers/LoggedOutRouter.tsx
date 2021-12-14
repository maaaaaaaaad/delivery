import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import NotFound from '../pages/404'

const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default LoggedOutRouter
