import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from '../pages/Main'

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default Routers
