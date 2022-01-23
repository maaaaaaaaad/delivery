import { Field, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { StoreEntity } from '../entities/store.entity'

@ObjectType()
export class GetMyStoresOutputDto extends RequiredOutputDto {
  @Field((returns) => [StoreEntity], { nullable: true })
  stores?: StoreEntity[]
}
