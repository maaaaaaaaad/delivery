import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { StoreEntity } from '../../stores/entities/store.entity'
import { FoodEntity } from '../../stores/entities/food.entity'
import { JoinTable } from 'typeorm/browser'

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
  @ManyToOne((type) => UsersEntity, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field((returns) => UsersEntity, { nullable: true })
  consumer?: UsersEntity

  @ManyToOne((type) => UsersEntity, (user) => user.drivers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field((returns) => UsersEntity, { nullable: true })
  driver?: UsersEntity

  @ManyToOne((type) => StoreEntity, (store) => store.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field((returns) => StoreEntity)
  store: StoreEntity

  @Field((returns) => [FoodEntity])
  @ManyToMany((type) => FoodEntity)
  @JoinTable()
  foods: FoodEntity[]

  @Column()
  @Field((returns) => Number)
  totalPrice: number

  @Column()
  @Field((returns) => String)
  status: OrderStatus
}
