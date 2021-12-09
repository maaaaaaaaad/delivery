import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'
import { RequiredEntity } from '../../common/required.entity'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class UsersEntity extends RequiredEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  accountId: string

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  @MinLength(8)
  password: string

  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string

  @Column()
  @Field((type) => String)
  @IsString()
  @MinLength(2)
  @MaxLength(12)
  nickname: string
}
