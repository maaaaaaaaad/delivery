import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className="flex justify-between px-5 py-3 absolute w-full text-white">
        <div className="logo">
          <h2 className="text-3xl">
            <Link to="/">HOME</Link>
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
