import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { OrderProgress } from '../types/order.type'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { OrderEntity } from '../entites/order.entity'

@InputType()
export class GetAllOrderInputDto {
  @Field((returns) => String, { nullable: true })
  progress?: OrderProgress
}

@ObjectType()
export class GetAllOrderOutputDto extends RequiredOutputDto {
  @Field((returns) => [OrderEntity], { nullable: true })
  orders?: OrderEntity[]
}
