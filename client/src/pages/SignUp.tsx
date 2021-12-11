import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'

type UserRole = 'client' | 'owner' | 'driver'

type SignUpFormInput = {
  accountId: string
  password: string
  confirmPassword: string
  email: string
  nickname: string
  role: UserRole
}

const SignUp = () => {
  const {} = useForm<SignUpFormInput>()

  return (
    <section>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <h1>User Sign up!</h1>
      <form>
        <div>
          <input type="text" name="accountId" placeholder="Account ID" />
          <button>Check</button>
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" />
          <button>Check</button>
        </div>
        <div>
          <input type="text" name="nickname" placeholder="Nickname" />
          <button>Check</button>
        </div>
        <div>
          <div>
            <span>Who r u ?</span>
          </div>
          <label htmlFor="client">
            <input id="client" type="radio" name="role" />
            Client
          </label>
          <label htmlFor="owner">
            <input id="owner" type="radio" name="role" />
            Owner
          </label>
          <label htmlFor="driver">
            <input id="driver" type="radio" name="role" />
            Driver
          </label>
        </div>
        <input type="submit" value="Sign up" />
      </form>
    </section>
  )
}

export default SignUp
