import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsString } from 'class-validator'
import { StoreEntity } from './store.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class CategoryEntity extends RequiredEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string

  @Column()
  @Field((type) => String)
  @IsString()
  coverImage: string

  @OneToMany((type) => StoreEntity, (store) => store.category)
  @Field((type) => [StoreEntity])
  stores: StoreEntity[]
}
