import { SetMetadata } from '@nestjs/common'
import { UserRole } from '../users/types/role.type'

export const Role = (roles: UserRole[]) => SetMetadata('roles', roles)
