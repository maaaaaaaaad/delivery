import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { StoreEntity } from './entities/store.entity'
import { StoresService } from './stores.service'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'
import { UseGuards } from '@nestjs/common'
import { OwnerGuard } from '../auth/owner.guard'
import { EditStoreInputDto, EditStoreOutputDto } from './dto/edit.dto'
import { DeleteStoreInputDto, DeleteStoreOutputDto } from './dto/delete.dto'

@Resolver((of) => StoreEntity)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(OwnerGuard)
  @Mutation((returns) => CreateStoreOutputDto)
  async createStore(
    @AuthUser() authUser: UsersEntity,
    @Args('input') createStoreInputDto: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    return await this.storesService.createStore(authUser, createStoreInputDto)
  }

  @UseGuards(OwnerGuard)
  @Mutation((returns) => EditStoreOutputDto)
  async editStore(
    @AuthUser() authUser: UsersEntity,
    @Args('input') editStoreInputDto: EditStoreInputDto,
  ): Promise<EditStoreOutputDto> {
    return await this.storesService.editStore(authUser, editStoreInputDto)
  }

  @UseGuards(OwnerGuard)
  @Mutation((returns) => DeleteStoreOutputDto)
  async deleteStore(
    @AuthUser() authUser: UsersEntity,
    @Args('input') deleteStoreInputDto: DeleteStoreInputDto,
  ): Promise<DeleteStoreOutputDto> {
    return await this.storesService.deleteStore(authUser, deleteStoreInputDto)
  }
}
