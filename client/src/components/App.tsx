import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MAIN_VIDEO } from '../common/constatns'
import Header from '../pages/Header'
import Home from '../pages/Home'

const App = () => {
  const [join, setJoin] = useState<boolean>(false)
  const [position, setPosition] = useState<number>(0)

  const onScroll = () => {
    setPosition(window.scrollY)
    console.log(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onJoin = () => {
    setJoin(true)
  }

  const lobby = () => {
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
          <source src={MAIN_VIDEO} type="video/mp4" />
        </video>
      </header>
    )
  }

  const main = () => {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <section>
          <div>HHHHHH</div>
        </section>
      </>
    )
  }

  return (
    <section>
      <Helmet>
        <title>HOME</title>
      </Helmet>
      {join ? main() : lobby()}
    </section>
  )
}

export default App
