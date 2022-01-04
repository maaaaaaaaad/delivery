import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { FoodOptions } from '../../stores/entities/food.entity'

@InputType({ isAbstract: true })
@ObjectType()
export class CreateOrderItemInputDto {
  @Field((returns) => Number)
  foodId: number

  @Field((returns) => FoodOptions, { nullable: true })
  options?: FoodOptions[]
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
