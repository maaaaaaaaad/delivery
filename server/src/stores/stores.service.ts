import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UsersEntity } from '../users/entities/users.entity'
import { EditStoreInputDto, EditStoreOutputDto } from './dto/edit.dto'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
  ) {}

  async createStore(
    authUser: UsersEntity,
    createStoreInputDto: CreateStoreInputDto,
  ): Promise<CreateStoreOutputDto> {
    try {
      const exist = await this.stores.findOne({
        name: createStoreInputDto.name,
      })

      if (exist) {
        return {
          access: false,
          errorMessage: 'Already to store name!',
        }
      }

      const store = await this.stores.create(createStoreInputDto)

      store.owner = authUser
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
    authUser: UsersEntity,
    { name, address, category, coverImage, storeId }: EditStoreInputDto,
  ): Promise<EditStoreOutputDto> {
    try {
      const store = await this.stores.findOne(storeId)

      if (!store) {
        return {
          access: false,
          errorMessage: 'Not found the store',
        }
      }

      if (authUser.id !== store.ownerId) {
        return {
          access: false,
          errorMessage: 'Cannot edit store that no match owner id',
        }
      }

      if (name) {
        store.name = name
      }

      if (address) {
        store.address = address
      }

      if (category) {
        store.category = category
      }

      if (coverImage) {
        store.coverImage = coverImage
      }

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
