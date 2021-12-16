import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <section className="intro text-white">
      <Helmet>
        <title>HOME | DELIVERY</title>
      </Helmet>
      <div className="overlay center flex-col">
        <h1 className="text-5xl font-bold mb-5">
          <span className="text-green-500">DELIVERY</span>
          <span className="text-3xl ml-3">by MAD</span>
        </h1>
        <div>
          <Link to="/">Lorem</Link>
          <Link to="/">Lorem</Link>
        </div>
      </div>
    </section>
  )
}

export default Home
