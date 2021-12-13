import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import FormError from '../components/error/FormError'
import { useMutation } from '@apollo/client'
import { USER_CREATE_ACCOUNT } from '../graphQl/mutations.gql'
import { SignUpFormInput } from '../interfaces/users/sign-up.interface'
import { SignUpMutationResult } from '../graphQl/types/users/sign-up.type'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigator = useNavigate()
  const [createAccount] = useMutation(USER_CREATE_ACCOUNT, {
    onCompleted: (data: SignUpMutationResult) => {
      const {
        createAccount: { access, errorMessage },
      } = data
      console.log(access, errorMessage)
      window.alert(`Successful create user account!`)
      navigator('/')
    },
    onError: (e: Error) => {
      console.log(e.message)
    },
  })

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

  const onCheckAccountId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const accountId = getValues('accountId')
    /*Mutation*/
  }

  const onSubmit = async () => {
    const { accountId, password, email, nickname, role } = getValues()
    const appendValues = {
      accountId,
      password,
      email,
      nickname,
      role,
    }
    await createAccount({
      variables: appendValues,
    })
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
              pattern: {
                value: /^[A-za-z0-9]{4,15}$/,
                message: 'Please insert a valid account id',
              },
            })}
            type="text"
            name="accountId"
            placeholder="Account ID"
            autoComplete="off"
          />
          <button onClick={onCheckAccountId}>Check</button>
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
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: 'Please insert a valid email address',
              },
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
              pattern: {
                value: /^[A-za-z0-9]{2,12}$/,
                message: 'Please insert a valid nickname',
              },
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
              value="client"
            />
            Client
          </label>
          <label htmlFor="owner">
            <input
              {...register('role', { required: 'Is required' })}
              id="owner"
              type="radio"
              name="role"
              value="owner"
            />
            Owner
          </label>
          <label htmlFor="driver">
            <input
              {...register('role', { required: 'Is required' })}
              id="driver"
              type="radio"
              name="role"
              value="driver"
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
