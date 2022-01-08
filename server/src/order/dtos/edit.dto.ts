import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { OrderEntity } from '../entites/order.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class EditOrderInputDto extends PickType(OrderEntity, [
  'id',
  'progress',
]) {}

@ObjectType()
export class EditOrderOutputDto extends RequiredOutputDto {}
