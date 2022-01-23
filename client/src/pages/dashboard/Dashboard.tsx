import React from 'react'
import Empty from '../../components/block/empty'
import { IUser } from '../../common/interfaces/entites.interface'
import { useParams } from 'react-router-dom'

type Params = Pick<IUser, 'role' | 'nickname'>

const Dashboard = () => {
  const params = useParams() as Params

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
