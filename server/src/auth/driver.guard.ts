import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '../jwt/jwt.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class DriverGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context).getContext()
    const token = gqlContext.token

    if (token) {
      const decoded = this.jwtService.decode(token)
      const user = await this.usersService.findByTokenPk(decoded.id)

      if (!user) {
        return false
      }

      gqlContext['user'] = user
      return gqlContext['user'].role === 'driver'
    }

    return false
  }
}
