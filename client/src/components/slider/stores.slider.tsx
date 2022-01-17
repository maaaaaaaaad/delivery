import React from 'react'

interface Prop {
  store: any
}

const StoresSlider: React.FC<Prop> = ({ store }) => {
  return (
    <section className="p-5">
      <p>{store.name}</p>
      <p>{store.category.name}</p>
      <p>{store.address}</p>
    </section>
  )
}

export default StoresSlider
