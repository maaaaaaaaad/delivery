import { Field, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { CategoryEntity } from '../entities/category.entity'

@ObjectType()
export class GetAllCategoryOutputDto extends RequiredOutputDto {
  @Field((type) => [CategoryEntity], { nullable: true })
  categories?: CategoryEntity[]
}
