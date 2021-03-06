import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { FoodEntity } from '../../stores/entities/food.entity'

@InputType('OrderItemOptionsType', { isAbstract: true })
@ObjectType()
export class OrderItemOptions {
  @Field((returns) => String)
  subject: string

  @Field((returns) => String, { nullable: true })
  selection?: string
}

@InputType('OrderItemInputEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItemEntity extends RequiredEntity {
  @ManyToOne((type) => FoodEntity, { nullable: true, onDelete: 'CASCADE' })
  @Field((returns) => FoodEntity, { nullable: true })
  food: FoodEntity

  @Field((returns) => [OrderItemOptions], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOptions[]
}
