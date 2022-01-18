import { CommonOutput } from '../../common/interfaces/commonOutput.interface'
import { IUser } from '../../common/interfaces/entites.interface'

export interface CreateAccountOutput {
  createAccount: CommonOutput
}

export interface LoginAccountOutput {
  loginAccount: CommonOutput
}

export interface UserStateOutput {
  userState: Omit<IUser, 'id' | 'password'>
}

export interface EditProfileOutput {
  editProfile: CommonOutput
}
