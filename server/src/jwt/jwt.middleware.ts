import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from './jwt.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('access_token' in req.headers) {
      const token = req.headers['access_token']! as string
      const decoded = this.jwtService.decode(token)
      const user = await this.usersService.findByTokenPk(decoded.id)
      if (user) {
        req['user'] = user
      }
    }
    next()
  }
}
