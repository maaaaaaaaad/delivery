import React, { useEffect } from 'react'
import Empty from '../../components/block/empty'
import { IUser } from '../../common/interfaces/entites.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { me } from '../../apollo'

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
    <section>
      <Empty />
      <main>
        <h1>{params.role}</h1>
        <h2>{params.nickname}</h2>
      </main>
    </section>
  )
}

export default Dashboard
