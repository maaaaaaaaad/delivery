import { Resolver } from '@nestjs/graphql'
import { PaymentEntity } from './entites/payment.entity'
import { PaymentService } from './payment.service'

@Resolver((of) => PaymentEntity)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
}
