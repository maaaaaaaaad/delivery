import React from 'react'
import { Category } from '../../common/interfaces/entites.interface'
import { Link } from 'react-router-dom'

interface Prop {
  category: Category
}

const Categories: React.FC<Prop> = ({ category }) => {
  return (
    <Link to={`/category/${category.name}`}>
      <section
        className="bg-cover mr-5 p-2 rounded-full relative w-12 h-12 cursor-pointer"
        style={{ backgroundImage: `url(${category.coverImage})` }}
      >
        <span className="bg-red-400 absolute px-2 rounded left-8 top-8">
          {category.storeCount}
        </span>
      </section>
    </Link>
  )
}

export default Categories
