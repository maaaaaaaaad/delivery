import React, { useState } from 'react'

interface OnModalProp {
  onOpenSignUpModal: () => void
}

const SignUpModal: React.FC<OnModalProp> = ({ onOpenSignUpModal }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(true)

  const modalClose = (): void => {
    setModalOpen(!modalOpen)
    onOpenSignUpModal()
  }

  return (
    <>
      <section className="w-full h-screen z-10 fixed top-0 left-0 center">
        <div className="w-1/2 h-1/2 bg-white rounded-2xl center flex-col">
          <h1 className="font-bold text-green-500 text-4xl">
            DELIVER <span className="text-black text-2xl">SIGN UP</span>
          </h1>
          <form className="w-1/2">
            <div className="w-full">
              <div className="mt-5">
                <input
                  className="signField"
                  type="text"
                  autoComplete="off"
                  placeholder="Account ID (4~12 char)"
                />
              </div>
              <div className="mt-5">
                <input
                  className="signField"
                  type="password"
                  autoComplete="off"
                  placeholder="Password (8~20 char)"
                />
              </div>
              <div className="mt-5">
                <input
                  className="signField"
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm password"
                />
              </div>
              <div className="mt-5">
                <input
                  className="signField"
                  type="email"
                  autoComplete="off"
                  placeholder="Email (ex: deliver@gmail.com)"
                />
              </div>
              <div className="mt-5">
                <input
                  className="signField"
                  type="text"
                  autoComplete="off"
                  placeholder="Nickname (4~8 char)"
                />
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div>
                <input
                  className="border-2 border-green-500"
                  type="radio"
                  name="role"
                  value="client"
                />
                <span className="text-black font-semibold ml-1">Client</span>
              </div>
              <div>
                <input
                  className="border-2 border-green-500"
                  type="radio"
                  name="role"
                  value="owner"
                />
                <span className="text-black font-semibold ml-1">Owner</span>
              </div>
              <div>
                <input
                  className="border-2 border-green-500"
                  type="radio"
                  name="role"
                  value="driver"
                />
                <span className="text-black font-semibold ml-1">Driver</span>
              </div>
            </div>

            <div className="center mt-5">
              <input
                className="bg-green-500 text-white px-24 py-2 cursor-pointer rounded-lg"
                type="submit"
                value="SIGNUP"
              />
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg absolute top-40">
          <button className="px-5 py-3" onClick={modalClose}>
            <span className="text-green-500 font-bold text-xl">X</span>
          </button>
        </div>
      </section>
    </>
  )
}

export default SignUpModal
