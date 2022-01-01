import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  PaginationInputDto,
  PaginationOutputDto,
} from '../../common/dtos/pagination.dto'
import { StoreEntity } from '../entities/store.entity'

@InputType()
export class SearchStoreInputDto extends PaginationInputDto {
  @Field((returns) => String)
  keyword: string
}

@ObjectType()
export class SearchStoreOutputDto extends PaginationOutputDto {
  @Field((returns) => [StoreEntity], { nullable: true })
  stores?: StoreEntity[]
}
