import { InputType, ObjectType, OmitType } from '@nestjs/graphql'
import { StoreEntity } from '../entities/store.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreateStoreInputDto extends OmitType(StoreEntity, [
  'id',
  'category',
  'owner',
]) {}

@ObjectType()
export class CreateStoreOutputDto extends RequiredOutputDto {}
