import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { EditFoodInputDto } from './edit-food.dto'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class DeleteFoodInputDto extends PickType(EditFoodInputDto, [
  'foodId',
]) {}

@ObjectType()
export class DeleteFoodOutputDto extends RequiredOutputDto {}
