import { InputType, PickType } from '@nestjs/graphql'
import { OrderEntity } from '../entites/order.entity'

@InputType()
export class UpdateOrderInputDto extends PickType(OrderEntity, ['id']) {}
