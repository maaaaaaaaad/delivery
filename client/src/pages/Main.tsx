import React from 'react'
import IntroSection from './IntroSection'
import SecondSection from './SecondSection'
import FooterSection from './FooterSection'

const Main = () => {
  return (
    <section className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
      <IntroSection />
      <SecondSection />
      <FooterSection />
    </section>
  )
}

export default Main
