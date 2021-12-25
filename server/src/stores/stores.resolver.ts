import { Mutation, Resolver } from '@nestjs/graphql'
import { StoreEntity } from './entities/store.entity'
import { StoresService } from './stores.service'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'

@Resolver((of) => StoreEntity)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation((returns) => CreateStoreOutputDto)
  async createStore(
    @AuthUser() authUser: UsersEntity,
    createStoreInputDto: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    return await this.storesService.createStore(authUser, createStoreInputDto)
  }
}
