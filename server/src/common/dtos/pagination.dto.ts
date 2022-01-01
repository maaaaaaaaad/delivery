import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from './required.dto'

@InputType()
export class PaginationInputDto {
  @Field((type) => Number, { defaultValue: 1 })
  page: number
}

@ObjectType()
export class PaginationOutputDto extends RequiredOutputDto {
  @Field((type) => Number, { nullable: true })
  totalPages?: number

  @Field((returns) => Number, { nullable: true })
  resultCount?: number
}
