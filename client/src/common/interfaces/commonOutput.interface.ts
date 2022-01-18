import { IUser } from './entites.interface'

export interface CommonOutput {
  access: boolean
  errorMessage: string
  access_token?: string
  user?: IUser
}
