import React from 'react'
import { Link, useParams } from 'react-router-dom'

const NotFoundPage = () => {
  const params = useParams()

  return (
    <section className="center flex-col h-screen">
      <p className="text-4xl font-bold tracking-widest text-green-500">
        Not found page
      </p>
      <p className="p-5">{`.../${params['*']}`}</p>
      <Link to="/" className="font-semibold underline">
        Go to home
      </Link>
    </section>
  )
}

export default NotFoundPage
