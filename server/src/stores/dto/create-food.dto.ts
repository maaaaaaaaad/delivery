import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { FoodEntity } from '../entities/food.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreateFoodInputDto extends PickType(FoodEntity, [
  'name',
  'price',
  'image',
  'description',
  'options',
]) {
  @Field((returns) => Number)
  storeId: number
}

@ObjectType()
export class CreateFoodOutputDto extends RequiredOutputDto {}
