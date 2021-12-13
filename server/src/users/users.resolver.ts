import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateInputDto, CreateOutputDto } from './dtos/create.dto'
import { UsersService } from './users.service'
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto'
import { UsersEntity } from './entities/users.entity'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AuthUser } from '../auth/auth.decorator'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((type) => String)
  greeting(@Args('input') name: string): string {
    return `Hello ${name}, Welcome to graphQL!!!!`
  }

  @Mutation((returns) => CreateOutputDto)
  async createAccount(
    @Args('input') createInputDto: CreateInputDto,
  ): Promise<CreateOutputDto> {
    return await this.usersService.createAccount(createInputDto)
  }

  @Mutation((returns) => LoginOutputDto)
  async loginAccount(
    @Args('input') loginInputDto: LoginInputDto,
  ): Promise<LoginOutputDto> {
    return await this.usersService.loginAccount(loginInputDto)
  }

  @Query((returns) => UsersEntity)
  @UseGuards(AuthGuard)
  async userState(@AuthUser() authUser: UsersEntity): Promise<UsersEntity> {
    return authUser
  }

  @Mutation((returns) => Boolean)
  async checkAccountId(@Args('input') accountId: string): Promise<boolean> {
    return await this.usersService.checkAccountId(accountId)
  }

  @Mutation((returns) => Boolean)
  async checkEmail(@Args('input') email: string): Promise<boolean> {
    return await this.usersService.checkEmail(email)
  }

  @Mutation((returns) => Boolean)
  async checkNickname(@Args('input') nickname: string): Promise<boolean> {
    return await this.usersService.checkNickname(nickname)
  }
}
