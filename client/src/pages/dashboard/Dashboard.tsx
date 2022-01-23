import React, { useEffect } from 'react'
import { IUser } from '../../common/interfaces/entites.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { me } from '../../apollo'
import Owner from './owner/Owner'
import Client from './client/Client'
import Driver from './driver/Driver'

type Params = Pick<IUser, 'role' | 'nickname'>

const Dashboard = () => {
  const params = useParams() as Params
  const user = me()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.nickname === user.nickname) {
      return
    }
    return navigate('/', {
      replace: true,
    })
  }, [params, user])

  return (
    <>
      {user.role === 'client' && <Client />}
      {user.role === 'owner' && <Owner />}
      {user.role === 'driver' && <Driver />}
    </>
  )
}

export default Dashboard
