import React, { useState } from 'react'
import SignUpModal from '../common/modals/SignUp.modal'

const IntroSection = () => {
  const [onModal, setOnModal] = useState<boolean>(false)

  const onOpenSignUpModal = () => {
    setOnModal(!onModal)
  }

  return (
    <section className="intro text-white w-full h-screen snap-start">
      {onModal && <SignUpModal onOpenSignUpModal={onOpenSignUpModal} />}
      <div className="overlay center flex-col">
        <h1 className="text-5xl font-bold mb-5">
          <span className="text-green-500 font">DELIVERY</span>
          <span className="text-3xl ml-3">by MAD</span>
        </h1>
        <div>
          <button onClick={onOpenSignUpModal} className="utilBtn">
            SIGN UP
          </button>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
