import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { StoreEntity } from '../entities/store.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreateStoreInputDto extends PickType(StoreEntity, [
  'name',
  'address',
  'coverImage',
]) {}

@ObjectType()
export class CreateStoreOutputDto extends RequiredOutputDto {}
