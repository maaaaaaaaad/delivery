import React from 'react'
import { isLoggedInVar } from '../apollo'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormError from '../components/error/FormError'
import { gql, useMutation, useQuery } from '@apollo/client'

type ILoginFormInput = {
  accountId: string
  password: string
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

const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>()

  const [login, { data, loading }] = useMutation(USER_LOGIN)

  const onSubmit = async ({ accountId, password }: ILoginFormInput) => {
    await login({
      variables: {
        accountId,
        password,
      },
    })
    console.log(loading)
    console.log(JSON.stringify(data))
  }

  return (
    <section>
      <h1>LoggedOutRouter!</h1>
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
      <button onClick={onClick}>click!</button>
    </section>
  )
}

export default LoggedOutRouter
