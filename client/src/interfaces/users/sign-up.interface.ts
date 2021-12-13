import { User } from './user.interface'

export interface SignUpFormInput extends User {
  confirmPassword: string
}
