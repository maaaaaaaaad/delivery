import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main'
import NotFoundPage from '../pages/404'
import Profile from '../pages/Profile'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/me/:nickname" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routers
