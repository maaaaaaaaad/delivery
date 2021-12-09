import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { UsersEntity } from '../entities/users.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class CreateInputDto extends PickType(UsersEntity, [
  'accountId',
  'password',
  'email',
  'nickname',
  'role',
]) {}

@ObjectType()
export class CreateOutputDto extends RequiredOutputDto {}
