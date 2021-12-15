import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { UsersEntity } from '../entities/users.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class EditProfileInputDto extends PartialType(
  PickType(UsersEntity, ['email', 'password', 'nickname']),
) {}

@ObjectType()
export class EditProfileOutputDto extends RequiredOutputDto {
  @Field((type) => UsersEntity)
  user?: UsersEntity
}
