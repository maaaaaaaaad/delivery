import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm'
import { RequiredEntity } from '../../common/entites/required.entity'
import { IsEmail, IsString } from 'class-validator'
import { UserRole } from '../types/role.type'
import { InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { StoreEntity } from '../../stores/entities/store.entity'
import { OrderEntity } from 'src/order/entities/order.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class UsersEntity extends RequiredEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  accountId: string

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string

  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string

  @Column()
  @Field((type) => String)
  @IsString()
  nickname: string

  @Column()
  @Field((type) => String, { defaultValue: 'client' })
  role: UserRole

  @OneToMany((type) => StoreEntity, (store) => store.owner)
  @Field((type) => [StoreEntity])
  stores: StoreEntity[]

  @OneToMany((type) => OrderEntity, (order) => order.consumer)
  @Field((returns) => [OrderEntity])
  orders: OrderEntity[]

  @OneToMany((type) => OrderEntity, (order) => order.driver)
  @Field((returns) => [OrderEntity])
  drivers: OrderEntity[]

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
