import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentEntity } from './entites/payment.entity'
import { PaymentResolver } from './payment.resolver'
import { StoreEntity } from '../stores/entities/store.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity, StoreEntity]),
    UsersModule,
  ],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
