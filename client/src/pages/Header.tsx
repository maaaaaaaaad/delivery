import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const router = useNavigate()

  const onClick = () => {
    router('/')
  }

  return (
    <>
      <header className="flex justify-between px-5 py-3 absolute w-full text-white">
        <div className="logo">
          <h2 className="text-3xl">
            <button onClick={onClick}>HOME</button>
          </h2>
        </div>

        <nav>
          <ul className="flex">
            <li className="mr-5">
              <Link to="/">Lorem1</Link>
            </li>
            <li className="mr-5">
              <Link to="/">Lorem2</Link>
            </li>
            <li>
              <Link to="/">Lorem3</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
