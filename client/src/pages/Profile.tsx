import React from 'react'
import { me } from '../apollo'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const router = useNavigate()

  const user = me()

  if (user === null) {
    router('/')
  }

  return (
    <section className="bg-black text-white h-screen center flex-col">
      <div>
        {/*<p>{user!.nickname}</p>*/}
        {/*<p>Create At {user!.createAt}</p>*/}
        {/*<p>Account ID {user!.accountId}</p>*/}
        {/*<p>Email {user!.email}</p>*/}
      </div>
    </section>
  )
}

export default Profile
