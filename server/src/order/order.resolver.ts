import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
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

  @Query((returns) => GetAllOrderOutputDto)
  async getAllOrder(
    @AuthUser() authUser: UsersEntity,
    @Args('input') getAllOrderInputDto: GetAllOrderInputDto,
  ): Promise<GetAllOrderOutputDto> {
    return await this.orders.getAllOrder(authUser, getAllOrderInputDto)
  }

  @Query((returns) => GetOneOrderOutputDto)
  async getOneOrder(
    @AuthUser() authUser: UsersEntity,
    @Args('input') getOneOrderInputDto: GetOneOrderInputDto,
  ): Promise<GetOneOrderOutputDto> {
    return await this.orders.getOneOrder(authUser, getOneOrderInputDto)
  }
}
