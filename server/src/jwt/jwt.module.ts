import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { IJwtModuleOptions } from './jwt.interface'
import { JWT_MODULE_OPTIONS } from './jwt.constants'

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: IJwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        JwtService,
        {
          provide: JWT_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [JwtService],
    }
  }
}
