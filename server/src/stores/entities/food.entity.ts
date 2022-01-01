import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, RelationId } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { StoreEntity } from './store.entity'
import { IsNumber, IsString } from 'class-validator'

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

  @Field((returns) => String)
  @Column()
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
}
