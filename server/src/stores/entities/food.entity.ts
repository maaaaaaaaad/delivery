import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToMany, ManyToOne, RelationId } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { StoreEntity } from './store.entity'
import { IsNumber, IsString } from 'class-validator'
import { OrderEntity } from '../../order/entites/order.entity'

@InputType('FoodOptionsType', { isAbstract: true })
@ObjectType()
class FoodOptions {
  @Field((returns) => String)
  subject: string

  @Field((returns) => [String], { nullable: true })
  selection: string[]

  @Field((returns) => Number, { nullable: true })
  extraCharge?: number
}

@InputType('FoodEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class FoodEntity extends RequiredEntity {
  @Field((returns) => String)
  @Column()
  @IsString()
  name: string

  @Field((returns) => Number)
  @Column()
  @IsNumber()
  price: number

  @Field((returns) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  image: string

  @Field((type) => String)
  @Column()
  description: string

  @Field((returns) => StoreEntity)
  @ManyToOne((type) => StoreEntity, (store) => store.menu, {
    onDelete: 'CASCADE',
  })
  store: StoreEntity

  @RelationId((food: FoodEntity) => food.store)
  storeId: number

  @Field((returns) => [FoodOptions], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: FoodOptions[]
}
