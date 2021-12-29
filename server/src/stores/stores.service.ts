import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { StoreEntity } from './entities/store.entity'
import { Repository } from 'typeorm'
import { CategoryEntity } from './entities/category.entity'

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly stores: Repository<StoreEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categories: Repository<CategoryEntity>,
  ) {}
}
