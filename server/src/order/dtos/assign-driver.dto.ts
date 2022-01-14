import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { OrderEntity } from '../entites/order.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class AssignDriverInputDto extends PickType(OrderEntity, ['id']) {}

@ObjectType()
export class AssignDriverOutputDto extends RequiredOutputDto {}
