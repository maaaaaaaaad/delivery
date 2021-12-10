import React from 'react'
import { isLoggedInVar } from '../apollo'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormError from '../components/error/FormError'

type ILoginFormInput = {
  accountId: string
  password: string
}

const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>()

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => console.log(data)

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
