import React from 'react'
import FormError from '../components/error/FormError'
import { useForm } from 'react-hook-form'
import { IUser } from '../common/interfaces/entites.interface'
import { useMutation } from '@apollo/client'
import { EDIT_PROFILE } from '../graphql/mutations/mutations'
import { EditProfileOutput } from '../graphql/interfaces/output.interface'
import { me } from '../apollo'
import { useSnackbar } from 'notistack'
import { FAIL_EDIT_PROFILE, SUCCESS_EDIT_PROFILE } from '../common/constatns'

interface EditProfileInputForm
  extends Pick<IUser, 'password' | 'email' | 'nickname'> {
  confirmPassword: string
}

interface OnEditProfileModalProp {
  onEditProfileModal: () => void
}

const EditProfile: React.FC<OnEditProfileModalProp> = ({
  onEditProfileModal,
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileInputForm>({
    mode: 'onChange',
  })

  const [editProfile] = useMutation<EditProfileOutput>(EDIT_PROFILE, {
    onCompleted: ({ editProfile }) => {
      const { access, errorMessage, user } = editProfile
      if (!access) {
        reset()
        return enqueueSnackbar(errorMessage)
      }
      me(user)
      enqueueSnackbar(SUCCESS_EDIT_PROFILE)
      onEditProfileModal()
    },
    onError: (error) => {
      reset()
      enqueueSnackbar(error.message)
    },
  })

  const onSubmit = async () => {
    const { password, email, nickname } = getValues()
    if (!password && !email && !nickname)
      return enqueueSnackbar(FAIL_EDIT_PROFILE)

    await editProfile({
      variables: {
        ...(password !== '' && { password }),
        ...(email !== '' && { email }),
        ...(nickname !== '' && { nickname }),
      },
    })
  }

  return (
    <section className="profile h-screen w-full center">
      <div className="overlay w-full center flex-col rounded-2xl">
        <h1 className="font-bold text-green-500 text-4xl">
          DELIVER <span className="text-white text-2xl">EDIT PROFILE</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3">
          <div className="w-full">
            <div className="mt-8">
              <input
                {...register('password', {
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
            <div className="mt-8">
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
            <div className="mt-8">
              <input
                {...register('email', {
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
            <div className="mt-8">
              <input
                {...register('nickname', {
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

          <div className="center mt-8">
            <input className="signBtn" type="submit" value="SAVE" />
          </div>
        </form>
        <div className="mt-5">
          <button
            onClick={onEditProfileModal}
            className="w-52 py-2 rounded-lg bg-red-400"
          >
            <span className="text-white">CLOSE</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default EditProfile
