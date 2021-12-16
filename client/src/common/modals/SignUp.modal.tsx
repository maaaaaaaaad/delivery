import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../interfaces/user.interface'
import SignUpFormError from '../error/SignUpFormError'

interface OnModalProp {
  onOpenSignUpModal: () => void
}

interface SignUpInputForm extends User {
  confirmPassword: string
}

const SignUpModal: React.FC<OnModalProp> = ({ onOpenSignUpModal }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(true)

  const modalClose = (): void => {
    setModalOpen(!modalOpen)
    onOpenSignUpModal()
  }

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputForm>({
    mode: 'onChange',
    defaultValues: { role: 'client' },
  })

  const onSubmit = () => {}

  return (
    <>
      <section className="w-full h-screen z-10 fixed top-0 left-0 center">
        <div className="w-1/2 h-5/6 bg-white rounded-2xl center flex-col">
          <h1 className="font-bold text-green-500 text-4xl">
            DELIVER <span className="text-black text-2xl">SIGN UP</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
            <div className="w-full">
              <div className="mt-5">
                <input
                  {...register('accountId', {
                    required: 'You must specify a account id',
                    pattern: {
                      value: /^[A-za-z0-9]{4,12}$/,
                      message: 'Please insert a valid account id',
                    },
                  })}
                  name="accountId"
                  className="signField"
                  type="text"
                  autoComplete="off"
                  placeholder="Account ID (4~12 char)"
                />
                {errors.accountId && (
                  <SignUpFormError errorMessage={errors.accountId.message!} />
                )}
              </div>
              <div className="mt-5">
                <input
                  {...register('password', {
                    required: 'You must specify a password',
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z]).{8,20}/,
                      message: 'Password must have at least 8~20 characters',
                    },
                  })}
                  className="signField"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Password (8~20 char)"
                />
                {errors.password && (
                  <SignUpFormError errorMessage={errors.password.message!} />
                )}
              </div>
              <div className="mt-5">
                <input
                  {...register('confirmPassword', {
                    validate: (v) =>
                      v === watch('password') || 'The passwords do not match',
                  })}
                  className="signField"
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <SignUpFormError
                    errorMessage={errors.confirmPassword.message!}
                  />
                )}
              </div>
              <div className="mt-5">
                <input
                  {...register('email', {
                    required: 'You must specify a email',
                    pattern: {
                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: 'Please insert a valid email address',
                    },
                  })}
                  className="signField"
                  type="email"
                  autoComplete="off"
                  placeholder="Email (ex: deliver@gmail.com)"
                />
                {errors.email && (
                  <SignUpFormError errorMessage={errors.email.message!} />
                )}
              </div>
              <div className="mt-5">
                <input
                  {...register('nickname', {
                    required: 'You must specify a nickname',
                    pattern: {
                      value: /^[A-za-z0-9]{4,10}$/,
                      message: 'Please insert a valid nickname',
                    },
                  })}
                  className="signField"
                  type="text"
                  autoComplete="off"
                  placeholder="Nickname (4~10 char)"
                />
                {errors.nickname && (
                  <SignUpFormError errorMessage={errors.nickname.message!} />
                )}
              </div>
            </div>

            <div className="flex justify-evenly mt-5">
              <div>
                <input
                  {...register('role')}
                  className="border-2 border-green-500 cursor-pointer"
                  type="radio"
                  name="role"
                  value="client"
                />
                <span className="text-black font-semibold ml-1">Client</span>
              </div>
              <div>
                <input
                  {...register('role')}
                  className="border-2 border-green-500 cursor-pointer"
                  type="radio"
                  name="role"
                  value="owner"
                />
                <span className="text-black font-semibold ml-1">Owner</span>
              </div>
              <div>
                <input
                  {...register('role')}
                  className="border-2 border-green-500 cursor-pointer"
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
                value="SIGN UP"
              />
            </div>
          </form>
          <div className="mt-5">
            <button
              className="px-24 py-2 rounded-lg bg-red-400"
              onClick={modalClose}
            >
              <span className="text-white">CLOSE</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUpModal
