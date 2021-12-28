import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql'
import { CreateStoreInputDto } from './create.dto'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class EditStoreInputDto extends PartialType(CreateStoreInputDto) {
  @Field((type) => Number)
  storeId: number
}

@ObjectType()
export class EditStoreOutputDto extends RequiredOutputDto {}
