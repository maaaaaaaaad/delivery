import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { FoodEntity, FoodOptions } from '../../stores/entities/food.entity'

@InputType('OrderItemInputEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItemEntity extends RequiredEntity {
  @ManyToOne((type) => FoodEntity, { nullable: true, onDelete: 'CASCADE' })
  @Field((returns) => FoodEntity, { nullable: true })
  food: FoodEntity

  @Field((returns) => [FoodOptions], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: FoodOptions[]
}
