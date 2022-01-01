import { Field, InputType, ObjectType } from '@nestjs/graphql'
import {
  PaginationInputDto,
  PaginationOutputDto,
} from '../../common/dtos/pagination.dto'
import { CategoryValues } from '../type/category.type'
import { CategoryEntity } from '../entities/category.entity'

@InputType()
export class GetOneCategoryInputDto extends PaginationInputDto {
  @Field((type) => String)
  name: CategoryValues
}

@ObjectType()
export class GetOneCategoryOutputDto extends PaginationOutputDto {
  @Field((type) => CategoryEntity, { nullable: true })
  category?: CategoryEntity
}
