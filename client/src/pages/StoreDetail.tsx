import React from 'react'
import { useLocation } from 'react-router-dom'

const StoreDetail = () => {
  const location = useLocation()
  console.log(location.state.store)

  return <section></section>
}

export default StoreDetail
