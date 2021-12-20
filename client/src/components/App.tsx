import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { MAIN_VIDEO } from '../common/constatns'
import Header from '../pages/Header'
import IntroSection from '../pages/IntroSection'
import SecondSection from '../pages/SecondSection'
import FooterSection from '../pages/FooterSection'
import { useQuery } from '@apollo/client'
import { USER_STATE_GET_NICKNAME } from '../graphql/mutations/user.queries'
import FormLoading from './loading/formLoading'

const App = () => {
  const [join, setJoin] = useState<boolean>(false)
  const { data, loading, error } = useQuery(USER_STATE_GET_NICKNAME)

  const onJoin = () => {
    setJoin(!join)
  }

  const lobby = () => {
    return (
      <header className="relative flex items-center justify-center h-screen overflow-hidden">
        <Helmet>
          <title>HOME</title>
        </Helmet>
        <div className="relative z-30 p-5 text-center">
          <h1 className="text-5xl text-white">
            Welcome to
            <span className="text-green-500 font-bold font">DELIVERY</span>
          </h1>
          <button
            onClick={onJoin}
            className="bg-green-500 rounded-xl text-white p-5 bg-opacity-40 text-3xl mt-6 border-2 border-white hover:bg-opacity-100"
          >
            Getting Start
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
        <Header onJoin={onJoin} />
        {!loading ? (
          <FormLoading
            title={'Checking User'}
            description={'find user from server'}
            message={'please wait'}
          />
        ) : (
          <section className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
            <IntroSection />
            <SecondSection />
            <FooterSection />
          </section>
        )}
      </BrowserRouter>
    )
  }

  return <section>{join ? main() : lobby()}</section>
}

export default App
