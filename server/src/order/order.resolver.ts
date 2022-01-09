import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { OrderEntity } from './entites/order.entity'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { UseGuards } from '@nestjs/common'
import { ClientGuard } from '../auth/client.guard'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'
import {
  GetAllOrderInputDto,
  GetAllOrderOutputDto,
} from './dtos/get-all-order.dto'
import {
  GetOneOrderInputDto,
  GetOneOrderOutputDto,
} from './dtos/get-one-order.dto'
import { EditOrderInputDto, EditOrderOutputDto } from './dtos/edit.dto'
import { AuthGuard } from '../auth/auth.guard'
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

@Resolver((of) => OrderEntity)
export class OrderResolver {
  constructor(private readonly orders: OrderService) {}

  @UseGuards(ClientGuard)
  @Mutation((returns) => CreateOrderOutputDto)
  async createOrder(
    @AuthUser() client: UsersEntity,
    @Args('input') createOrderInputDto: CreateOrderInputDto,
  ): Promise<CreateOrderOutputDto> {
    return await this.orders.createOrder(client, createOrderInputDto)
  }

  @UseGuards(AuthGuard)
  @Query((returns) => GetAllOrderOutputDto)
  async getAllOrder(
    @AuthUser() authUser: UsersEntity,
    @Args('input') getAllOrderInputDto: GetAllOrderInputDto,
  ): Promise<GetAllOrderOutputDto> {
    return await this.orders.getAllOrder(authUser, getAllOrderInputDto)
  }

  @UseGuards(AuthGuard)
  @Query((returns) => GetOneOrderOutputDto)
  async getOneOrder(
    @AuthUser() authUser: UsersEntity,
    @Args('input') getOneOrderInputDto: GetOneOrderInputDto,
  ): Promise<GetOneOrderOutputDto> {
    return await this.orders.getOneOrder(authUser, getOneOrderInputDto)
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditOrderOutputDto)
  async editOrder(
    @AuthUser() authUser: UsersEntity,
    @Args('input') editOrderInputDto: EditOrderInputDto,
  ): Promise<EditOrderOutputDto> {
    return await this.orders.editOrder(authUser, editOrderInputDto)
  }

  @Mutation((returns) => Boolean)
  addComment() {
    pubSub.publish('commentAdded', {
      commentAdded: 'Hello',
    })
    return true
  }

  @Subscription((returns) => String)
  commentAdded() {
    return pubSub.asyncIterator('commentAdded')
  }
}
