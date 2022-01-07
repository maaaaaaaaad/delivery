import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { OrderEntity } from '../entites/order.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class GetOneOrderInputDto extends PickType(OrderEntity, ['id']) {}

@ObjectType()
export class GetOneOrderOutputDto extends RequiredOutputDto {
  @Field((returns) => OrderEntity, { nullable: true })
  order?: OrderEntity
}
