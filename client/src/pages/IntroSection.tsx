import React, { useState } from 'react'
import JoinModal from '../modals/Join.modal'
import { isLoggedInVar, me } from '../apollo'
import { Link } from 'react-router-dom'

const IntroSection = () => {
  const [onModal, setOnModal] = useState<boolean>(false)

  const onOpenSignModal = () => {
    setOnModal((onModal) => !onModal)
  }

  return (
    <section className="intro text-white w-full h-screen snap-start">
      {onModal && <JoinModal onOpenSignModal={onOpenSignModal} />}
      <div className="overlay center">
        <div className="center flex-col">
          <div className="text-5xl font-bold mb-5">
            <span className="text-green-500 font">DELIVERY</span>
            <span className="text-3xl ml-3">by MAD</span>
          </div>

          <div>
            {isLoggedInVar() && me() ? (
              <div>
                <Link
                  to={`me/${me()!.nickname}`}
                  className="text-2xl text-blue-200 underline"
                >
                  {me()!.nickname}
                </Link>
              </div>
            ) : (
              <button onClick={onOpenSignModal} className="utilBtn">
                JOIN
              </button>
            )}
          </div>
        </div>

        <div>
          <img
            src="https://pomokata.com/wp-content/uploads/2019/07/pomodoro-delivery-logo.png"
            alt="delivery-guy"
          />
        </div>
      </div>
    </section>
  )
}

export default IntroSection
