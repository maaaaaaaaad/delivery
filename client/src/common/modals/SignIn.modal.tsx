import React from 'react'
import SignUpFormError from '../error/SignUpFormError'
import { useForm } from 'react-hook-form'
import { User } from '../interfaces/user.interface'

interface SignInInputForm extends Pick<User, 'accountId' | 'password'> {}

const SignInModal = () => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputForm>({
    mode: 'onChange',
  })

  const onSignIn = () => {}

  return (
    <>
      <h1 className="font-bold text-green-500 text-4xl">
        DELIVER <span className="text-black text-2xl">SIGN IN</span>
      </h1>
      <form onSubmit={handleSubmit(onSignIn)} className="w-1/2">
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
        </div>

        <div className="center mt-5">
          <input className="signBtn" type="submit" value="SIGN IN" />
        </div>
      </form>
    </>
  )
}

export default SignInModal
