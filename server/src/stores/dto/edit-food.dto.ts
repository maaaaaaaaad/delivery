import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { FoodEntity } from '../entities/food.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class EditFoodInputDto extends PickType(PartialType(FoodEntity), [
  'name',
  'price',
  'image',
  'description',
  'options',
]) {
  @Field((returns) => Number)
  foodId: number
}

@ObjectType()
export class EditFoodOutputDto extends RequiredOutputDto {}
