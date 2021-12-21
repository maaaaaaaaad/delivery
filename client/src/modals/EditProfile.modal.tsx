import React from 'react'
import FormError from '../components/error/FormError'
import { useForm } from 'react-hook-form'
import { User } from '../common/interfaces/user.interface'

interface EditProfileInputForm
  extends Omit<User, 'role' | 'createAt' | 'updateAt' | 'accountId'> {
  confirmPassword: string
}

const EditProfile: React.FC = () => {
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInputForm>({
    mode: 'onChange',
  })

  const onSubmit = async () => {}

  return (
    <section className="bg-black h-screen w-full center">
      <div className="w-1/2 h-1/2 bg-white center flex-col rounded-2xl">
        <h1 className="font-bold text-green-500 text-4xl">
          DELIVER <span className="text-black text-2xl">EDIT PROFILE</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
          <div className="w-full">
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
                <FormError errorMessage={errors.password.message!} />
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
                <FormError errorMessage={errors.confirmPassword.message!} />
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
                <FormError errorMessage={errors.email.message!} />
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
                <FormError errorMessage={errors.nickname.message!} />
              )}
            </div>
          </div>

          <div className="center mt-5">
            <input className="signBtn" type="submit" value="SAVE" />
          </div>
        </form>
        <div className="mt-5">
          <button className="w-52 py-2 rounded-lg bg-red-400">
            <span className="text-white">CLOSE</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default EditProfile
