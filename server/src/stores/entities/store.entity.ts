import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsString } from 'class-validator'
import { UsersEntity } from '../../users/entities/users.entity'
import { CategoryEntity } from './category.entity'
import { FoodEntity } from './food.entity'
import { OrderEntity } from '../../order/entites/order.entity'

@InputType('StoreInputEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class StoreEntity extends RequiredEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string

  @Column()
  @Field((type) => String)
  @IsString()
  address: string

  @ManyToOne((type) => CategoryEntity, (category) => category.stores, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @Field((type) => CategoryEntity)
  category: CategoryEntity

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  coverImage: string

  @ManyToOne((type) => UsersEntity, (owner) => owner.stores, {
    onDelete: 'CASCADE',
  })
  @Field((type) => UsersEntity)
  owner: UsersEntity

  @RelationId((store: StoreEntity) => store.owner)
  ownerId: number

  @Field((returns) => [FoodEntity])
  @OneToMany((type) => FoodEntity, (food) => food.store)
  menu: FoodEntity[]

  @OneToMany((type) => OrderEntity, (order) => order.store)
  @Field((returns) => [OrderEntity])
  orders: OrderEntity[]

  @Column({ default: false })
  @Field((returns) => Boolean)
  isPromotion: boolean

  @Column({ nullable: true })
  @Field((returns) => Date, { nullable: true })
  promotionPeriod: Date
}
