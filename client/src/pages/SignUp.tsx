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
    defaultValues: { role: 'client' },
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
            {...register('accountId', {
              required: 'You must specify a account id',
            })}
            type="text"
            name="accountId"
            placeholder="Account ID"
            autoComplete="off"
          />
          <button>Check</button>
          {errors.accountId && (
            <FormError errorMessage={errors.accountId.message!} />
          )}
        </div>
        <div>
          <input
            {...register('password', {
              required: 'You must specify a password',
              pattern: {
                value: /(?=.*\d)(?=.*[a-z]).{8,}/,
                message: 'Password must have at least 8 characters',
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
          />
          {errors.password && (
            <FormError errorMessage={errors.password.message!} />
          )}
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
            {...register('email', {
              required: 'You must specify a email',
            })}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
          />
          <button>Check</button>
          {errors.email && <FormError errorMessage={errors.email.message!} />}
        </div>
        <div>
          <input
            {...register('nickname', {
              required: 'You must specify a nickname',
            })}
            type="text"
            name="nickname"
            placeholder="Nickname"
            autoComplete="off"
          />
          <button>Check</button>
          {errors.nickname && (
            <FormError errorMessage={errors.nickname.message!} />
          )}
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
