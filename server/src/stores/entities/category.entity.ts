import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsString } from 'class-validator'
import { CategoryValues } from '../type/category.type'
import { StoreEntity } from './store.entity'

@InputType('CategoryInputEntity', { isAbstract: true })
@ObjectType()
@Entity()
export class CategoryEntity extends RequiredEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: CategoryValues

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  coverImage: string

  @OneToMany((type) => StoreEntity, (store) => store.category)
  @Field((type) => [StoreEntity], { nullable: true })
  stores: StoreEntity[]
}
