import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { OrderItemOptions } from '../entites/item.entity'

@InputType({ isAbstract: true })
@ObjectType()
export class CreateOrderItemInputDto {
  @Field((returns) => Number)
  foodId: number

  @Field((returns) => [OrderItemOptions], { nullable: true })
  options?: OrderItemOptions[]
}

@InputType()
export class CreateOrderInputDto {
  @Field((returns) => Number)
  storeId: number

  @Field((returns) => [CreateOrderItemInputDto])
  orderItems: CreateOrderItemInputDto[]
}

@ObjectType()
export class CreateOrderOutputDto extends RequiredOutputDto {}
