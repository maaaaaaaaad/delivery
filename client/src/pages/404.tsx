import React from 'react'
import { useParams } from 'react-router-dom'

const NotFound = () => {
  const params = useParams()

  return (
    <div>
      <h1>Not Found {params['*']} page</h1>
    </div>
  )
}

export default NotFound
