import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HELMET_TITLE } from '../common/constatns'

const NotFoundPage = () => {
  const params = useParams()

  return (
    <section className="center flex-col h-screen bg-black">
      <Helmet>
        <title>
          {params['*']} | {HELMET_TITLE}
        </title>
      </Helmet>
      <p className="text-4xl font-bold tracking-widest text-green-500">
        Not found page
      </p>
      <p className="p-5 text-white">{`.../${params['*']}`}</p>
      <Link to="/" className="font-semibold underline text-white">
        Go to home
      </Link>
    </section>
  )
}

export default NotFoundPage
