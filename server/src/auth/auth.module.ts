import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [UsersModule],
  providers: [AuthGuard],
})
export class AuthModule {}
