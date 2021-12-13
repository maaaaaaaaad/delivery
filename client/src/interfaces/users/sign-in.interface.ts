import { User } from './user.interface'

export interface SignInFormInput extends Pick<User, 'accountId' | 'password'> {}
