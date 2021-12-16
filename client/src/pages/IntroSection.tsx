import React from 'react'
import { Link } from 'react-router-dom'

const IntroSection = () => {
  return (
    <section className="intro text-white w-full h-screen snap-start">
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

export default IntroSection
