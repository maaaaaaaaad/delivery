import { Module } from '@nestjs/common'
import { UploadsController } from './uploads.controller'
import { JwtModule } from '../jwt/jwt.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [JwtModule, UsersModule],
  controllers: [UploadsController],
})
export class UploadsModule {}
