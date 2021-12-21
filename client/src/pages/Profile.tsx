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
            <span className="font-medium text-2xl underline cursor-pointer">
              {user!.email}
            </span>
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
