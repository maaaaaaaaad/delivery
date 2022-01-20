import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchForm from '../components/search-form/SearchForm'
import { useQuery } from '@apollo/client'
import { GET_ALL_CATEGORIES } from '../graphql/queries/queries'
import { GetAllCategories } from '../graphql/interfaces/output.interface'
import Categories from '../components/categories/Categories'

const Header = () => {
  const router = useNavigate()

  const onClickGoHome = () => {
    router('/')
  }

  const { data, loading, error } =
    useQuery<GetAllCategories>(GET_ALL_CATEGORIES)

  return (
    <>
      <header className="absolute flex justify-between px-5 py-3 w-full text-white font bg-gray-900 bg-opacity-40">
        <div className="logo center">
          <h2 className="text-4xl">
            <button onClick={onClickGoHome}>HOME</button>
          </h2>
          <div className="ml-5">
            <SearchForm />
          </div>
          {!loading && !error && data && (
            <div className="ml-5 center">
              {data.getAllCategories.categories.map((category) => {
                return <Categories key={category.id} category={category} />
              })}
            </div>
          )}
        </div>

        <nav>
          <ul className="flex">
            <li className="mr-5 router-link">
              <Link to="/stores">STORES</Link>
            </li>
            <li className="mr-5 router-link">
              <Link to="/">Lorem2</Link>
            </li>
            <li>
              <Link className="router-link" to="/">
                Lorem3
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
