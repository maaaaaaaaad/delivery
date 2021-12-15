import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersEntity } from './entities/users.entity'
import { Repository } from 'typeorm'
import { CreateInputDto, CreateOutputDto } from './dtos/create.dto'
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto'
import { JwtService } from '../jwt/jwt.service'
import { EditProfileInputDto, EditProfileOutputDto } from './dtos/edit.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    accountId,
    password,
    email,
    nickname,
    role,
  }: CreateInputDto): Promise<CreateOutputDto> {
    try {
      const user = await this.users.findOne({ accountId })
      if (user) {
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

  async loginAccount({
    accountId,
    password,
  }: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const user = await this.users.findOne(
        { accountId },
        { select: ['id', 'accountId', 'password'] },
      )

      if (!user) {
        return {
          access: false,
          errorMessage: 'Not found user',
        }
      }

      const confirmPassword = await user.confirmPassword(password)
      if (!confirmPassword) {
        return {
          access: false,
          errorMessage: 'The passwords do not match',
        }
      }
      const access_token = this.jwtService.sign(user.id)

      return {
        access: true,
        access_token,
      }
    } catch (e) {
      return {
        access: false,
        errorMessage: e.message,
      }
    }
  }

  async editProfile(
    primaryKey: number,
    { email, password, nickname }: EditProfileInputDto,
  ): Promise<EditProfileOutputDto> {
    try {
      const user = await this.users.findOne(primaryKey)

      if (email) {
        user.email = email
      }

      if (password) {
        user.password = password
      }

      if (nickname) {
        user.nickname = nickname
      }

      await this.users.save(user)

      return {
        access: true,
        user,
      }
    } catch (e) {
      return {
        access: false,
      }
    }
  }

  async findByTokenPk(primaryKey: number): Promise<UsersEntity> {
    return await this.users.findOne({ id: primaryKey })
  }

  async checkAccountId(accountId: string): Promise<boolean> {
    const user = await this.users.findOne({ accountId })
    return !!user
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.users.findOne({ email })
    return !!user
  }

  async checkNickname(nickname: string): Promise<boolean> {
    const user = await this.users.findOne({ nickname })
    return !!user
  }
}
