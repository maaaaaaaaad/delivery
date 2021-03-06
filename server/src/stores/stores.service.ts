import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { ILike, Repository } from 'typeorm'
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
import {
  GetOneStoreInputDto,
  GetOneStoreOutputDto,
} from './dto/get-one-store.dto'
import {
  SearchStoreInputDto,
  SearchStoreOutputDto,
} from './dto/search-store.dto'
import { CreateFoodInputDto, CreateFoodOutputDto } from './dto/create-food.dto'
import { FoodEntity } from './entities/food.entity'
import { EditFoodInputDto, EditFoodOutputDto } from './dto/edit-food.dto'
import { DeleteFoodInputDto, DeleteFoodOutputDto } from './dto/delete-food.dto'
import { GetMyStoresOutputDto } from './dto/get-my-stores.dto'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categories: Repository<CategoryEntity>,
    @InjectRepository(FoodEntity)
    private readonly foods: Repository<FoodEntity>,
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

  async storeCount(category: CategoryEntity): Promise<number> {
    return await this.stores.count({ category })
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

  async getMyStores(owner: UsersEntity): Promise<GetMyStoresOutputDto> {
    try {
      const stores = await this.stores.find({ owner })

      if (!stores) {
        return {
          access: false,
          errorMessage: 'Not found your stores',
        }
      }

      return {
        access: true,
        stores,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async getAllStore({
    page,
  }: GetAllStoreInputDto): Promise<GetAllStoreOutputDto> {
    try {
      const [stores, storeCount] = await this.stores.findAndCount({
        take: 9,
        skip: (page - 1) * 9,
        order: {
          isPromotion: 'DESC',
        },
      })

      return {
        access: true,
        stores,
        totalPages: Math.ceil(storeCount / 9),
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

      category.stores = await this.stores.find({
        where: { category },
        take: 9,
        skip: (page - 1) * 9,
        order: {
          isPromotion: 'DESC',
        },
      })

      const storeCount = await this.storeCount(category)

      return {
        access: true,
        category,
        totalPages: Math.ceil(storeCount / 9),
        resultCount: storeCount,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async getOneStore({
    storeId,
  }: GetOneStoreInputDto): Promise<GetOneStoreOutputDto> {
    try {
      const store = await this.stores.findOne(storeId, { relations: ['menu'] })

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      return {
        access: true,
        store,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async searchStore({
    keyword,
    page,
  }: SearchStoreInputDto): Promise<SearchStoreOutputDto> {
    try {
      const [stores, storeCount] = await this.stores.findAndCount({
        where: {
          name: ILike(`%${keyword}%`),
        },
        take: 9,
        skip: (page - 1) * 9,
        relations: ['menu'],
        order: {
          isPromotion: 'DESC',
        },
      })

      return {
        access: true,
        stores,
        totalPages: Math.ceil(storeCount / 9),
        resultCount: storeCount,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async createFood(
    ownerId: number,
    createFoodInputDto: CreateFoodInputDto,
  ): Promise<CreateFoodOutputDto> {
    try {
      const store = await this.stores.findOne(createFoodInputDto.storeId)

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found this store',
        }
      }

      if (ownerId !== store.ownerId) {
        return {
          access: false,
          errorMessage: 'Your not owner this store',
        }
      }

      await this.foods.save(
        await this.foods.create({ ...createFoodInputDto, store }),
      )

      return {
        access: true,
      }
    } catch (e) {
      return {
        access: true,
        errorMessage: e.message,
      }
    }
  }

  async editFood(
    ownerId: number,
    editFoodInputDto: EditFoodInputDto,
  ): Promise<EditFoodOutputDto> {
    try {
      const food = await this.foods.findOne(editFoodInputDto.foodId, {
        relations: ['store'],
      })

      if (!food) {
        return {
          access: false,
          errorMessage: 'Not found this food',
        }
      }

      if (ownerId !== food.store.ownerId) {
        return {
          access: false,
          errorMessage: 'Invalid match primary key',
        }
      }

      await this.foods.save({ ...food, ...editFoodInputDto })

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

  async deleteFood(
    ownerId: number,
    deleteFoodInputDto: DeleteFoodInputDto,
  ): Promise<DeleteFoodOutputDto> {
    try {
      const food = await this.foods.findOne(deleteFoodInputDto.foodId, {
        relations: ['store'],
      })

      if (!food) {
        return {
          access: false,
          errorMessage: 'Not found this food',
        }
      }

      if (ownerId !== food.store.ownerId) {
        return {
          access: false,
          errorMessage: 'Invalid match primary key',
        }
      }

      await this.foods.delete(deleteFoodInputDto.foodId)

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
