import { Field, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { PaymentEntity } from '../entites/payment.entity'

@ObjectType()
export class getAllPaymentInputDto extends RequiredOutputDto {
  @Field((returns) => [PaymentEntity], { nullable: true })
  payments?: PaymentEntity[]
}
