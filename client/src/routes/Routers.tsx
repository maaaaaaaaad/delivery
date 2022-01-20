import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main'
import NotFoundPage from '../pages/404'
import Profile from '../pages/Profile'
import Stores from '../pages/Stores'
import Search from '../pages/Search'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/me/:nickname" element={<Profile />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routers
