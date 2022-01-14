import { Args, Mutation, Resolver, Query, Subscription } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { OrderEntity } from './entites/order.entity'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { Inject, UseGuards } from '@nestjs/common'
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
import { PUB_SUB } from '../common/common.constants'
import { PubSub } from 'graphql-subscriptions'
import { NEW_MADE_ORDERS, NEW_ORDERS } from './constants'
import { OwnerGuard } from '../auth/owner.guard'
import { DriverGuard } from '../auth/driver.guard'

@Resolver((of) => OrderEntity)
export class OrderResolver {
  constructor(
    private readonly orders: OrderService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

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

  @UseGuards(OwnerGuard)
  @Subscription((returns) => OrderEntity, {
    filter: ({ waitingOrders: { ownerId } }, _, { user }) => {
      return ownerId === user.id
    },
  })
  waitingOrders() {
    return this.pubSub.asyncIterator(NEW_ORDERS)
  }

  @UseGuards(DriverGuard)
  @Subscription((returns) => OrderEntity)
  madeOrders() {
    return this.pubSub.asyncIterator(NEW_MADE_ORDERS)
  }
}
