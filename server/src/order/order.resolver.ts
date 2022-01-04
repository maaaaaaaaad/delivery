import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { OrderService } from './order.service'
import { OrderEntity } from './entites/order.entity'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { UseGuards } from '@nestjs/common'
import { ClientGuard } from '../auth/client.guard'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'

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
}
