import { Resolver } from '@nestjs/graphql'
import { StoreEntity } from './entities/store.entity'
import { StoresService } from './stores.service'

@Resolver((of) => StoreEntity)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}
}
