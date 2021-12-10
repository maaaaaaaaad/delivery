import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { UserRole } from '../types/role.type'
import { InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

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

  @Column()
  @Field((type) => String)
  role: UserRole

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
      } catch (e) {
        throw new InternalServerErrorException()
      }
    }
  }

  async confirmPassword(password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }
}
