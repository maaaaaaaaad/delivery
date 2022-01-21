import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface ISearchForm {
  searchValue: string
}

const SearchForm = () => {
  const navigate = useNavigate()

  const { register, getValues, handleSubmit, setFocus } = useForm<ISearchForm>()

  const onSubmit = () => {
    const { searchValue } = getValues()

    navigate({
      pathname: '/search',
      search: `?query=${searchValue}`,
    })
    setFocus('searchValue')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-96">
      <input
        {...register('searchValue', {
          required: true,
        })}
        type="search"
        className="signField"
        placeholder="Search store (category)"
        autoComplete="off"
      />
    </form>
  )
}

export default SearchForm
