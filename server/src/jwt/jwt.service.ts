import { Inject, Injectable } from '@nestjs/common'
import { JWT_MODULE_OPTIONS } from './jwt.constants'
import { IJwtModuleOptions } from './jwt.interface'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_MODULE_OPTIONS) private readonly options: IJwtModuleOptions,
  ) {}

  sign(primaryKey: number): string {
    return jwt.sign({ id: primaryKey }, this.options.jwtSecretKey)
  }

  decode(token: string) {
    return jwt.verify(token, this.options.jwtSecretKey)
  }
}
