import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CreateStoreInputDto, CreateStoreOutputDto } from './dto/create.dto'
import { UsersEntity } from '../users/entities/users.entity'

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
