import { User } from './user.interface'

export interface CommonOutput {
  access: boolean
  errorMessage: string
  access_token?: string
  user?: User
}
