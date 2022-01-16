import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, RelationId } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { StoreEntity } from '../../stores/entities/store.entity'

@InputType('PaymentInputEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class PaymentEntity extends RequiredEntity {
  @Column()
  @Field((returns) => String)
  dealId: string

  @ManyToOne((type) => UsersEntity, (user) => user.payments)
  @Field((returns) => UsersEntity)
  user: UsersEntity

  @RelationId((payment: PaymentEntity) => payment.user)
  userId: number

  @ManyToOne((type) => StoreEntity)
  @Field((returns) => StoreEntity)
  store: StoreEntity

  @RelationId((payment: PaymentEntity) => payment.store)
  @Field((returns) => Number)
  storeId: number
}
