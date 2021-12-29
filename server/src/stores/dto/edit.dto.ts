import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql'
import { CreateStoreInputDto } from './create.dto'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class EditStoreInputDto extends PartialType(
  OmitType(CreateStoreInputDto, ['categoryName']),
) {
  @Field((type) => Number)
  storeId: number
}

@ObjectType()
export class EditStoreOutputDto extends RequiredOutputDto {}
