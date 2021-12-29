import { Module } from '@nestjs/common'
import { StoresService } from './stores.service'
import { StoresResolver } from './stores.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { CategoryEntity } from './entities/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity, CategoryEntity])],
  providers: [StoresService, StoresResolver],
})
export class StoresModule {}
