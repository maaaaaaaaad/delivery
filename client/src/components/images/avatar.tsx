import React from 'react'

interface AvatarProp {
  image: any
  title: string
}

const Avatar: React.FC<AvatarProp> = ({ image, title }) => {
  return (
    <section>
      <img className="w-64 h-64 rounded-lg" src={image} alt={title} />
    </section>
  )
}

export default Avatar
