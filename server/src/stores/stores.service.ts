import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UsersEntity } from '../users/entities/users.entity'
import { EditStoreInputDto, EditStoreOutputDto } from './dto/edit.dto'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categories: Repository<CategoryEntity>,
  ) {}

  async createStore(
    owner: UsersEntity,
    { name, coverImage, address, categoryName }: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    try {
      const store = await this.stores.create({
        name,
        coverImage,
        address,
        owner,
      })

      store.category = await this.categories.save(
        await this.categories.create({ name: categoryName }),
      )

      await this.stores.save(store)

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

  async editStore(
    ownerKey: number,
    editStoreInputDto: EditStoreInputDto,
  ): Promise<EditStoreOutputDto> {
    try {
      const store = await this.stores.findOne(editStoreInputDto.storeId)

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      if (ownerKey !== store.ownerId) {
        return {
          access: false,
          errorMessage: 'Invalid match primary key',
        }
      }

      await this.stores.save({
        ...store,
        ...editStoreInputDto,
      })

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
}
