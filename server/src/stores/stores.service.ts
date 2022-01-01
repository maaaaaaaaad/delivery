import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UsersEntity } from '../users/entities/users.entity'
import { EditStoreInputDto, EditStoreOutputDto } from './dto/edit.dto'
import { DeleteStoreInputDto, DeleteStoreOutputDto } from './dto/delete.dto'
import { GetAllCategoryOutputDto } from './dto/get-all-category.dto'
import {
  GetOneCategoryInputDto,
  GetOneCategoryOutputDto,
} from './dto/get-one-category.dto'
import {
  GetAllStoreInputDto,
  GetAllStoreOutputDto,
} from './dto/get-all-store.dto'

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

      store.owner = owner

      let category = await this.categories.findOne({ name: categoryName })

      if (!category) {
        category = await this.categories.save(
          await this.categories.create({ name: categoryName }),
        )
      }

      store.category = category
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

  async deleteStore(
    ownerKey: number,
    deleteStoreInputDto: DeleteStoreInputDto,
  ): Promise<DeleteStoreOutputDto> {
    try {
      const store = await this.stores.findOne(deleteStoreInputDto.storeId)

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

      await this.stores.delete(deleteStoreInputDto.storeId)

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

  async getAllCategories(): Promise<GetAllCategoryOutputDto> {
    try {
      const categories = await this.categories.find()

      return {
        access: true,
        categories,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async storeCount(category: CategoryEntity): Promise<number> {
    return await this.stores.count({ category })
  }

  async getAllStore({
    page,
  }: GetAllStoreInputDto): Promise<GetAllStoreOutputDto> {
    try {
      const [stores, storeCount] = await this.stores.findAndCount({
        take: 10,
        skip: (page - 1) * 10,
      })

      return {
        access: true,
        stores,
        totalPages: Math.ceil(storeCount / 10),
        resultCount: storeCount,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async getOneCategory({
    name,
    page,
  }: GetOneCategoryInputDto): Promise<GetOneCategoryOutputDto> {
    try {
      const category = await this.categories.findOne({ name })

      if (!category) {
        return {
          access: false,
          errorMessage: 'Not found this category',
        }
      }

      category.store = await this.stores.find({
        where: { category },
        take: 10,
        skip: (page - 1) * 10,
      })

      const storeCount = await this.storeCount(category)

      return {
        access: true,
        category,
        totalPages: Math.ceil(storeCount / 10),
        resultCount: storeCount,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }
}
