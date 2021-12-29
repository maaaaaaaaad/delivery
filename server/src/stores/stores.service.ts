import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UsersEntity } from '../users/entities/users.entity'

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
      const addressName = address.trim().toLowerCase().replace(/ /g, '-')

      const store = await this.stores.create({
        name,
        coverImage,
        address: addressName,
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
}
