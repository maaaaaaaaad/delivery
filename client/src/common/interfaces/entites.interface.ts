import { ICommon } from './common.interface'

export interface IUser extends ICommon {
  accountId: string
  password: string
  email: string
  nickname: string
  role: string
}

export interface ICategory extends ICommon {
  name: string
  coverImage: string
}

export interface IStore extends ICommon {
  name: string
  address: string
  category: ICategory
  coverImage: string
  isPromotion: boolean
  promotionPeriod: String
}
