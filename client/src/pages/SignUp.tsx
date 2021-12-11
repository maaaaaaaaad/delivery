import React, { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import FormError from '../components/error/FormError'

type UserRole = 'client' | 'owner' | 'driver'

type SignUpFormInput = {
  accountId: string
  password: string
  confirmPassword: string
  email: string
  nickname: string
  role: UserRole
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    mode: 'onChange',
  })

  const onSubmit = () => {
    console.log(getValues())
  }

  return (
    <section>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <h1>User Sign up!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('accountId', { required: 'Is required' })}
            type="text"
            name="accountId"
            placeholder="Account ID"
            autoComplete="off"
          />
          <button>Check</button>
        </div>
        <div>
          <input
            {...register('password')}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            {...register('confirmPassword', {
              validate: (v) =>
                v === watch('password') || 'The passwords do not match',
            })}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword?.message && (
            <FormError errorMessage={errors.confirmPassword.message} />
          )}
        </div>
        <div>
          <input
            {...register('email', { required: 'Is required' })}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
          <button>Check</button>
        </div>
        <div>
          <input
            {...register('nickname', { required: 'Is required' })}
            type="text"
            name="nickname"
            placeholder="Nickname"
            autoComplete="off"
          />
          <button>Check</button>
        </div>
        <div>
          <div>
            <span>Who r u ?</span>
          </div>
          <label htmlFor="client">
            <input
              {...register('role', { required: 'Is required' })}
              id="client"
              type="radio"
              name="role"
            />
            Client
          </label>
          <label htmlFor="owner">
            <input
              {...register('role', { required: 'Is required' })}
              id="owner"
              type="radio"
              name="role"
            />
            Owner
          </label>
          <label htmlFor="driver">
            <input
              {...register('role', { required: 'Is required' })}
              id="driver"
              type="radio"
              name="role"
            />
            Driver
          </label>
        </div>
        <input type="submit" value="Sign up" />
      </form>
    </section>
  )
}

export default SignUp
