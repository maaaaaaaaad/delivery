import { CommonOutput } from '../../common/interfaces/commonOutput.interface'
import {
  ICategories,
  IStore,
  IUser,
} from '../../common/interfaces/entites.interface'

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

export interface GetAllCategories {
  getAllCategories: ICategories
}

export interface GetAllStores {
  getAllStore: {
    access: boolean
    errorMessage: string
    resultCount: number
    stores: IStore[]
    totalPages: number
  }
}
