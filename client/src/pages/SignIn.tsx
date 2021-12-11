import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import FormError from '../components/error/FormError'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type SignInFormInput = {
  accountId: string
  password: string
}

type LoginMutationResult = {
  loginAccount: {
    access: boolean
    access_token: string
    errorMessage: string
  }
}

const USER_LOGIN = gql`
  mutation loginAccount($accountId: String!, $password: String!) {
    loginAccount(input: { accountId: $accountId, password: $password }) {
      access
      access_token
      errorMessage
    }
  }
`

const SignIn = () => {
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>()

  const [login] = useMutation(USER_LOGIN, {
    onCompleted: (data: LoginMutationResult) => {
      const {
        loginAccount: { access, access_token, errorMessage },
      } = data
      console.log(access, access_token, errorMessage)
      setError(errorMessage)
    },
    onError: (e: Error) => {
      if (e.message === 'Failed to fetch') {
        window.alert('Cannot connected to server...')
      }
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
          {errors.accountId?.message ? (
            <FormError errorMessage={errors.accountId.message} />
          ) : (
            'Account Id'
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
          {errors.password?.message ? (
            <FormError errorMessage={errors.password.message} />
          ) : (
            'Password'
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
