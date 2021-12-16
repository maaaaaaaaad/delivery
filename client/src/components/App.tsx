import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { MAIN_VIDEO } from '../common/constatns'
import Header from '../pages/Header'
import IntroSection from '../pages/IntroSection'
import SecondSection from '../pages/SecondSection'
import FooterSection from '../pages/FooterSection'

const App = () => {
  const [join, setJoin] = useState<boolean>(false)

  const onJoin = () => {
    setJoin(true)
  }

  const lobby = () => {
    return (
      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <Helmet>
          <title>HOME</title>
        </Helmet>
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
          <source src={MAIN_VIDEO} type="video/mp4" />
        </video>
      </header>
    )
  }

  const main = () => {
    return (
      <BrowserRouter>
        <Helmet>
          <title>HOME | DELIVERY</title>
        </Helmet>
        <Header />
        <section className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
          <IntroSection />
          <SecondSection />
          <FooterSection />
        </section>
      </BrowserRouter>
    )
  }

  return <section>{join ? main() : lobby()}</section>
}

export default App