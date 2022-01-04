import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entites/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { StoreEntity } from '../stores/entities/store.entity'
import { UsersEntity } from '../users/entities/users.entity'
import { OrderItemEntity } from './entites/item.entity'
import { FoodEntity } from '../stores/entities/food.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItems: Repository<OrderItemEntity>,
    @InjectRepository(FoodEntity)
    private readonly foods: Repository<FoodEntity>,
  ) {}

  async createOrder(
    consumer: UsersEntity,
    { storeId, orderItems }: CreateOrderInputDto,
  ): Promise<CreateOrderOutputDto> {
    try {
      const store = await this.stores.findOne(storeId)

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      let orderTotalPrice = 0
      const orderItemsArray: OrderItemEntity[] = []

      for (const item of orderItems) {
        const food = await this.foods.findOne(item.foodId)

        if (!food) {
          return {
            access: false,
            errorMessage: 'Not found this food',
          }
        }

        let foodPrice = food.price

        for (const itemOption of item.options) {
          const foodOption = food.options.find(
            (foodOption) => foodOption.subject === itemOption.subject,
          )
          if (foodOption) {
            if (foodOption.extraCharge) {
              foodPrice += foodOption.extraCharge
            } else {
              const foodOptionSelection = foodOption.selection.find(
                (selection) => selection.subject === itemOption.selection,
              )
              if (foodOptionSelection) {
                if (foodOptionSelection.extraCharge) {
                  foodPrice += foodOptionSelection.extraCharge
                }
              }
            }
          }
        }
        orderTotalPrice += foodPrice
        const orderItem = await this.orderItems.save(
          await this.orderItems.create({
            food,
            options: item.options,
          }),
        )
        orderItemsArray.push(orderItem)
      }

      await this.orders.save(
        await this.orders.create({
          consumer,
          store,
          totalCharge: orderTotalPrice,
          orderItems: orderItemsArray,
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
