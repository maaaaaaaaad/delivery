import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entites/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { StoreEntity } from '../stores/entities/store.entity'
import { UsersEntity } from '../users/entities/users.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
  ) {}

  async createOrder(
    consumer: UsersEntity,
    createOrderInputDto: CreateOrderInputDto,
  ): Promise<CreateOrderOutputDto> {
    try {
      const store = await this.stores.findOne(createOrderInputDto.storeId)

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      await this.orders.save(
        await this.orders.create({
          consumer,
          foods: createOrderInputDto.foods,
          store,
        }),
      )

      return {
        access: true,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }
}
