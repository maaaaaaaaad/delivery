import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { StoreEntity } from './entities/store.entity'
import { StoresService } from './stores.service'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UseGuards } from '@nestjs/common'
import { OwnerGuard } from '../auth/owner.guard'
import { AuthUser } from '../auth/auth.decorator'
import { UsersEntity } from '../users/entities/users.entity'
import { EditStoreInputDto, EditStoreOutputDto } from './dto/edit.dto'
import { DeleteStoreInputDto, DeleteStoreOutputDto } from './dto/delete.dto'
import { CategoryEntity } from './entities/category.entity'
import { GetAllCategoryOutputDto } from './dto/get-all-category.dto'

@Resolver((of) => StoreEntity)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(OwnerGuard)
  @Mutation((returns) => CreateStoreOutputDto)
  async createStore(
    @AuthUser() owner: UsersEntity,
    @Args('input') createStoreInputDto: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    return await this.storesService.createStore(owner, createStoreInputDto)
  }

  @UseGuards(OwnerGuard)
  @Mutation((returns) => EditStoreOutputDto)
  async editStore(
    @AuthUser() owner: UsersEntity,
    @Args('input') editStoreInputDto: EditStoreInputDto,
  ): Promise<EditStoreOutputDto> {
    return await this.storesService.editStore(owner.id, editStoreInputDto)
  }

  @UseGuards(OwnerGuard)
  @Mutation((returns) => DeleteStoreOutputDto)
  async deleteStore(
    @AuthUser() owner: UsersEntity,
    @Args('input') deleteStoreInputDto: DeleteStoreInputDto,
  ): Promise<DeleteStoreOutputDto> {
    return await this.storesService.deleteStore(owner.id, deleteStoreInputDto)
  }
}

@Resolver((of) => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly storesService: StoresService) {}

  @ResolveField((type) => Number)
  async storeCount(@Parent() category: CategoryEntity): Promise<number> {
    return await this.storesService.storeCount(category)
  }

  @Query((type) => GetAllCategoryOutputDto)
  async getAllCategories(): Promise<GetAllCategoryOutputDto> {
    return await this.storesService.getAllCategories()
  }
}
