import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsString } from 'class-validator'
import { UsersEntity } from '../../users/entities/users.entity'
import { CategoryValues } from '../type/category.type'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class StoreEntity extends RequiredEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  name: string

  @Column()
  @Field((type) => String)
  @IsString()
  address: string

  @Column()
  @Field((type) => String)
  category: CategoryValues

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  coverImage: string

  @ManyToOne((type) => UsersEntity, (owner) => owner.stores, {
    onDelete: 'CASCADE',
  })
  @Field((type) => UsersEntity)
  owner: UsersEntity
}
