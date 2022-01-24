import React from 'react'
import FormError from '../components/error/FormError'
import { useForm } from 'react-hook-form'

const CreateNewStoreModal = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm()

  return (
    <section className="absolute top-0 left-0 w-screen h-screen center bg-black bg-opacity-60 z-50">
      <div className="h-1/2 w-1/2 bg-white rounded-2xl center">
        <div className="w-full h-full center flex-col">
          <h1 className="font-bold text-green-500 text-4xl">
            CREATE <span className="text-black text-2xl">STORE</span>
          </h1>
          <form className="w-1/2">
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
                <article className="h-3">
                  {errors.accountId && (
                    <FormError errorMessage={errors.accountId.message!} />
                  )}
                </article>
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
                <article className="h-3">
                  {errors.accountId && (
                    <FormError errorMessage={errors.accountId.message!} />
                  )}
                </article>
              </div>
            </div>

            <div className="center mt-5">
              <input className="signBtn" type="submit" value="CREATE" />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateNewStoreModal
