import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from './entities/users.entity'
import { Repository } from 'typeorm'
import { CreateInputDto, CreateOutputDto } from './dtos/create.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
  ) {}

  async createAccount({
    accountId,
    password,
    email,
    nickname,
    role,
  }: CreateInputDto): Promise<CreateOutputDto> {
    try {
      const find = await this.users.findOne({ accountId })

      if (find) {
        return {
          access: false,
          errorMessage: 'Already to user',
        }
      }

      await this.users.save(
        this.users.create({ accountId, password, email, nickname, role }),
      )

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
