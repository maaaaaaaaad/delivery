import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderResolver } from './order.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from './entites/order.entity'
import { StoreEntity } from '../stores/entities/store.entity'
import { OrderItemEntity } from './entites/item.entity'
import { FoodEntity } from '../stores/entities/food.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      StoreEntity,
      OrderItemEntity,
      FoodEntity,
    ]),
    UsersModule,
  ],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
