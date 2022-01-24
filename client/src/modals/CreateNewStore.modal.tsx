import React from 'react'
import FormError from '../components/error/FormError'
import { useForm } from 'react-hook-form'

interface CreateStoreInputForm {
  name: string
  address: string
  categoryName: string
  coverImage?: string
}

const categoryValues = ['hamburger', 'fries', 'noodle', 'drink', 'pizza']

interface Prop {
  onClickAddStoreModal: () => void
}

const CreateNewStoreModal: React.FC<Prop> = ({ onClickAddStoreModal }) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreInputForm>({ mode: 'onChange' })

  const onSubmit = () => {
    console.log(getValues())
  }

  return (
    <section className="absolute top-0 left-0 w-screen h-screen center bg-black bg-opacity-60 z-50">
      <div className="h-1/2 w-1/2 bg-white rounded-2xl center">
        <div className="w-full h-full center flex-col">
          <h1 className="font-bold text-green-500 text-4xl">
            CREATE <span className="text-black text-2xl">STORE</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
            <div className="w-full">
              <div className="mt-5">
                <input
                  {...register('name', {
                    required: 'You must specify a store name',
                    pattern: {
                      value: /^[A-za-z0-9]{3,12}$/,
                      message: 'Please insert a store name',
                    },
                  })}
                  name="name"
                  className="signField"
                  type="text"
                  autoComplete="off"
                  placeholder="Store name (3~12 char)"
                />
                <article className="h-3">
                  {errors.name && (
                    <FormError errorMessage={errors.name.message!} />
                  )}
                </article>
              </div>

              <div className="mt-5">
                <input
                  {...register('address', {
                    required: 'You must specify a address',
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z]).{4,20}/,
                      message: 'Address must have at least 4~20 characters',
                    },
                  })}
                  className="signField"
                  name="address"
                  type="text"
                  autoComplete="off"
                  placeholder="Address (4~20 char)"
                />
                <article className="h-3">
                  {errors.address && (
                    <FormError errorMessage={errors.address.message!} />
                  )}
                </article>
              </div>
            </div>

            <div className="flex justify-evenly mt-5 center flex-col">
              <div>
                {categoryValues.map((category: string, index: number) => (
                  <article className="inline-block mr-2" key={index}>
                    <input
                      {...register('categoryName', {
                        required: 'You must specify a category',
                      })}
                      type="radio"
                      name="categoryName"
                      value={category}
                    />
                    <span className="text-black font-semibold ml-1">
                      {category}
                    </span>
                  </article>
                ))}
              </div>
              <article className="h-3">
                {errors.categoryName && (
                  <FormError errorMessage={errors.categoryName.message!} />
                )}
              </article>
            </div>

            <div className="center mt-5">
              <input className="signBtn" type="submit" value="CREATE" />
            </div>
          </form>

          <div className="mt-5">
            <button
              onClick={onClickAddStoreModal}
              className="w-52 py-2 rounded-lg bg-red-400"
            >
              <span className="text-white">CLOSE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateNewStoreModal
