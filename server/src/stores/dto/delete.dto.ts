import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { EditStoreInputDto } from './edit.dto'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class DeleteStoreInputDto extends PickType(EditStoreInputDto, [
  'storeId',
]) {}

@ObjectType()
export class DeleteStoreOutputDto extends RequiredOutputDto {}
