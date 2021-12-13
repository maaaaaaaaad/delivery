type UserRole = 'client' | 'owner' | 'driver'

export interface User {
  accountId: string
  password: string
  email: string
  nickname: string
  role: UserRole
}
