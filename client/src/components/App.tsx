import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const App = () => {
  const [join, setJoin] = useState<boolean>(false)

  const onJoin = () => {
    setJoin(true)
  }

  const header = () => {
    return (
      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <div className="relative z-30 p-5 text-center">
          <h1 className="text-5xl text-white">Welcome to my website</h1>
          <button
            onClick={onJoin}
            className="bg-blue-900 rounded-xl text-white p-5 bg-opacity-40 text-3xl mt-6 border-2 border-white hover:bg-opacity-100"
          >
            Click to join!
          </button>
        </div>
        <video
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          autoPlay
          muted
          loop
        >
          <source src="assets/videos/main.mp4" type="video/mp4" />
        </video>
      </header>
    )
  }

  const main = () => {
    return <main>Main!</main>
  }

  return (
    <section>
      <Helmet>
        <title>HOME</title>
      </Helmet>
      {join ? main() : header()}
    </section>
  )
}

export default App
