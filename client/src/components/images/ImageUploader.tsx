import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'
import { me } from '../../apollo'

interface AvatarProp {
  image: string
  title: string
}

const ImageUploader: React.FC<AvatarProp> = ({ image, title }) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [imageBase64, setImgBase64] = useState<string | null>(null)
  const [imageFile, setImgFile] = useState<File | null>(null)

  const onClick = () => {
    fileRef.current?.click()
  }

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files) {
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        const base64 = fileReader.result
        if (base64) {
          setImgBase64(base64.toString())
        }
      }

      if (files[0]) {
        fileReader.readAsDataURL(files[0])
        setImgFile(files[0])
      }
    }
  }

  const onCancelPreviewImage = () => {
    setImgBase64(null)
  }

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    const imageFormData = new FormData()
    imageFile && imageFormData.append('file', imageFile)

    e.preventDefault()
    const { data: imageUrl } = await axios.post(
      `${process.env.REACT_APP_SERVER}/upload`,
      imageFormData,
      {
        headers: {
          access_token: `${window.localStorage.getItem('token')}`,
        },
      },
    )
    me({
      ...me(),
      avatarImage: imageUrl,
    })
  }

  return (
    <section>
      {imageBase64 ? (
        <div className="w-64 h-64 p-0 m-0 relative">
          <img
            className="w-full h-full rounded-full"
            src={imageBase64}
            alt="image-preview"
          />
          <article className="absolute top-2 center">
            <form className="m-0 p-0" onSubmit={onSubmit}>
              <input
                className="bg-white text-green-500 rounded-md px-2 m-1 font cursor-pointer"
                type="submit"
                value="O"
              />
            </form>
            <button
              onClick={onCancelPreviewImage}
              className="bg-white text-green-500 rounded-md px-2 m-1 font cursor-pointer"
            >
              X
            </button>
          </article>
        </div>
      ) : (
        <div onClick={onClick} className="p-0 m-0 cursor-pointer">
          <img
            className="rounded-full w-64 h-64 hover:opacity-60"
            src={image}
            alt={title}
          />
        </div>
      )}
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

export default ImageUploader
