import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main'
import NotFoundPage from '../pages/404'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Routers
