import React, { useRef } from 'react'
import { gql, useMutation } from '@apollo/client'

interface AvatarProp {
  image: any
  title: string
}

const UPLOAD_AVATAR_IMAGE = gql`
  mutation uploadAvatarImage($file: Upload!) {
    uploadAvatarImage(file: $file)
  }
`

const Avatar: React.FC<AvatarProp> = ({ image, title }) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [uploadAvatarImage] = useMutation(UPLOAD_AVATAR_IMAGE, {
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log(error.message),
  })

  const onClick = () => {
    fileRef.current?.click()
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files as FileList
    const file = fileList[0] as File
    await uploadAvatarImage({
      variables: {
        file,
      },
    })
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
