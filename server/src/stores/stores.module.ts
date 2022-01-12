import { Module } from '@nestjs/common'
import { StoresService } from './stores.service'
import {
  CategoryResolver,
  FoodResolver,
  StoresResolver,
} from './stores.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { CategoryEntity } from './entities/category.entity'
import { FoodEntity } from './entities/food.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([StoreEntity, CategoryEntity, FoodEntity]),
  ],
  providers: [StoresService, StoresResolver, CategoryResolver, FoodResolver],
})
export class StoresModule {}
