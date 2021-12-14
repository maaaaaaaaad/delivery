import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FormError from '../components/error/FormError'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { USER_LOGIN } from '../graphQl/mutations.gql'
import { SignInFormInput } from '../interfaces/users/sign-in.interface'
import { LoginMutationResult } from '../graphQl/types/users/sign-in.type'
import { LOCALSTORAGE_TOKEN_KEY } from '../constants/users/token.constant'
import { isLoggedInVar } from '../apollo'

const SignIn = () => {
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>({
    mode: 'onChange',
  })

  const [login] = useMutation(USER_LOGIN, {
    onCompleted: (data: LoginMutationResult) => {
      const {
        loginAccount: { access, access_token, errorMessage },
      } = data
      if (access && access_token) {
        localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, access_token)
        isLoggedInVar(true)
      }
      setError(errorMessage)
    },
    onError: (e: Error) => {
      console.log(e.message)
    },
  })

  const onSubmit = async ({ accountId, password }: SignInFormInput) => {
    await login({
      variables: {
        accountId,
        password,
      },
    })
  }

  return (
    <section>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1>User Sign In!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('accountId', { required: 'Account is required' })}
            id="accountId"
            type="text"
            name="accountId"
            placeholder="account id"
            autoComplete="off"
          />
          {errors.accountId?.message && (
            <FormError errorMessage={errors.accountId.message} />
          )}
        </div>
        <div>
          <input
            {...register('password', { required: 'Password is required' })}
            id="password"
            type="password"
            name="password"
            placeholder="password"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}
        </div>
        <input type="submit" value="sign" />
      </form>
      {error && <FormError errorMessage={error} />}
      <div>
        <Link to="create-account">sign up</Link>
      </div>
    </section>
  )
}

export default SignIn
