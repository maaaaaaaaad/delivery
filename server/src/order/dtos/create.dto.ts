import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { OrderEntity } from '../entites/order.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreateOrderInputDto extends PickType(OrderEntity, ['orderItems']) {
  @Field((returns) => Number)
  storeId: number
}

@ObjectType()
export class CreateOrderOutputDto extends RequiredOutputDto {}
