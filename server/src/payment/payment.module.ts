import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentEntity } from './entites/payment.entity'
import { PaymentResolver } from './payment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
