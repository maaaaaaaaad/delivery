import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { RequiredOutputDto } from '../../common/dtos/required.dto'
import { StoreEntity } from '../entities/store.entity'

@InputType()
export class GetOneStoreInputDto {
  @Field((returns) => Number)
  storeId: number
}

@ObjectType()
export class GetOneStoreOutputDto extends RequiredOutputDto {
  @Field((returns) => StoreEntity, { nullable: true })
  store?: StoreEntity
}
