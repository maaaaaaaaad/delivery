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

export interface FoodChoiceOptions {
  subject: string
  extraCharge?: number
}

export interface FoodOptions {
  subject: string
  selection: FoodChoiceOptions[]
  extraCharge?: number
}

export interface Menu extends ICommon {
  name: string
  price: number
  image: string
  description: string
  options: FoodOptions[]
}

export interface IStore extends ICommon {
  name: string
  address: string
  category: Category
  coverImage: string
  isPromotion: boolean
  promotionPeriod: string
  menu: Menu[]
}
