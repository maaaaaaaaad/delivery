import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { StoreEntity } from './entities/store.entity'
import { StoresService } from './stores.service'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'
import { UseGuards } from '@nestjs/common'
import { RoleGuard } from '../auth/role.guard'

@Resolver((of) => StoreEntity)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(RoleGuard)
  @Mutation((returns) => CreateStoreOutputDto)
  async createStore(
    @AuthUser() authUser: UsersEntity,
    @Args('input') createStoreInputDto: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    return await this.storesService.createStore(authUser, createStoreInputDto)
  }
}
