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
  @Field((returns) => Number)
  dealId: number

  @ManyToOne((type) => UsersEntity, (user) => user.payments)
  @Field((returns) => UsersEntity)
  user: UsersEntity

  @RelationId((order: PaymentEntity) => order.user)
  userId: number

  @ManyToOne((type) => StoreEntity)
  @Field((returns) => StoreEntity)
  store: StoreEntity
}
