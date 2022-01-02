import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { StoreEntity } from '../../stores/entities/store.entity'
import { FoodEntity } from '../../stores/entities/food.entity'

export type OrderStatus =
  | 'Waiting'
  | 'Making'
  | 'Delivering'
  | 'PickUp'
  | 'Done'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class OrderEntity extends RequiredEntity {
  @Column()
  @Field((returns) => UsersEntity)
  consumer: UsersEntity

  @Column()
  @Field((returns) => UsersEntity)
  driver: UsersEntity

  @Column()
  @Field((returns) => StoreEntity)
  store: StoreEntity

  @Column()
  @Field((returns) => [FoodEntity])
  foods: FoodEntity[]

  @Column()
  @Field((returns) => Number)
  totalPrice: number

  @Column()
  @Field((returns) => String)
  status: OrderStatus
}
