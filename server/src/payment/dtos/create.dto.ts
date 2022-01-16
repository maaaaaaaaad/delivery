import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { PaymentEntity } from '../entites/payment.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreatePaymentInputDto extends PickType(PaymentEntity, [
  'dealId',
  'storeId',
]) {}

@ObjectType()
export class CreatePaymentOutputDto extends RequiredOutputDto {}
