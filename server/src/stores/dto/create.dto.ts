import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { StoreEntity } from '../entities/store.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { CategoryValues } from '../type/category.type'

@InputType()
export class CreateStoreInputDto extends PickType(StoreEntity, [
  'name',
  'coverImage',
  'address',
]) {
  @Field((type) => String)
  categoryName: CategoryValues
}

@ObjectType()
export class CreateStoreOutputDto extends RequiredOutputDto {}
