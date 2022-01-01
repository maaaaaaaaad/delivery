import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  PaginationInputDto,
  PaginationOutputDto,
} from '../../common/dtos/pagination.dto'
import { StoreEntity } from '../entities/store.entity'

@InputType()
export class GetAllStoreInputDto extends PaginationInputDto {}

@ObjectType()
export class GetAllStoreOutputDto extends PaginationOutputDto {
  @Field((returns) => [StoreEntity], { nullable: true })
  stores?: StoreEntity[]
}
