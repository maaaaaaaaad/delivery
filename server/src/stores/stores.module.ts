import { Module } from '@nestjs/common'
import { StoresService } from './stores.service'
import { StoresResolver } from './stores.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  providers: [StoresService, StoresResolver],
})
export class StoresModule {}
