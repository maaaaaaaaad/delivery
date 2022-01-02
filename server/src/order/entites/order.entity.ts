import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { StoreEntity } from '../../stores/entities/store.entity'
import { FoodEntity } from '../../stores/entities/food.entity'

export type OrderProgress = 'Waiting' | 'Making' | 'Delivering' | 'PickUp' | 'Done'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class OrderEntity extends RequiredEntity {
  @ManyToOne((type) => UsersEntity, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  @Field((returns) => UsersEntity)
  consumer: UsersEntity

  @ManyToOne((type) => UsersEntity, (user) => user.drivers, {
    onDelete: 'SET NULL',
  })
  @Field((returns) => UsersEntity)
  driver: UsersEntity

  @ManyToOne((type) => StoreEntity, (store) => store.orders, {
    onDelete: 'SET NULL',
  })
  @Field((returns) => StoreEntity)
  store: StoreEntity

  @ManyToMany((type) => FoodEntity)
  @Field((returns) => [FoodEntity])
  @JoinTable()
  foods: FoodEntity[]

  @Column()
  @Field((returns) => Number)
  totalCharge: number

  @Column()
  @Field((returns) => String)
  progress: OrderProgress
}
