import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@apollo/client'
import { GET_USER_SELF } from '../graphQl/query.gql'

const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(GET_USER_SELF)

  if (!data || loading || error) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }

  const {
    userState: { nickname },
  } = data

  return (
    <section>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>Hello {nickname}!</h1>
    </section>
  )
}

export default LoggedInRouter
