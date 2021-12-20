import React, { useState } from 'react'
import JoinModal from '../common/modals/Join.modal'
import { isLoggedInVar } from '../apollo'

interface NicknameProp {
  nickname: string
}

const IntroSection: React.FC<NicknameProp> = ({ nickname }) => {
  const [onModal, setOnModal] = useState<boolean>(false)

  const onOpenSignModal = () => {
    setOnModal(!onModal)
  }

  return (
    <section className="intro text-white w-full h-screen snap-start">
      {onModal && <JoinModal onOpenSignModal={onOpenSignModal} />}
      <div className="overlay center flex-col">
        <h1 className="text-5xl font-bold mb-5">
          <span className="text-green-500 font">DELIVERY</span>
          <span className="text-3xl ml-3">by MAD</span>
        </h1>
        <div>
          {isLoggedInVar() ? (
            <div>Hello {nickname}</div>
          ) : (
            <button onClick={onOpenSignModal} className="utilBtn">
              JOIN
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default IntroSection
