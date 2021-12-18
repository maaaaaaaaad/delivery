import React, { useState } from 'react'
import SignUpModal from './SignUp.modal'
import SignInModal from './SignIn.modal'

interface OnModalProp {
  onOpenSignUpModal: () => void
}

const JoinModal: React.FC<OnModalProp> = ({ onOpenSignUpModal }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(true)
  const [changeForm, setChangeForm] = useState<boolean>(false)

  const modalClose = (): void => {
    setModalOpen(!modalOpen)
    onOpenSignUpModal()
  }

  const onChangeForm = (): void => {
    setChangeForm(!changeForm)
  }

  return (
    <>
      <section className="w-full h-screen z-10 fixed top-0 left-0 center">
        <div className="w-1/2 h-5/6 bg-white rounded-2xl center flex-col">
          {changeForm ? (
            <SignUpModal onChangeForm={onChangeForm} />
          ) : (
            <SignInModal />
          )}
          <div className="mt-5">
            <button
              className="w-52 py-2 rounded-lg bg-red-400"
              onClick={modalClose}
            >
              <span className="text-white">CLOSE</span>
            </button>
          </div>
          <div className="text-black mt-5">
            <button
              className={
                changeForm
                  ? 'font-bold underline text-blue-800 text-sm'
                  : 'font-bold underline text-blue-800 text-sm'
              }
              onClick={onChangeForm}
            >
              {changeForm ? 'GO SIGN IN' : 'GO SIGN UP'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default JoinModal
