import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { UsersEntity } from '../entities/users.entity'
import { RequiredOutputDto } from '../../common/dtos/required.dto'

@InputType()
export class LoginInputDto extends PickType(UsersEntity, [
  'accountId',
  'password',
]) {}

@ObjectType()
export class LoginOutputDto extends RequiredOutputDto {
  @Field((type) => String, { nullable: true })
  access_token?: string

  @Field((type) => UsersEntity, { nullable: true })
  user?: UsersEntity
}
