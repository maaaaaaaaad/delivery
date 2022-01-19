import { ICommon } from './common.interface'

export interface IUser extends ICommon {
  accountId: string
  password: string
  email: string
  nickname: string
  role: string
}

export interface Category extends ICommon {
  name: string
  coverImage: string
  storeCount: number
  store: IStore[]
}

export interface ICategories extends ICommon {
  categories: Category[]
}

export interface IStore extends ICommon {
  name: string
  address: string
  category: Category
  coverImage: string
  isPromotion: boolean
  promotionPeriod: String
}
