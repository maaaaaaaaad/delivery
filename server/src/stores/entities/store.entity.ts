import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsString } from 'class-validator'
import { CategoryEntity } from './category.entity'

@InputType({ isAbstract: true })
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

  @Column()
  @Field((type) => String)
  @IsString()
  coverImage: string

  @ManyToOne((type) => CategoryEntity, (category) => category.stores)
  @Field((type) => CategoryEntity)
  category: CategoryEntity
}
