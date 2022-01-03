import { Mutation, Resolver } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { OrderEntity } from './entites/order.entity'
import { CreateOrderOutputDto } from './dtos/create.dto'
import { UseGuards } from '@nestjs/common'

@Resolver((of) => OrderEntity)
export class OrderResolver {}
