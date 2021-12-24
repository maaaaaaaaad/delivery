import React, { useRef } from 'react'

interface AvatarProp {
  image: any
  title: string
}

const Avatar: React.FC<AvatarProp> = ({ image, title }) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    fileRef.current?.click()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files as FileList
    const file = fileList[0] as File
    console.log(file)
  }

  return (
    <section>
      <div onClick={onClick} className="p-0 m-0 rounded-full cursor-pointer">
        <img className="w-64 h-64 hover:opacity-60" src={image} alt={title} />
      </div>
      <input
        onChange={onChange}
        ref={fileRef}
        className="hidden"
        type="file"
        name="file"
        accept="image/*"
      />
    </section>
  )
}

export default Avatar
