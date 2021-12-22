import { CommonOutput } from '../../common/interfaces/commonOutput.interface'
import { User } from '../../common/interfaces/user.interface'

export interface CreateAccountOutput {
  createAccount: CommonOutput
}

export interface LoginAccountOutput {
  loginAccount: CommonOutput
}

export interface UserStateOutput {
  userState: Omit<User, 'password'>
}

export interface EditProfileOutput {
  editProfile: Omit<CommonOutput, 'access_token'>
}
