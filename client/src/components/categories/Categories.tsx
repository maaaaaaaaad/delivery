import React from 'react'
import { Category } from '../../common/interfaces/entites.interface'

interface Prop {
  category: Category
}

const Categories: React.FC<Prop> = ({ category }) => {
  return (
    <section className="bg-green-500 mr-5 p-2 rounded relative">
      <p className="cursor-pointer font">{category.name}</p>
      <span className="bg-red-400 absolute px-2 rounded">
        {category.storeCount}
      </span>
    </section>
  )
}

export default Categories
