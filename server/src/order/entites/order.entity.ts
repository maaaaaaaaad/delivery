import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { UsersEntity } from '../../users/entities/users.entity'
import { StoreEntity } from '../../stores/entities/store.entity'
import { OrderProgress } from '../types/order.type'
import { OrderItemEntity } from './item.entity'
import { IsNumber } from 'class-validator'

@InputType('OrderInputEntity', { isAbstract: true })
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
  })
  @Field((returns) => StoreEntity)
  store: StoreEntity

  @ManyToMany((type) => OrderItemEntity)
  @Field((returns) => [OrderItemEntity])
  @JoinTable()
  orderItems: OrderItemEntity[]

  @Column({ nullable: true })
  @Field((returns) => Number, { nullable: true })
  @IsNumber()
  totalCharge?: number

  @Column({ default: 'Waiting' })
  @Field((returns) => String, { defaultValue: 'Waiting' })
  progress: OrderProgress
}
