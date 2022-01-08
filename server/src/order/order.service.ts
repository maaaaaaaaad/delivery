import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from './entites/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderInputDto, CreateOrderOutputDto } from './dtos/create.dto'
import { StoreEntity } from '../stores/entities/store.entity'
import { UsersEntity } from '../users/entities/users.entity'
import { OrderItemEntity } from './entites/item.entity'
import { FoodEntity } from '../stores/entities/food.entity'
import {
  GetAllOrderInputDto,
  GetAllOrderOutputDto,
} from './dtos/get-all-order.dto'
import {
  GetOneOrderInputDto,
  GetOneOrderOutputDto,
} from './dtos/get-one-order.dto'
import { EditOrderInputDto, EditOrderOutputDto } from './dtos/edit.dto'

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

  async getAllOrder(
    authUser: UsersEntity,
    { progress }: GetAllOrderInputDto,
  ): Promise<GetAllOrderOutputDto> {
    try {
      let orders: OrderEntity[]

      if (authUser.role === 'client') {
        orders = await this.orders.find({
          where: {
            consumer: authUser,
            ...(progress && { progress }),
          },
        })
      } else if (authUser.role === 'driver') {
        orders = await this.orders.find({
          where: {
            driver: authUser,
            ...(progress && { progress }),
          },
        })
      } else if (authUser.role === 'owner') {
        const stores = await this.stores.find({
          where: {
            owner: authUser,
          },
          relations: ['orders'],
        })
        orders = stores.map((store) => store.orders).flat()
        if (progress) {
          orders = orders.filter((order) => order.progress === progress)
        }
      }

      return {
        access: true,
        orders,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async getOneOrder(
    authUser: UsersEntity,
    { id }: GetOneOrderInputDto,
  ): Promise<GetOneOrderOutputDto> {
    try {
      const order = await this.orders.findOne(id, {
        relations: ['store'],
      })

      if (!order) {
        return {
          access: false,
          errorMessage: 'Not found this order',
        }
      }

      if (
        order.consumerId !== authUser.id &&
        order.driverId !== authUser.id &&
        order.store.ownerId !== authUser.id
      ) {
        return {
          access: false,
          errorMessage: 'Invalid match the primary key',
        }
      }

      return {
        access: true,
        order,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async editOrder(
    authUser: UsersEntity,
    { id, progress }: EditOrderInputDto,
  ): Promise<EditOrderOutputDto> {
    try {
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }
}
