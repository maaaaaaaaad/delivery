import React from 'react'
import { me } from '../apollo'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../images/defaultImg.png'
import Avatar from '../components/images/avatar'

const Profile = () => {
  const router = useNavigate()

  const user = me()

  if (user === null) {
    router('/')
  }

  const copyBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const email = e.currentTarget.textContent
    try {
      email && (await navigator.clipboard.writeText(email))
      window.alert(`Success copy this ${email}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section className="bg-black text-white h-screen center flex-col">
      <div className="center">
        <Avatar image={defaultAvatar} title={'default-avatar-image'} />
        <div className="p-5">
          <p className="text-4xl font-bold pb-5">
            <span className="text-green-500">{user!.role}</span>{' '}
            {user!.nickname}
          </p>
          <p className="pb-5">
            <abbr title="Copy this!">
              <span
                onClick={copyBoard}
                className="font-medium text-2xl underline cursor-pointer hover:text-blue-300"
              >
                {user!.email}
              </span>
            </abbr>
          </p>
          <p>
            <span className="font-medium text-2xl">
              Create At {user!.createAt}
            </span>
          </p>
          <p>
            <span className="font-medium text-2xl">
              Update At {user!.updateAt}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Profile
