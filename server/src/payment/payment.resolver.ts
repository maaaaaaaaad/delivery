import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PaymentEntity } from './entites/payment.entity'
import { PaymentService } from './payment.service'
import {
  CreatePaymentInputDto,
  CreatePaymentOutputDto,
} from './dtos/create.dto'
import { UseGuards } from '@nestjs/common'
import { OwnerGuard } from '../auth/owner.guard'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'

@Resolver((of) => PaymentEntity)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(OwnerGuard)
  @Mutation((returns) => CreatePaymentOutputDto)
  async createPayment(
    @AuthUser() owner: UsersEntity,
    @Args('input') createPaymentInputDto: CreatePaymentInputDto,
  ): Promise<CreatePaymentOutputDto> {
    return await this.paymentService.createPayment(owner, createPaymentInputDto)
  }
}
